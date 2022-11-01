import React from 'react';
import Container, {
  ContainerRow,
  Separator,
} from 'components/common/Container';
import { HowToPlay, Menu } from './elements';

const Home: React.FC = () => {
  return (
    <Container>
      {/* <ContainerRow>
        <HowToPlay />
        <Separator />
        <Menu />
      </ContainerRow> */}
      <Menu />
    </Container>
  );
};

export default Home;
