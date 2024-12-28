import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { countryFetchOptionsType } from "../../../../types/countryFetchOptionsType";
import { ChangeEvent } from "react";

interface setPopulationProps {
  setAdvancedSearchOptions: Dispatch<SetStateAction<countryFetchOptionsType>>;
}

const SetPopulation = ({ setAdvancedSearchOptions }: setPopulationProps) => {
  const [minValue, setMinValue] = useState<string>();
  const [maxValue, setMaxValue] = useState<string>();

  useEffect(() => {
    const interval = setTimeout(() => {
      setAdvancedSearchOptions((prev: countryFetchOptionsType) => {
        return {
          ...prev,
          populationValue: [
            minValue ? Number(minValue) : undefined,
            maxValue ? Number(maxValue) : undefined,
          ],
        };
      });
    }, 500);

    return () => clearInterval(interval);
  }, [minValue, maxValue]);

  return (
    <div className="AdvancedSearch-container-content-setValue">
      <input
        type="text"
        value={minValue}
        placeholder="Min Population"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMinValue(e.target.value)
        }
      />

      <input
        type="text"
        value={maxValue}
        placeholder="Max Population"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMaxValue(e.target.value)
        }
      />
    </div>
  );
};

export default SetPopulation;
