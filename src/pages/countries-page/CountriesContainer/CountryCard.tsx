import { FunctionComponent, useState } from "react";
import { CountryType } from "../../../types/countryType";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { sortingOptionsType } from "../../../types/countryFetchOptionsType";
import SortingTypeContent from "./SortingTypeContent";
import SortingDetailContent from "./SortingDetailContent";

interface CountryCardProps {
  countries: CountryType[];
  country: CountryType;
  searchValue: string;
  sortingType: sortingOptionsType["sortingType"];
  rank: number;
}

const CountryCard: FunctionComponent<CountryCardProps> = ({
  countries,
  country,
  searchValue,
  sortingType,
  rank,
}) => {
  const navigate: NavigateFunction = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [sortingDetailContentList, setSortingDetailContentList] = useState<
    string[]
  >([]);

  const highlightMatch = (text: string, term: string) => {
    if (!term) return text;

    const normalizedTerm = term.replace(/\s+/g, "").toLowerCase();
    const regex = new RegExp(`(${normalizedTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) => {
      let normalizePart = part.normalize("NFD");
      return regex.test(normalizePart) ? (
        <span key={index} style={{ color: "#2e61ff" }}>
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  const formatRank = (rank: number): string => {
    if (rank < 10) {
      return `00${rank}`;
    } else if (rank < 100) {
      return `0${rank}`;
    }
    return `${rank}`;
  };

  const handleSortingDetailContentList = (clickedCountry: CountryType) => {
    if (selectedCountry.toLowerCase() === clickedCountry.name.toLowerCase()) {
      setSelectedCountry("");
      setSortingDetailContentList([]);
    } else {
      switch (sortingType) {
        case "neighbors":
          if (!clickedCountry.borders) return;
          setSelectedCountry(clickedCountry.name.toLowerCase());
          const countriesNames = countries.filter((country: CountryType) =>
            clickedCountry.borders.includes(country.cca3)
          );
          setSortingDetailContentList(
            countriesNames.map((country: CountryType) => country.name)
          );
          break;
        case "languages":
          if (!clickedCountry.languages) return;
          setSelectedCountry(clickedCountry.name.toLowerCase());
          const languages = Object.values(clickedCountry.languages);
          setSortingDetailContentList(languages);
          break;

        default:
          break;
      }
    }
  };

  return (
    <div className="countryCard">
      <div
        onClick={() => navigate(country.name)}
        className="countryCard-container"
      >
        {sortingType !== "alphabetical" && (
          <div className="countryCard-container-num">{formatRank(rank)}</div>
        )}
        <div className="countryCard-container-flag">
          <img src={country.flags.png} alt="flag" />
        </div>
        <div
          className={`countryCard-container-content ${
            selectedCountry === country.name.toLowerCase()
              ? "selectedContent"
              : ""
          }`}
        >
          <div
            className={`countryCard-container-content-name ${
              sortingType !== "alphabetical"
                ? "sortingTypeActive"
                : "sortingTypeInactive"
            }`}
          >
            <h2>{highlightMatch(country.name, searchValue)}</h2>
            <h3 style={{ marginTop: country.capital ? "-8px" : "0px" }}>
              {country.capital}
            </h3>
          </div>
          {sortingType &&
            SortingTypeContent({ country, handleSortingDetailContentList })[
              sortingType
            ]}
        </div>
      </div>
      {selectedCountry === country.name.toLowerCase() && (
        <SortingDetailContent
          sortingDetailContentList={sortingDetailContentList}
        />
      )}
    </div>
  );
};

export default CountryCard;
