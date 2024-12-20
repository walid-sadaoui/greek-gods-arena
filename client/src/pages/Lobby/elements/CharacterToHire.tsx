import { createCharacter } from 'api/users';
import Button from 'components/common/Button';
import { Character, GreekGods } from 'models/Character';
import React from 'react';
import { useUniverse } from 'shared/context/UniverseContext';

export const CharacterToHire: React.FC<{
  greekGodName: GreekGods;
  onHire: (character: Character) => void;
}> = ({ greekGodName, onHire }) => {
  const { universeSelected } = useUniverse();

  const hireGod = async (): Promise<void> => {
    const { data } = await createCharacter(universeSelected!._id, greekGodName);
    if (data) {
      // await updateUserState();
      onHire(data.character);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-4'>
      <img
        src={`/greek-gods/${greekGodName}.svg`}
        alt={`${greekGodName}`}
        className='m-4 h-36'
      />
      <span className='mb-4 text-3xl font-greek'>{greekGodName}</span>
      <Button onClick={hireGod}>{`Hire ${greekGodName}`}</Button>
    </div>
  );
};
