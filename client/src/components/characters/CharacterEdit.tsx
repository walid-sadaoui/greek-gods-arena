import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Character } from "models/Character";
import Button, { Variants } from "components/common/Button";
import SkillUpdater from "./SkillUpdater";
import { IconName } from "components/common/Icon";
import { useUniverse } from "shared/context/UniverseContext";
import { updateCharacter } from "api/universes";

interface CharacterEditProps {
  character: Character;
  onUpdate: (character: Character) => void;
  onCancel: () => void;
}

interface EditCharacterInput {
  health: number;
  attack: number;
  defense: number;
  magik: number;
}

const SERVER_ERROR = "Server Error, please try again later";

const CharacterEdit: React.FC<CharacterEditProps> = ({
  character,
  onUpdate,
  onCancel,
}) => {
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");
  const [characterToEdit, setCharacterToEdit] = useState<Character>(character);
  const { handleSubmit, register, setValue } = useForm<EditCharacterInput>({
    mode: "all",
  });
  const { universeSelected } = useUniverse();

  const getMaxPropertyValue = (propertyValue: number): number => {
    let remainingSkillPoints = characterToEdit.skillPoints;
    let maxValue = propertyValue;
    while (remainingSkillPoints > 0) {
      if (maxValue === 0) {
        remainingSkillPoints = remainingSkillPoints - 1;
      } else {
        remainingSkillPoints = remainingSkillPoints - Math.ceil(maxValue / 5);
      }
      if (remainingSkillPoints >= 0) maxValue = maxValue + 1;
    }
    return maxValue;
  };

  const getMaxHealthValue = (): number => {
    const maxHealth = characterToEdit.health + characterToEdit.skillPoints;
    return maxHealth;
  };

  const updateSkill = (
    newSkillValue: number,
    skillName: string,
    previousSkillValue: number
  ): void => {
    if (newSkillValue > previousSkillValue) {
      increaseSkill(skillName);
    } else {
      decreaseSkill(skillName);
    }
  };

  const increaseSkill = (skillName: string): void => {
    switch (skillName) {
      case "health":
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            health: characterToEdit.health + 1,
            skillPoints: characterToEdit.skillPoints - 1,
          },
        });
        break;
      case "attack":
        const remainingAttack =
          characterToEdit.skillPoints -
          Math.ceil((characterToEdit.attack + 1) / 5);
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            attack: characterToEdit.attack + 1,
            skillPoints: remainingAttack,
          },
        });
        break;
      case "defense":
        const remainingDefense =
          characterToEdit.skillPoints -
          Math.ceil((characterToEdit.defense + 1) / 5);
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            defense: characterToEdit.defense + 1,
            skillPoints: remainingDefense,
          },
        });
        break;
      case "magik":
        const remainingMagik =
          characterToEdit.skillPoints -
          Math.ceil((characterToEdit.magik + 1) / 5);
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            magik: characterToEdit.magik + 1,
            skillPoints: remainingMagik,
          },
        });
        break;

      default:
        break;
    }
  };

  const decreaseSkill = (skillName: string): void => {
    switch (skillName) {
      case "health":
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            health: characterToEdit.health - 1,
            skillPoints: characterToEdit.skillPoints + 1,
          },
        });
        break;
      case "attack":
        const remainingAttack =
          characterToEdit.skillPoints +
          (characterToEdit.attack === 1
            ? 1
            : Math.ceil((characterToEdit.attack - 1) / 5));
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            attack: characterToEdit.attack - 1,
            skillPoints: remainingAttack,
          },
        });
        break;
      case "defense":
        const remainingDefense =
          characterToEdit.skillPoints +
          (characterToEdit.defense === 1
            ? 1
            : Math.ceil((characterToEdit.defense - 1) / 5));
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            defense: characterToEdit.defense - 1,
            skillPoints: remainingDefense,
          },
        });
        break;
      case "magik":
        const remainingMagik =
          characterToEdit.skillPoints +
          (characterToEdit.magik === 1
            ? 1
            : Math.ceil((characterToEdit.magik - 1) / 5));
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            magik: characterToEdit.magik - 1,
            skillPoints: remainingMagik,
          },
        });
        break;

      default:
        break;
    }
  };

  const onSubmit: SubmitHandler<EditCharacterInput> = async (
    characterSkills
  ) => {
    try {
      const { data, error } = await updateCharacter(
        universeSelected!._id,
        character.name,
        characterSkills
      );

      if (data) {
        const updatedCharacterIndex = universeSelected!.characters.findIndex(
          (character: Character) => {
            return character.name === data.character.name;
          }
        );
        universeSelected!.characters[updatedCharacterIndex] = data.character;
        setCharacterToEdit(data.character);
        onUpdate(data.character);
      }
      if (error) {
        setServerErrorMessage(error.message);
      }
    } catch (error) {
      setServerErrorMessage(SERVER_ERROR);
    }
  };

  React.useEffect(() => {
    setValue("health", characterToEdit.health);
    setValue("attack", characterToEdit.attack);
    setValue("defense", characterToEdit.defense);
    setValue("magik", characterToEdit.magik);
  }, [characterToEdit]);

  React.useEffect(() => {
    setCharacterToEdit(character);
  }, [character]);

  React.useEffect(() => {
    register("health");
    register("attack");
    register("defense");
    register("magik");
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center p-4"
    >
      <span className="font-sans uppercase">
        SkillPoints : {characterToEdit.skillPoints}
      </span>
      <SkillUpdater
        onChange={(skillValue) =>
          updateSkill(skillValue, "health", characterToEdit.health)
        }
        label="Health"
        maxPropertyValue={getMaxHealthValue()}
        minPropertyValue={character.health}
        value={characterToEdit.health}
      />
      <SkillUpdater
        onChange={(skillValue) => {
          updateSkill(skillValue, "attack", characterToEdit.attack);
        }}
        label="Attack"
        maxPropertyValue={getMaxPropertyValue(characterToEdit.attack)}
        minPropertyValue={character.attack}
        value={characterToEdit.attack}
      />
      <SkillUpdater
        onChange={(skillValue) =>
          updateSkill(skillValue, "defense", characterToEdit.defense)
        }
        label="Defense"
        maxPropertyValue={getMaxPropertyValue(characterToEdit.defense)}
        minPropertyValue={character.defense}
        value={characterToEdit.defense}
      />
      <SkillUpdater
        onChange={(skillValue) =>
          updateSkill(skillValue, "magik", characterToEdit.magik)
        }
        label="Magik"
        maxPropertyValue={getMaxPropertyValue(characterToEdit.magik)}
        minPropertyValue={character.magik}
        value={characterToEdit.magik}
      />
      <div className="flex items-center">
        <Button
          icon={IconName.CLOSE}
          onClick={onCancel}
          className="text-red-500"
          variant={Variants.BASE}
        />
        <Button
          type="submit"
          className="text-green-500"
          icon={IconName.CHECK}
          disabled={
            character.name !== characterToEdit.name ||
            (character.name === characterToEdit.name &&
              character.skillPoints === characterToEdit.skillPoints)
          }
        />
      </div>
      <span className="text-red-500">{serverErrorMessage}</span>
    </form>
  );
};

export default CharacterEdit;
