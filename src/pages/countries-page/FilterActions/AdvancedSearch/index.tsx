import { Dispatch, SetStateAction, useEffect } from "react";
import SelectRegions from "./SelectRegions";
import { countryFetchOptionsType } from "../../../../types/countryFetchOptionsType";
import SelectLanguages from "./SelectLanguages";
import SetPopulation from "./SetPopulation";
import { setBodyOverflow } from "../../../../utils/setBodyOverflow";
import SetArea from "./SetArea";
import ToggleFilters from "./ToggleFilters";
import Divider from "../../../../components/Divider";

interface AdvancedSearchProps {
  setIsAdvancedSearch: Dispatch<SetStateAction<boolean>>;
  setAdvancedSearchOptions: Dispatch<SetStateAction<countryFetchOptionsType>>;
  isAdvancedSearch: boolean;
  foundedCountriesLength: number;
}

const AdvancedSearch = ({
  setIsAdvancedSearch,
  setAdvancedSearchOptions,
  isAdvancedSearch,
  foundedCountriesLength,
}: AdvancedSearchProps) => {
  useEffect(() => {
    setBodyOverflow(isAdvancedSearch);
  }, [isAdvancedSearch]);

  const handleOpenToggle = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  return (
    <div
      className={`AdvancedSearch-container-content ${
        isAdvancedSearch ? "activeConent" : "inactiveContent"
      }`}
    >
      <div className="AdvancedSearch-container-content-title">
        <h3>Advanced Search</h3>
      </div>

      <SelectRegions setAdvancedSearchOptions={setAdvancedSearchOptions} />
      <SelectLanguages setAdvancedSearchOptions={setAdvancedSearchOptions} />
      <SetPopulation setAdvancedSearchOptions={setAdvancedSearchOptions} />
      <SetArea setAdvancedSearchOptions={setAdvancedSearchOptions} />
      <ToggleFilters setAdvancedSearchOptions={setAdvancedSearchOptions} />
      <Divider marginBottom="10px" marginTop="10px" />
      {foundedCountriesLength !== 250 && (
        <div className="AdvancedSearch-container-content-foundedCountries">
          <p>
            <span> {foundedCountriesLength} </span>countries founded!
          </p>
        </div>
      )}

      <div className="AdvancedSearch-container-content-buttons">
        <button onClick={handleOpenToggle}>Done</button>
        <button>Delete </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
