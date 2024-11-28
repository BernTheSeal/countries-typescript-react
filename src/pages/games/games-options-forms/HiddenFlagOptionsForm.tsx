import { FunctionComponent } from "react";
import { hiddenFlagFormData } from "../../../data/gamesFormData";
import { hiddenFLagDefaultOptions } from "../../../data/gamesOptions";
import { formComponentProps } from "../../../types/gamesCardType";
import RangeInput from "./inputs/RangeInput";

const HiddenFlagOptionsForm: FunctionComponent<formComponentProps> = ({
  setOptions,
  resetForm,
}) => {
  const { energy, skip, reveal } = hiddenFlagFormData;
  const { defaultEnergy, defaultSkip, defaultReveal } =
    hiddenFLagDefaultOptions;

  const rangeInputData = [
    {
      title: "energy",
      icon: "fa-solid fa-heart",
      defaultValue: defaultEnergy,
      minValue: energy.min,
      maxValue: energy.max,
    },
    {
      title: "skip",
      icon: "fa-solid fa-play",
      defaultValue: defaultSkip,
      minValue: skip.min,
      maxValue: skip.max,
    },
    {
      title: "reveal",
      icon: "fa-solid fa-square-xmark",
      defaultValue: defaultReveal,
      minValue: reveal.min,
      maxValue: reveal.max,
    },
  ];

  return (
    <form>
      {rangeInputData.map((inputData) => {
        const { title, icon, defaultValue, minValue, maxValue } = inputData;
        return (
          <RangeInput
            title={title}
            icon={icon}
            defaultValue={defaultValue}
            minValue={minValue}
            maxValue={maxValue}
            setOptions={setOptions}
            resetForm={resetForm}
          />
        );
      })}
    </form>
  );
};

export default HiddenFlagOptionsForm;
