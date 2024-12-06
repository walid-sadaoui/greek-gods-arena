import React from 'react';
import { ContainerRow } from 'components/common/Container';
import { Menu } from './elements';

const Home: React.FC = () => {
  return (
    <ContainerRow>
      {/* <HowToPlay /> */}
      {/* <Separator /> */}
      <Menu />
    </ContainerRow>
  );
};

export default Home;
