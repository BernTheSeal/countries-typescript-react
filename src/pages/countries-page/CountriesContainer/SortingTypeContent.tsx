import { CountryType } from "../../../types/countryType";
import { sortingOptionsType } from "../../../types/countryFetchOptionsType";

interface SortingTypeContentProps {
  country: CountryType;
  handleSortingDetailContentList: (country: CountryType) => void;
}

const SortingTypeContent = ({
  country,
  handleSortingDetailContentList,
}: SortingTypeContentProps): Partial<
  Record<
    Exclude<sortingOptionsType["sortingType"], undefined>,
    JSX.Element | null
  >
> => ({
  population: (
    <div>
      <p>{country.population.toLocaleString()}</p>
    </div>
  ),
  area: (
    <div>
      <p>
        {country.area.toLocaleString()}
        <span>
          km<sup>2</sup>
        </span>
      </p>
    </div>
  ),
  languages: (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleSortingDetailContentList(country);
      }}
    >
      <p>{country.languages ? Object.keys(country.languages).length : 0}</p>
      <span>languages</span>
    </div>
  ),
  neighbors: (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleSortingDetailContentList(country);
      }}
    >
      <p>{country.borders ? country.borders.length : 0}</p>
      <span>neighbors</span>
    </div>
  ),
});

export default SortingTypeContent;
