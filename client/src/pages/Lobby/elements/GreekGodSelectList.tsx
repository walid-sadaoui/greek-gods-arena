import Button from 'components/common/Button';
import { Character } from 'models/Character';
import React from 'react';
import { useAuth } from 'shared/context/AuthContext';
import { GreekGodDetail } from './GreekGodDetail';

interface CharactersListProps {
  onSelectGod: (index: number) => void;
}

export const GreekGodSelectList: React.FC<CharactersListProps> = ({
  onSelectGod,
}) => {
  const { getUser } = useAuth();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const selectNextGod = (): void => {
    setCurrentIndex(
      currentIndex === getUser().characters.length - 1 ? 0 : currentIndex + 1
    );
  };

  const selectPreviousGod = (): void => {
    setCurrentIndex(
      currentIndex === 0 ? getUser().characters.length - 1 : currentIndex - 1
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
        {getUser().characters.map((greekGod, index) => {
          return renderGreekGodSelect(greekGod, index);
        })}
      </ul>
      <Button onClick={() => selectNextGod()}>{'>'}</Button>
    </div>
  );
};
