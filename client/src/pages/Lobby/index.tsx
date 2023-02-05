import React from 'react';
import { Redirect } from 'react-router-dom';
import { newFight } from 'api/fights';
import { Fight } from 'models/Fight';
import Button from 'components/common/Button';
import Container from 'components/common/Container';
import { Character, GreekGods } from 'models/Character';
import { useAuth } from 'shared/context/AuthContext';
import { GreekGodSelectList } from './elements/GreekGodSelectList';

const Lobby: React.FC = () => {
  const { getUser } = useAuth();
  const [characterSelected, setCharacterSelected] = React.useState<Character>(
    getUser().characters[0]
  );
  const [fight, setFight] = React.useState<Fight | undefined>(undefined);
  const [fightError, setFightError] = React.useState<string>('');

  const runFight = async (greekGodName: GreekGods): Promise<void> => {
    const { data, error } = await newFight(getUser()._id, greekGodName);

    if (data) setFight(data.fight);
    if (error) setFightError(error.message);
  };

  const selectGod = (characterIndex: number): void => {
    setCharacterSelected(getUser().characters[characterIndex]);
  };

  return (
    <Container title='Select a God to play'>
      <div className='flex flex-col items-center justify-around h-full'>
        <GreekGodSelectList onSelectGod={selectGod} />
        <div className='flex flex-col items-center w-full'>
          <Button
            onClick={() => runFight(characterSelected.name)}
            disabled={characterSelected.attack === 0}
          >
            Start the Fight
          </Button>
          <p className='text-red-500'>{fightError}</p>
        </div>
      </div>
      {fight && (
        <Redirect
          to={{
            pathname: '/room',
            state: { fight: fight },
          }}
        />
      )}
    </Container>
  );
};

export default Lobby;
