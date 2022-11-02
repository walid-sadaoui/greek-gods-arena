import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from 'components/common/Button';
import { Fight } from 'models/Fight';
import Container from 'components/common/Container';
import { Character } from 'models/Character';

const Opponent: React.FC<{ oppponent: Character }> = ({ oppponent }) => {
  return (
    <div className='flex flex-col items-center w-full h-full p-4'>
      <img
        src={`/greek-gods/${oppponent.name}.svg`}
        alt={`${oppponent.name}`}
        className='m-4 h-36'
      />
      <span className='text-xl font-greek'>{oppponent.name}</span>
    </div>
  );
};

const Room: React.FC = () => {
  const { state } = useLocation<{ fight: Fight }>();
  const { fight } = state;

  return (
    <Container>
      <div className='flex items-center justify-center p-4'>
        <Opponent oppponent={fight.firstOpponent} />
        <span className='text-5xl font-greek'>VS</span>
        <Opponent oppponent={fight.secondOpponent} />
      </div>
      <Link to={`/arena/${fight._id}`}>
        <Button>Enter The Arena</Button>
      </Link>
    </Container>
  );
};

export default Room;
