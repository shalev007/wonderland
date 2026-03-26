import { Flex } from '@mantine/core';
import {
  ControlMeansButton,
  FullscreenMeansButton,
  GaugeMeansButton,
  RotateMeansButton,
  ScanFaceMeansButton,
} from './components';

const MeansActionBar = () => {
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
      <GaugeMeansButton />
      <RotateMeansButton />
      <FullscreenMeansButton />
      <ScanFaceMeansButton />
    </Flex>
  );
};

export default MeansActionBar;
