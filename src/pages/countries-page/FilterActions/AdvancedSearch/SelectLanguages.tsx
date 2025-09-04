import { ChangeEvent, useEffect, useState, useRef } from "react";
import useFetchCountriesData from "../../../../hooks/use-fetchCountriesData";
import { advancedSearchInputPropsType } from "../../../../types/advancedSearchInputPropsType";
import useClickOutside from "../../../../hooks/use-clickOutside";

const SelectLanguages = ({
  handleUpdateAdvancedSearch,
  advancedSearchOptions,
}: advancedSearchInputPropsType) => {
  const { allCountries } = useFetchCountriesData({});
  const [isSelectedLanguagesOpen, setIsSelectedLanguagesOpen] =
    useState<boolean>(false);

  const [languages, setLanguages] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const selectedLanguages = advancedSearchOptions?.languages;
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  useClickOutside([contentRef], () => {
    setIsSelectedLanguagesOpen(false);
  });

  useEffect(() => {
    const allLanguages = allCountries
      .map((a) => a.languages && Object.values(a.languages))
      .flat()
      .filter(Boolean);

    const uniqueLanguages = Array.from(new Set(allLanguages)).sort((a, b) =>
      a.name.localeCompare(b)
    );

    setLanguages(uniqueLanguages);
  }, [allCountries]);

  return (
    <div
      ref={contentRef}
      className={`AdvancedSearch-container-content-languagesInput ${
        isSelectedLanguagesOpen ? "active" : ""
      }`}
    >
      <div
        onClick={() => setIsSelectedLanguagesOpen(!isSelectedLanguagesOpen)}
        className="AdvancedSearch-container-content-languagesInput-title"
      >
        <span>Select Languages</span>
        {selectedLanguages && selectedLanguages.length > 0 && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateAdvancedSearch(undefined, "languages");
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
            {languages.filter((l) => l.toLowerCase().includes(searchValue))
              .length > 0 ? (
              languages
                .filter((l) => l.toLowerCase().includes(searchValue))
                .map((l, index) => (
                  <button
                    key={index}
                    className={
                      selectedLanguages && selectedLanguages.includes(l)
                        ? "selectedLanguages"
                        : ""
                    }
                    onClick={() => handleUpdateAdvancedSearch(l, "languages")}
                  >
                    {l}
                  </button>
                ))
            ) : (
              <div>No languages found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectLanguages;
