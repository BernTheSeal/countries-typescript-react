import {
  Dispatch,
  ChangeEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { countryFetchOptionsType } from "../../../../types/countryFetchOptionsType";
import useFetchCountriesData from "../../../../hooks/use-fetchCountriesData";

interface selectLanguagesProps {
  setAdvancedSearchOptions: Dispatch<SetStateAction<countryFetchOptionsType>>;
}

const SelectLanguages = ({
  setAdvancedSearchOptions,
}: selectLanguagesProps) => {
  const { allCountries } = useFetchCountriesData({});
  const [isSelectedLanguagesOpen, setIsSelectedLanguagesOpen] =
    useState<boolean>(false);

  const [languages, setLanguages] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const [selectedLanguages, setSelectedLanguages] = useState<
    countryFetchOptionsType["languages"]
  >([]);

  useEffect(() => {
    setAdvancedSearchOptions((prev: countryFetchOptionsType) => {
      return {
        ...prev,
        languages:
          selectedLanguages && selectedLanguages.length > 0
            ? selectedLanguages
            : undefined,
      };
    });
  }, [selectedLanguages]);

  const handleSelectedLanguages = (selectedLanguages: string) => {
    setSelectedLanguages((prev: countryFetchOptionsType["regions"]) => {
      if (prev && !prev.includes(selectedLanguages)) {
        return [...prev, selectedLanguages];
      } else {
        return prev && prev.filter((r: string) => r !== selectedLanguages);
      }
    });
  };

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const allLanguages = allCountries
      .map((a) => a.languages && Object.values(a.languages))
      .flat()
      .filter(Boolean);

    const uniqueLanguages = Array.from(new Set(allLanguages)).sort((a, b) =>
      a.localeCompare(b)
    );

    setLanguages(uniqueLanguages);
  }, [allCountries]);

  return (
    <div className="AdvancedSearch-container-content-languagesInput">
      <div
        onClick={() => setIsSelectedLanguagesOpen(!isSelectedLanguagesOpen)}
        className="AdvancedSearch-container-content-languagesInput-title"
      >
        <span>Select Languages</span>
        {selectedLanguages && selectedLanguages.length > 0 && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedLanguages([]);
            }}
          >
            {selectedLanguages.length}
          </div>
        )}
      </div>
      {isSelectedLanguagesOpen && (
        <div className="AdvancedSearch-container-content-languagesInput-drowDown">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleChangeSearchValue(e)}
            placeholder="Search Languages"
          />
          <div className="AdvancedSearch-container-content-languagesInput-drowDown-menu">
            {languages
              .filter((l) => l.toLowerCase().includes(searchValue))
              .map((l, index) => (
                <button
                  key={index}
                  className={
                    selectedLanguages && selectedLanguages.includes(l)
                      ? "selectedLanguages"
                      : ""
                  }
                  onClick={() => handleSelectedLanguages(l)}
                >
                  {l}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectLanguages;
