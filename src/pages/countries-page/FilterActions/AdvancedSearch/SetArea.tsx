import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { countryFetchOptionsType } from "../../../../types/countryFetchOptionsType";

interface setAreaProps {
  setAdvancedSearchOptions: Dispatch<SetStateAction<countryFetchOptionsType>>;
}

const SetArea = ({ setAdvancedSearchOptions }: setAreaProps) => {
  const [minValue, setMinValue] = useState<string>();
  const [maxValue, setMaxValue] = useState<string>();

  useEffect(() => {
    const interval = setTimeout(() => {
      setAdvancedSearchOptions((prev: countryFetchOptionsType) => {
        return {
          ...prev,
          areaValue: [
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
        placeholder="Min Area"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMinValue(e.target.value)
        }
      />

      <input
        type="text"
        value={maxValue}
        placeholder="Max Area"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMaxValue(e.target.value)
        }
      />
    </div>
  );
};

export default SetArea;
