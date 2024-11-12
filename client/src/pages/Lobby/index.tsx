import React from 'react';
import { Redirect } from 'react-router-dom';
import { newFight } from 'api/fights';
import { Fight } from 'models/Fight';
import Button from 'components/common/Button';
import Container, { ContainerRow } from 'components/common/Container';
import { Character, GreekGods } from 'models/Character';
import { GreekGodSelectList } from './elements/GreekGodSelectList';
import { useUniverse } from 'shared/context/UniverseContext';
import Card from 'components/common/Card';

const Lobby: React.FC = () => {
  const { universes, universeSelected } = useUniverse();
  const [characterSelected, setCharacterSelected] = React.useState<
    Character | undefined
  >(undefined);
  const [fight, setFight] = React.useState<Fight | undefined>(undefined);
  const [fightError, setFightError] = React.useState<string>('');

  const runFight = async (
    universeId: string,
    greekGodName: GreekGods
  ): Promise<void> => {
    const { data, error } = await newFight(universeId, greekGodName);

    if (data) setFight(data.fight);
    if (error) setFightError(error.message);
  };

  const selectGod = (characterIndex: number): void => {
    setCharacterSelected(universeSelected!.characters[characterIndex]);
  };

  return (
    <Container title='Select a God to play'>
      <ContainerRow>
        {universes.length > 0 && (
          <div className='flex flex-col'>
            {universes.map((universe) => {
              return (
                <Card>
                  <div className=''>{universe.universeName}</div>
                </Card>
              );
            })}
            <Button
              onClick={() =>
                runFight(
                  universeSelected!._id,
                  characterSelected?.name ?? GreekGods.ZEUS
                )
              }
            >
              Create Universe
            </Button>
          </div>
        )}
        {/* <Separator /> */}
        {universeSelected ? (
          <div className='flex flex-col items-center justify-around h-full'>
            <GreekGodSelectList onSelectGod={selectGod} />
            <div className='flex flex-col items-center w-full'>
              <Button
                onClick={() =>
                  runFight(
                    universeSelected._id,
                    characterSelected?.name ?? GreekGods.ZEUS
                  )
                }
                disabled={characterSelected?.attack === 0}
              >
                Start the Fight
              </Button>
              <p className='text-red-500'>{fightError}</p>
            </div>
          </div>
        ) : (
          <span>Please select a Universe</span>
        )}
      </ContainerRow>
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
