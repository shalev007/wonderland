import { Loader } from 'lucide-react';
import {
  streamLoadingLabel,
  streamLoadingOverlay,
  streamLoadingSpinner,
} from '../VideoGrid/VideoGrid.css';

const LOADING_TEXT = 'אמצעי בטעינה...';

const StreamLoadingState = () => (
  <div className={streamLoadingOverlay}>
    <Loader className={streamLoadingSpinner} />
    <span className={streamLoadingLabel}>{LOADING_TEXT}</span>
  </div>
);

export default StreamLoadingState;
