import Button from 'components/common/Button';
import { Character } from 'models/Character';
import React from 'react';
import { GreekGodDetail } from './GreekGodDetail';
import { useUniverse } from 'shared/context/UniverseContext';

interface CharactersListProps {
  onSelectGod: (index: number) => void;
}

export const GreekGodSelectList: React.FC<CharactersListProps> = ({
  onSelectGod,
}) => {
  const { universeSelected } = useUniverse();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const selectNextGod = (): void => {
    setCurrentIndex(
      currentIndex === universeSelected!.characters.length - 1
        ? 0
        : currentIndex + 1
    );
  };

  const selectPreviousGod = (): void => {
    setCurrentIndex(
      currentIndex === 0
        ? universeSelected!.characters.length - 1
        : currentIndex - 1
    );
  };

  React.useEffect(() => {
    onSelectGod(currentIndex);
  }, [currentIndex]);

  const renderGreekGodSelect = (character: Character, index: number) => {
    return (
      index === currentIndex && (
        <li key={character.name}>
          <GreekGodDetail
            onUpdate={() => onSelectGod(currentIndex)}
            character={character}
          />
        </li>
      )
    );
  };

  return (
    <div className='flex items-center'>
      <Button onClick={() => selectPreviousGod()}>{'<'}</Button>
      <ul className='flex justify-center m-4'>
        {universeSelected!.characters.map((greekGod, index) => {
          return renderGreekGodSelect(greekGod, index);
        })}
      </ul>
      <Button onClick={() => selectNextGod()}>{'>'}</Button>
    </div>
  );
};
