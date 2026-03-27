import { Flex } from '@mantine/core';
import {
  ControlMeansButton,
  FullscreenMeansButton,
  SwitchMeansButton,
} from './components';

type MeansActionBarProps = {
  slotIndex: number;
  toggleFullscreen: () => void;
  onPopOverToggle: (opened: boolean) => void;
};

const MeansActionBar = ({
  slotIndex,
  toggleFullscreen,
  onPopOverToggle,
}: MeansActionBarProps) => {
  return (
    <Flex
      mih={50}
      gap="10px"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
      p="0 12px"
    >
      <ControlMeansButton />
      <FullscreenMeansButton toggleFullscreen={toggleFullscreen} />
      <SwitchMeansButton slotIndex={slotIndex} onPopOverToggle={onPopOverToggle} />
    </Flex>
  );
};

export default MeansActionBar;
