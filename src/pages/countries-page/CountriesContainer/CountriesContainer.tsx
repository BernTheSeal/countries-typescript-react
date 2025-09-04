import CountryCard from "./CountryCard";
import { CountryType } from "../../../types/countryType";
import { Dispatch, FunctionComponent, SetStateAction, useEffect } from "react";
import { searchCountryUtils } from "../../../utils/searchUtils";
import {
  countryFetchOptionsType,
  sortingOptionsType,
} from "../../../types/countryFetchOptionsType";
import useFetchCountriesData from "../../../hooks/use-fetchCountriesData";

interface CountriesContainerProps {
  sortingOptions: sortingOptionsType;
  advancedSearchOptions: countryFetchOptionsType;
  searchValue: string;
  setFoundedCountriesLength: Dispatch<SetStateAction<number>>;
}

const CountriesContainer: FunctionComponent<CountriesContainerProps> = ({
  searchValue,
  sortingOptions,
  advancedSearchOptions,
  setFoundedCountriesLength,
}) => {
  const { countries, countriesFetchTrigger, allCountries } =
    useFetchCountriesData({
      ...sortingOptions,
      ...advancedSearchOptions,
    });
  const filteredCountries = searchCountryUtils(
    countries,
    searchValue,
    sortingOptions.sortingType === "alphabetical"
  );

  useEffect(() => {
    countriesFetchTrigger();
  }, [sortingOptions, advancedSearchOptions]);

  useEffect(() => {
    setFoundedCountriesLength(countries.length);
  }, [countries]);

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

      {filteredCountries.map((country: CountryType, index) => {
        const originalIndex =
          countries.findIndex((c) => c.name === country.name) + 1;
        const isDesc = sortingOptions.sortingOrder === "desc";

        return (
          <CountryCard
            key={index}
            countries={allCountries}
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
