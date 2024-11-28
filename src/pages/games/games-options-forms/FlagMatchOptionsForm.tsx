import { FunctionComponent } from "react";
import { formComponentProps } from "../../../types/gamesCardType";
import { flagMatchDefaultOptions } from "../../../data/gamesOptions";
import { flagMatchFormData } from "../../../data/gamesFormData";
import RangeInput from "./inputs/RangeInput";
import ClickInput from "./inputs/ClickInput";

const FlagMatchOptionsForm: FunctionComponent<formComponentProps> = ({
  setOptions,
  resetForm,
}) => {
  const { time, numberOfFlags } = flagMatchFormData;
  const { defaultTime, defaultNumberOfFlag } = flagMatchDefaultOptions;

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <RangeInput
        title="time"
        icon="fa-solid fa-clock"
        defaultValue={defaultTime}
        minValue={time.min}
        maxValue={time.max}
        setOptions={setOptions}
        resetForm={resetForm}
      />

      <ClickInput
        title="flags"
        icon="fa-solid fa-flag"
        defaultValue={defaultNumberOfFlag}
        optionsArray={numberOfFlags}
        setOptions={setOptions}
        resetForm={resetForm}
      />
    </form>
  );
};

export default FlagMatchOptionsForm;
