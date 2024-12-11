import { FunctionComponent } from "react";
import { CountryType } from "../../../types/countryType";
import { NavigateFunction } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface CountryCardProps {
  country: CountryType;
  searchValue: string;
}

const CountryCard: FunctionComponent<CountryCardProps> = ({
  country,
  searchValue,
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

  return (
    <div
      onClick={() => navigate(country.name.common)}
      className="countryCard-container"
    >
      <div className="countryCard-container-flag">
        <img src={country.flags.png} alt="flag" />
      </div>
      <div className="countryCard-container-content">
        <div className="countryCard-container-content-name">
          <h2>{highlightMatch(country.name.common, searchValue)}</h2>
          <h3>{country.capital}</h3>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
