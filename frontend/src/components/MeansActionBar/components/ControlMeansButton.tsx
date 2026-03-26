import { GameControllerIcon } from '@phosphor-icons/react';
import MeansActionButton from './MeansActionButton';

const ControlMeansButton = () => {
  return (
    <MeansActionButton>
      <GameControllerIcon size={15} />
    </MeansActionButton>
  );
};

export default ControlMeansButton;
