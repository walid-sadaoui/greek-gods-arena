import React from 'react';
import { Character } from 'models/Character';
export const CharacterSelected: React.FC<{
  greekGodSelected: Character;
}> = ({ greekGodSelected }) => {
  return (
    <div className='flex flex-col items-center p-4 border-2 border-black rounded-container'>
      <img
        src={`/src/assets/img/greek-gods/${greekGodSelected.name}.svg`}
        alt={`${greekGodSelected.name}`}
        className='m-4 h-36'
      />
      <span className='text-3xl font-greek'>{greekGodSelected.name}</span>
      <span className='pb-4 font-greek'>Lvl. {greekGodSelected.level}</span>
    </div>
  );
};
