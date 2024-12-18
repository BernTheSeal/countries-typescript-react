import { FunctionComponent } from "react";
import { CountryType } from "../../../types/countryType";
import { NavigateFunction } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sortingOptionsType } from "../../../types/countryFetchOptionsType";

interface CountryCardProps {
  country: CountryType;
  searchValue: string;
  sortingType: sortingOptionsType["sortingType"];
  rank: number;
}

const CountryCard: FunctionComponent<CountryCardProps> = ({
  country,
  searchValue,
  sortingType,
  rank,
}) => {
  const navigate: NavigateFunction = useNavigate();

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

  return (
    <div
      onClick={() => navigate(country.name.common)}
      className="countryCard-container"
    >
      {sortingType !== "alphabetical" && (
        <div className="countryCard-container-num">{formatRank(rank)}</div>
      )}
      <div className="countryCard-container-flag">
        <img src={country.flags.png} alt="flag" />
      </div>
      <div className="countryCard-container-content">
        <div
          className={`countryCard-container-content-name ${
            sortingType ? "sortingTypeActive" : "sortingTypeInactive"
          }`}
        >
          <h2>{highlightMatch(country.name.common, searchValue)}</h2>
          <h3>{country.capital}</h3>
        </div>
        {sortingType === "population" && (
          <div>
            <p>{country.population.toLocaleString()}</p>
          </div>
        )}
        {sortingType === "area" && (
          <div>
            <p>
              {country.area.toLocaleString()}{" "}
              <span>
                km<sup>2</sup>
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryCard;
