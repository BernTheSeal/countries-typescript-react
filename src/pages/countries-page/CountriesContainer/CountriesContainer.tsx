import CountryCard from "./CountryCard";
import { CountryType } from "../../../types/countryType";
import { FunctionComponent } from "react";
import { searchCountryUtils } from "../../../utils/searchUtils";
import { sortingOptionsType } from "../../../types/countryFetchOptionsType";

interface CountriesContainerProps {
  sortingOptions: sortingOptionsType;
  countries: CountryType[];
  searchValue: string;
}

const CountriesContainer: FunctionComponent<CountriesContainerProps> = ({
  countries,
  searchValue,
  sortingOptions,
}) => {
  const filteredCountries = searchCountryUtils(
    countries,
    searchValue,
    sortingOptions.sortingType === "alphabetical"
  );

  return (
    <div className="countries-container">
      {searchValue && filteredCountries.length > 0 && (
        <div className="countries-container-foundedCountries">
          <span> {filteredCountries.length}</span>
          <p>countries founded</p>
        </div>
      )}

      {searchValue && filteredCountries.length === 0 && (
        <div className="countries-container-noCountry">
          <p>No country found matching your search.</p>
          <span>"{searchValue}"</span>
        </div>
      )}

      {filteredCountries.map((country: CountryType) => {
        const originalIndex =
          countries.findIndex((c) => c.name.common === country.name.common) + 1;
        const isDesc = sortingOptions.sortingOrder === "desc";

        return (
          <CountryCard
            countries={countries}
            searchValue={searchValue}
            country={country}
            sortingType={sortingOptions.sortingType}
            rank={isDesc ? originalIndex : countries.length + 1 - originalIndex}
          />
        );
      })}
    </div>
  );
};

export default CountriesContainer;
