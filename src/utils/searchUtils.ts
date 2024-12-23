import { CountryType } from "../types/countryType";

export const searchCountryUtils = (
  countries: CountryType[],
  inputValue: string,
  isAlphabetical: boolean
): CountryType[] => {
  const normalizeString = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "")
      .trim();
  };

  const updatedValue = normalizeString(inputValue);

  if (updatedValue.length === 0) {
    return countries;
  }

  if (updatedValue.length > 0) {
    if (isAlphabetical) {
      const startWith = [...countries].filter((country) =>
        normalizeString(country.name.common).startsWith(updatedValue)
      );

      const including = [...countries].filter(
        (country) =>
          normalizeString(country.name.common).includes(updatedValue) &&
          !normalizeString(country.name.common).startsWith(updatedValue)
      );

      if (startWith.length > 0 || including.length > 0) {
        return [...startWith, ...including];
      }
    } else {
      const including = [...countries].filter((country) =>
        normalizeString(country.name.common).includes(updatedValue)
      );
      if (including.length > 0) {
        return [...including];
      }
    }
  }

  return [];
};
