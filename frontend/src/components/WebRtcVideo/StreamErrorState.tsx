import { RefreshCw, VideoOff } from 'lucide-react';
import {
  streamErrorButton,
  streamErrorGroup,
  streamErrorIcon,
  streamErrorText,
  streamLoadingOverlay,
} from '../VideoGrid/VideoGrid.css';

const ERROR_TEXT = 'שגיאה בשידור, נסו שנית';
const RETRY_TEXT = 'ריענון צפייה באמצעי';

type StreamErrorStateProps = {
  onRetry: () => void;
};

const StreamErrorState = ({ onRetry }: StreamErrorStateProps) => (
  <div className={streamLoadingOverlay}>
    <VideoOff className={streamErrorIcon} />
    <div className={streamErrorGroup}>
      <span className={streamErrorText}>{ERROR_TEXT}</span>
      <button className={streamErrorButton} onClick={onRetry}>
        {RETRY_TEXT}
        <RefreshCw size={12} />
      </button>
    </div>
  </div>
);

export default StreamErrorState;
