import React from "react";
import Button from "components/common/Button";
import Input from "components/common/Input";

interface SkillUpdatrProps {
  label: string;
  value: number;
  maxPropertyValue: number;
  minPropertyValue: number;
  onChange: (updatedSkillValue: number) => void;
}

const SkillUpdater: React.FC<SkillUpdatrProps> = ({
  label,
  value,
  maxPropertyValue,
  minPropertyValue,
  onChange,
}) => {
  const [skillValue, setSkillValue] = React.useState<number>(value);

  const handleChange = (updatedSkillValue: number): void => {
    setSkillValue(updatedSkillValue);
    onChange(updatedSkillValue);
  };

  const getSkillPointsNeeded = (
    updatedSkillValue: number,
    skillLabel: string
  ): number => {
    const skillPointsNeeded =
      updatedSkillValue === 0 || skillLabel === "Health"
        ? 1
        : Math.ceil(updatedSkillValue / 5);
    return skillPointsNeeded;
  };

  React.useEffect(() => {
    setSkillValue(value);
  }, [value]);

  return (
    <div className="flex flex-col justify-center pb-2">
      <label htmlFor={label.toLowerCase()} className="font-sans">
        <span className="text-sm uppercase">{label}</span> (cost :{" "}
        {getSkillPointsNeeded(skillValue, label)} SP
        {getSkillPointsNeeded(skillValue, label) > 1 && "s"})
      </label>
      <div className="flex items-center justify-between w-40 font-mono">
        <Button
          disabled={skillValue <= minPropertyValue}
          onClick={() => handleChange(skillValue - 1)}
          type="button"
        >
          {"<"}
        </Button>
        <Input
          type="number"
          min={minPropertyValue}
          max={maxPropertyValue}
          value={skillValue}
          className="absolute w-0 h-0 opacity-0"
          onChange={(event) => {
            let newValue = parseInt(event.target.value);
            if (newValue < minPropertyValue) {
              newValue = minPropertyValue;
            }
            if (newValue > maxPropertyValue) {
              newValue = maxPropertyValue;
            }
            handleChange(newValue);
          }}
        ></Input>
        <span className="w-12 text-center">{skillValue}</span>
        <Button
          disabled={skillValue >= maxPropertyValue}
          onClick={() => handleChange(skillValue + 1)}
          type="button"
        >
          {">"}
        </Button>
      </div>
    </div>
  );
};

export default SkillUpdater;
