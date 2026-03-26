import { CircleGaugeIcon } from 'lucide-react';
import MeansActionButton from './MeansActionButton';

const GaugeMeansButton = () => {
  return (
    <MeansActionButton>
      <CircleGaugeIcon size={15} />
    </MeansActionButton>
  );
};

export default GaugeMeansButton;
