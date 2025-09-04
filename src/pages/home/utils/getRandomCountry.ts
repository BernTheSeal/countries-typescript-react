import { CountryType } from "../../../types/countryType";

const getRandomCountry = (countries: CountryType[]) => {
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  return (
    countries && {
      flag: randomCountry.flags.png,
      name: randomCountry.name,
    }
  );
};

export default getRandomCountry;
