import { Dispatch, SetStateAction, useEffect } from "react";
import SelectRegions from "./SelectRegions";
import { countryFetchOptionsType } from "../../../../types/countryFetchOptionsType";
import SelectLanguages from "./SelectLanguages";
import SetPopulation from "./SetPopulation";
import { setBodyOverflow } from "../../../../utils/setBodyOverflow";
import SetArea from "./SetArea";
import ToggleFilters from "./ToggleFilters";
import Divider from "../../../../components/Divider";
import { handleUpdateAdvancedSearchType } from "../../../../types/handleUpdateAdvancedSearchType";

interface AdvancedSearchProps {
  setIsAdvancedSearch: Dispatch<SetStateAction<boolean>>;
  setAdvancedSearchOptions: Dispatch<SetStateAction<countryFetchOptionsType>>;
  advancedSearchOptions: countryFetchOptionsType;
  isAdvancedSearch: boolean;
  foundedCountriesLength: number;
}

const AdvancedSearch = ({
  setIsAdvancedSearch,
  setAdvancedSearchOptions,
  isAdvancedSearch,
  foundedCountriesLength,
  advancedSearchOptions,
}: AdvancedSearchProps) => {
  const handleUpdateAdvancedSearch: handleUpdateAdvancedSearchType = (
    item,
    option
  ) => {
    setAdvancedSearchOptions((prev: countryFetchOptionsType) => {
      switch (option) {
        case "regions":
        case "languages":
          if (!item) {
            return { ...prev, [option]: item };
          }
          const currentItems = (prev[option] ?? []) as string[];
          const newItems = !currentItems.includes(item as string)
            ? [...currentItems, item]
            : currentItems.filter((i) => i !== item);
          return {
            ...prev,
            [option]: newItems.length ? newItems : undefined,
          };
          break;
        case "populationValue":
        case "areaValue":
          const [min, max] = item.map((value: any) =>
            value && !isNaN(Number(value)) ? Number(value) : undefined
          );
          return { ...prev, [option]: [min, max] };
          break;
        case "seaAccess":
        case "independent":
        case "unitedNations":
          return {
            ...prev,
            [option]:
              item === undefined ? true : item === true ? false : undefined,
          };
          break;

        default:
          return { ...prev };
          break;
      }
    });
  };

  const handleDeleteAll = (): void => {
    setAdvancedSearchOptions({});
  };

  const handleOpenToggle = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  useEffect(() => {
    setBodyOverflow(isAdvancedSearch);
  }, [isAdvancedSearch]);

  return (
    <div
      className={`AdvancedSearch-container ${
        isAdvancedSearch ? "activeContainer" : "inactiveContainer"
      }`}
    >
      <div className="AdvancedSearch-container-content">
        <div className="AdvancedSearch-container-content-title">
          <h3>Advanced Search</h3>
        </div>

        <SelectRegions
          handleUpdateAdvancedSearch={handleUpdateAdvancedSearch}
          advancedSearchOptions={advancedSearchOptions}
        />
        <SelectLanguages
          handleUpdateAdvancedSearch={handleUpdateAdvancedSearch}
          advancedSearchOptions={advancedSearchOptions}
        />
        <SetPopulation
          handleUpdateAdvancedSearch={handleUpdateAdvancedSearch}
          advancedSearchOptions={advancedSearchOptions}
        />
        <SetArea
          handleUpdateAdvancedSearch={handleUpdateAdvancedSearch}
          advancedSearchOptions={advancedSearchOptions}
        />
        <ToggleFilters
          handleUpdateAdvancedSearch={handleUpdateAdvancedSearch}
          advancedSearchOptions={advancedSearchOptions}
        />
        <Divider marginBottom="10px" marginTop="10px" />

        <div className="AdvancedSearch-container-content-foundedCountries">
          <p>
            <span> {foundedCountriesLength} </span>countries founded!
          </p>
        </div>

        <div className="AdvancedSearch-container-content-buttons">
          <button onClick={handleOpenToggle}>Done</button>
          <button onClick={handleDeleteAll}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
