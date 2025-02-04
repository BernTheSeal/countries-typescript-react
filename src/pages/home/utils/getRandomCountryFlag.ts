import { CountryType } from "../../../types/countryType";

const getRandomCountryFlag = (countries: CountryType[]) => {
  console.log(
    countries[Math.floor(Math.random() * countries.length)].flags.png
  );
  return (
    countries &&
    countries[Math.floor(Math.random() * countries.length)].flags.png
  );
};

export default getRandomCountryFlag;
