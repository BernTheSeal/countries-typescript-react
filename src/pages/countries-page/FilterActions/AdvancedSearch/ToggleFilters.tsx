import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { countryFetchOptionsType } from "../../../../types/countryFetchOptionsType";

interface setToogleFilterProps {
  setAdvancedSearchOptions: Dispatch<SetStateAction<countryFetchOptionsType>>;
}
const ToggleFilters = ({ setAdvancedSearchOptions }: setToogleFilterProps) => {
  interface toggleOptions {
    seaAccess?: boolean;
    independent?: boolean;
    unitedNations?: boolean;
  }
  const [toggleOptions, setToggleOptions] = useState<toggleOptions>({
    seaAccess: undefined,
    independent: undefined,
    unitedNations: undefined,
  });

  const handleToggle = (key: keyof toggleOptions) => {
    setToggleOptions((prev) => ({
      ...prev,
      [key]:
        prev[key] === undefined ? true : prev[key] === true ? false : undefined,
    }));
  };

  useEffect(() => {
    setAdvancedSearchOptions((prev: countryFetchOptionsType) => {
      return { ...prev, ...toggleOptions };
    });
  }, [toggleOptions]);

  return (
    <div className="AdvancedSearch-container-content-toggleFilters">
      <div>
        <label
          className={
            toggleOptions.seaAccess === true
              ? "active"
              : toggleOptions.seaAccess === false
              ? "inactive"
              : "undefined"
          }
        >
          <input
            type="checkbox"
            checked={!!toggleOptions.seaAccess}
            onChange={() => handleToggle("seaAccess")}
          />
          Sea Access
        </label>
        <label
          className={
            toggleOptions.unitedNations === true
              ? "active"
              : toggleOptions.unitedNations === false
              ? "inactive"
              : "undefined"
          }
        >
          <input
            type="checkbox"
            checked={!!toggleOptions.unitedNations}
            onChange={() => handleToggle("unitedNations")}
          />
          United Nations
        </label>
      </div>
      <div>
        <label
          className={
            toggleOptions.independent === true
              ? "active"
              : toggleOptions.independent === false
              ? "inactive"
              : "undefined"
          }
        >
          <input
            type="checkbox"
            checked={!!toggleOptions.independent}
            onChange={() => handleToggle("independent")}
          />
          Independent
        </label>
      </div>
    </div>
  );
};

export default ToggleFilters;
