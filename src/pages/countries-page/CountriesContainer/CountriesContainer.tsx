import CountryCard from "./CountryCard";
import { CountryType } from "../../../types/countryType";
import { FunctionComponent } from "react";
import { searchCountryUtils } from "../../../utils/searchUtils";

interface CountriesContainerProps {
  countries: CountryType[];
  searchValue: string;
}

const CountriesContainer: FunctionComponent<CountriesContainerProps> = ({
  countries,
  searchValue,
}) => {
  const filteredCountries = searchCountryUtils(countries, searchValue);

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

      {filteredCountries.map((country: CountryType) => (
        <CountryCard searchValue={searchValue} country={country} />
      ))}
    </div>
  );
};

export default CountriesContainer;
