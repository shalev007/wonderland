import { ScanFaceIcon } from 'lucide-react';
import MeansActionButton from './MeansActionButton';

const ScanFaceMeansButton = () => {
  return (
    <MeansActionButton>
      <ScanFaceIcon size={15} />
    </MeansActionButton>
  );
};

export default ScanFaceMeansButton;
