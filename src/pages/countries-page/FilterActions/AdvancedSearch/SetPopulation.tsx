import { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { advancedSearchInputPropsType } from "../../../../types/advancedSearchInputPropsType";
import { formatToReadableNumber } from "../../../../utils/formatToReadableNumber";

const SetPopulation = ({
  handleUpdateAdvancedSearch,
  advancedSearchOptions,
}: advancedSearchInputPropsType) => {
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");

  useEffect(() => {
    if (!advancedSearchOptions?.populationValue) {
      setMin("");
      setMax("");
    }
  }, [advancedSearchOptions?.populationValue]);

  useEffect(() => {
    const interval = setTimeout(() => {
      handleUpdateAdvancedSearch([min, max], "populationValue");
    }, 500);
    return () => clearInterval(interval);
  }, [min, max]);

  return (
    <div className="AdvancedSearch-container-content-setValue">
      <input
        type="text"
        value={formatToReadableNumber(min)}
        placeholder="Min Population"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMin(e.target.value.replace(/[^0-9]/g, ""))
        }
      />

      <input
        type="text"
        value={formatToReadableNumber(max)}
        placeholder="Max Population"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMax(e.target.value.replace(/[^0-9]/g, ""))
        }
      />
    </div>
  );
};

export default SetPopulation;
