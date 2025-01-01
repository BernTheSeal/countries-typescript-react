import { useState, useRef } from "react";
import { countryFetchOptionsType } from "../../../../types/countryFetchOptionsType";
import { advancedSearchInputPropsType } from "../../../../types/advancedSearchInputPropsType";
import useClickOutside from "../../../../hooks/use-clickOutside";

const SelectRegions = ({
  handleUpdateAdvancedSearch,
  advancedSearchOptions,
}: advancedSearchInputPropsType) => {
  const [isSelctedRegionsOpen, setIsSelectedRegionsOpen] =
    useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const regions: countryFetchOptionsType["regions"] = [
    "Antarctic",
    "Americas",
    "Asia",
    "Africa",
    "Europe",
    "Oceania",
  ];

  const selectedRegions = advancedSearchOptions?.regions;
  useClickOutside([contentRef], () => {
    setIsSelectedRegionsOpen(false);
  });

  return (
    <div
      ref={contentRef}
      className={`AdvancedSearch-container-content-regionsInput ${
        isSelctedRegionsOpen ? "active" : ""
      }`}
    >
      <div
        onClick={() => setIsSelectedRegionsOpen(!isSelctedRegionsOpen)}
        className="AdvancedSearch-container-content-regionsInput-title"
      >
        <span>Select Regions</span>
        {selectedRegions && selectedRegions.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateAdvancedSearch(undefined, "regions");
            }}
          >
            {selectedRegions.length}
          </button>
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
              onClick={() => handleUpdateAdvancedSearch(r, "regions")}
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
