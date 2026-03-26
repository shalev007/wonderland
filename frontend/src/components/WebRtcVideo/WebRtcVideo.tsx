import { memo, useEffect, useRef, useState } from 'react';
import StreamErrorState from './StreamErrorState';
import StreamLoadingState from './StreamLoadingState';
import { videoHost } from '../VideoGrid/VideoGrid.css';
import {
  webRtcVideoElement,
  webRtcVideoHidden,
  webRtcVideoHost,
} from './WebRtcVideo.css';

type WebRtcVideoProps = {
  streamUrl: string;
  className?: string;
};

const toWhepUrl = (streamUrl: string): string => {
  const trimmed = streamUrl.trim();
  if (/\/whep\/?$/i.test(trimmed)) return trimmed;
  return `${trimmed.replace(/\/+$/, '')}/whep`;
};

const waitIceGatheringComplete = (pc: RTCPeerConnection): Promise<void> => {
  if (pc.iceGatheringState === 'complete') return Promise.resolve();

  return new Promise((resolve) => {
    const onStateChange = () => {
      if (pc.iceGatheringState !== 'complete') return;
      pc.removeEventListener('icegatheringstatechange', onStateChange);
      resolve();
    };

    pc.addEventListener('icegatheringstatechange', onStateChange);
  });
};

const WebRtcVideo = ({ streamUrl, className }: WebRtcVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isError, setIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const videoClassName = `${webRtcVideoElement}${className ? ` ${className}` : ''}${
    isError ? ` ${webRtcVideoHidden}` : ''
  }`;

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    let isDisposed = false;

    setIsError(false);
    setIsPlaying(false);

    const pc = new RTCPeerConnection();
    const fallbackStream = new MediaStream();

    const markConnectionError = (reason: string) => {
      if (isDisposed) return;
      console.error('WebRTC connection failed', { streamUrl, reason });
      setIsPlaying((prev) => (prev ? false : prev));
      setIsError((prev) => (prev ? prev : true));
    };

    const handleConnectionStateChange = () => {
      // 'disconnected' is transient on macOS/Chrome — only hard failures trigger error.
      const failedStates: RTCPeerConnectionState[] = ['failed', 'closed'];
      if (failedStates.includes(pc.connectionState)) {
        markConnectionError(`peer connection state is "${pc.connectionState}"`);
      }
    };

    const handleIceConnectionStateChange = () => {
      // 'disconnected' is transient on macOS/Chrome — only hard failures trigger error.
      const failedStates: RTCIceConnectionState[] = ['failed', 'closed'];
      if (failedStates.includes(pc.iceConnectionState)) {
        markConnectionError(
          `ICE connection state is "${pc.iceConnectionState}"`,
        );
      }
    };

    pc.addEventListener('connectionstatechange', handleConnectionStateChange);
    pc.addEventListener(
      'iceconnectionstatechange',
      handleIceConnectionStateChange,
    );

    pc.addEventListener('track', (event) => {
      if (isDisposed || !videoRef.current) return;

      if (event.streams[0]) {
        videoRef.current.srcObject = event.streams[0];
      } else {
        fallbackStream.addTrack(event.track);
        videoRef.current.srcObject = fallbackStream;
      }

      void videoRef.current.play().catch(() => {
        // Autoplay can still be blocked in some browser configurations.
      });

      // The track event is the definitive signal that the WebRTC stream
      // is connected and media is flowing — hide the loading overlay.
      clearTimeout(timeoutId);
      setIsPlaying((prev) => (prev ? prev : true));
    });

    const start = async () => {
      try {
        const whepUrl = toWhepUrl(streamUrl);
        const offer = await pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        });
        await pc.setLocalDescription(offer);
        await waitIceGatheringComplete(pc);

        if (!pc.localDescription?.sdp) {
          throw new Error('WebRTC offer SDP is missing');
        }

        const response = await fetch(whepUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/sdp',
          },
          body: pc.localDescription.sdp,
        });

        if (!response.ok) {
          throw new Error(
            `WHEP request failed with status ${response.status}: ${response.statusText}`,
          );
        }

        const answerSdp = await response.text();
        if (isDisposed) return;

        await pc.setRemoteDescription({
          type: 'answer',
          sdp: answerSdp,
        });
      } catch (error) {
        console.error('Failed to start WebRTC stream', { streamUrl, error });
        if (!isDisposed) {
          setIsError((prev) => (prev ? prev : true));
          setIsPlaying((prev) => (prev ? false : prev));
        }
      }
    };

    const CONNECTION_TIMEOUT_MS = 15_000;
    const timeoutId = setTimeout(() => {
      if (!isDisposed) {
        console.error('WebRTC stream timed out', { streamUrl });
        setIsError((prev) => (prev ? prev : true));
        setIsPlaying((prev) => (prev ? false : prev));
      }
    }, CONNECTION_TIMEOUT_MS);

    void start();

    return () => {
      isDisposed = true;
      clearTimeout(timeoutId);
      pc.close();
      videoElement.srcObject = null;
    };
  }, [streamUrl, retryCount]);

  return (
    <div className={`${videoHost} ${webRtcVideoHost}`}>
      <video
        ref={videoRef}
        className={videoClassName}
        autoPlay
        muted
        playsInline
      />
      {isError && (
        <StreamErrorState onRetry={() => setRetryCount((c) => c + 1)} />
      )}
      {!isError && !isPlaying && <StreamLoadingState />}
    </div>
  );
};

export default memo(WebRtcVideo);
