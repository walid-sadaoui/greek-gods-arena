import Button from "components/common/Button";
import { Character } from "models/Character";
import React from "react";
import { GreekGodDetail } from "./GreekGodDetail";
import { useTeam } from "shared/context/TeamContext";
import { Team } from "models/Team";

interface CharactersListProps {
  onSelectGod: (team: Team, index: number) => void;
}

export const GreekGodSelectList: React.FC<CharactersListProps> = ({
  onSelectGod,
}) => {
  const { teamSelected } = useTeam();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const selectNextGod = (): void => {
    setCurrentIndex(
      currentIndex === teamSelected!.characters.length - 1
        ? 0
        : currentIndex + 1
    );
  };

  const selectPreviousGod = (): void => {
    setCurrentIndex(
      currentIndex === 0
        ? teamSelected!.characters.length - 1
        : currentIndex - 1
    );
  };

  React.useEffect(() => {
    onSelectGod(teamSelected!, currentIndex);
  }, [currentIndex]);

  const renderGreekGodSelect = (character: Character, index: number) => {
    return (
      index === currentIndex && (
        <li key={character.name}>
          <GreekGodDetail
            onUpdate={() => onSelectGod(teamSelected!, currentIndex)}
            character={character}
          />
        </li>
      )
    );
  };

  return (
    <div className="flex items-center">
      <Button onClick={() => selectPreviousGod()}>{"<"}</Button>
      <ul className="flex justify-center m-4">
        {teamSelected!.characters.map((greekGod, index) => {
          return renderGreekGodSelect(greekGod, index);
        })}
      </ul>
      <Button onClick={() => selectNextGod()}>{">"}</Button>
    </div>
  );
};
