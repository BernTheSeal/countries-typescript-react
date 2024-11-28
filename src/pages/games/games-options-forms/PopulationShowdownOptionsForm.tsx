import { FunctionComponent } from "react";
import { formComponentProps } from "../../../types/gamesCardType";
import { populationShowdownDefaultOptions } from "../../../data/gamesOptions";
import { populationShowdownFormData } from "../../../data/gamesFormData";
import RangeInput from "./inputs/RangeInput";

const PopulationShowdownOptionsForm: FunctionComponent<formComponentProps> = ({
  setOptions,
  resetForm,
}) => {
  const { time } = populationShowdownFormData;
  const { defaultTime } = populationShowdownDefaultOptions;

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
    </form>
  );
};

export default PopulationShowdownOptionsForm;
