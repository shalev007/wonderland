import type { ReactNode } from 'react';
import {
  videoTileVideo,
  videoTile,
  videoTileBar,
  videoTileBarAlways,
  videoTileBarBottom,
  videoTileBarHover,
  videoTileBarTop,
} from './VideoTile.css';
import WebRtcVideo from '../WebRtcVideo/WebRtcVideo';

type VideoTileProps = {
  streamUrl: string;
  topBarContent?: ReactNode;
  bottomBarContent?: ReactNode;
};

const VideoTile = ({ streamUrl, topBarContent, bottomBarContent }: VideoTileProps) => {
  return (
    <div className={videoTile}>
      <WebRtcVideo className={videoTileVideo} streamUrl={streamUrl} />

      {topBarContent ? (
        <div className={`${videoTileBar} ${videoTileBarTop} ${videoTileBarAlways}`}>
          {topBarContent}
        </div>
      ) : null}

      {bottomBarContent ? (
        <div className={`${videoTileBar} ${videoTileBarBottom} ${videoTileBarHover}`}>
          {bottomBarContent}
        </div>
      ) : null}
    </div>
  );
};

export default VideoTile;
