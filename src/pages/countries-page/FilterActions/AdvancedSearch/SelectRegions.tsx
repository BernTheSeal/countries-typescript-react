import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { countryFetchOptionsType } from "../../../../types/countryFetchOptionsType";

interface selectRegionsProps {
  setAdvancedSearchOptions: Dispatch<SetStateAction<countryFetchOptionsType>>;
}

const SelectRegions = ({ setAdvancedSearchOptions }: selectRegionsProps) => {
  const [isSelctedRegionsOpen, setIsSelectedRegionsOpen] =
    useState<boolean>(false);
  const regions: countryFetchOptionsType["regions"] = [
    "Antarctic",
    "Americas",
    "Asia",
    "Africa",
    "Europe",
    "Oceania",
  ];

  const [selectedRegions, setSelectedRegions] = useState<
    countryFetchOptionsType["regions"]
  >([]);

  useEffect(() => {
    setAdvancedSearchOptions((prev: countryFetchOptionsType) => {
      return {
        ...prev,
        regions:
          selectedRegions && selectedRegions.length > 0
            ? selectedRegions
            : undefined,
      };
    });
  }, [selectedRegions]);

  const handleSelectedRegions = (selectedRegion: string) => {
    setSelectedRegions((prev) => {
      if (prev && !prev.includes(selectedRegion)) {
        return [...prev, selectedRegion];
      } else {
        return prev && prev.filter((r: string) => r !== selectedRegion);
      }
    });
  };

  return (
    <div className="AdvancedSearch-container-content-regionsInput">
      <div
        onClick={() => setIsSelectedRegionsOpen(!isSelctedRegionsOpen)}
        className="AdvancedSearch-container-content-regionsInput-title"
      >
        <span>Select Regions</span>
        {selectedRegions && selectedRegions.length > 0 && (
          <div>{selectedRegions.length}</div>
        )}
      </div>
      {isSelctedRegionsOpen && (
        <div className="AdvancedSearch-container-content-regionsInput-drowDown">
          {regions.map((r, index) => (
            <button
              key={index}
              className={
                selectedRegions && selectedRegions.includes(r)
                  ? "selectedRegions"
                  : ""
              }
              onClick={() => handleSelectedRegions(r)}
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectRegions;
