import { useState } from "react";
import getRandomWidthAndHeight from "../utils/getRandomWidthAndHeight";
import getRandomCountry from "../utils/getRandomCountry";
import flagsConfig from "../config/flagsConfig";
import { flagImgType } from "../types/flagImgType";
import { v4 as uuidv4 } from "uuid";
import { CountryType } from "../../../types/countryType";

const useFlagAnimations = () => {
  const [flags, setFlags] = useState<flagImgType[]>([]);
  const { animationDuration } = flagsConfig;

  const createFlag = (countries: CountryType[]) => {
    const randomAnimationDuration = Math.floor(
      Math.random() * (animationDuration.max - animationDuration.min + 1) +
        animationDuration.min
    );

    const proporites = getRandomWidthAndHeight();
    const randomPosition = Math.random() * 100;

    const newFlag: flagImgType = {
      id: uuidv4(),
      left: randomPosition < 50 ? `${randomPosition}vw` : undefined,
      right: randomPosition >= 50 ? `${100 - randomPosition}vw` : undefined,
      animationDuration: `${randomAnimationDuration}s`,
      width: proporites.width,
      height: proporites.height,
      zIndex: proporites.zIndex,
      countryProperties: getRandomCountry(countries),
      timeoutId: setTimeout(() => {
        requestAnimationFrame(() => {
          setFlags((prevFlags: flagImgType[]) =>
            prevFlags.filter((flag: flagImgType) => flag.id !== newFlag.id)
          );
        });
      }, randomAnimationDuration * 1000),
    };

    setFlags((prevFlags: flagImgType[]) => [...prevFlags, newFlag]);
  };

  const deleteFlag = (flagId: string) => {
    const flag = flags.find((flag) => flag.id === flagId);
    if (flag) {
      flag.timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          setFlags((prevFlags: flagImgType[]) => {
            return prevFlags.filter((flag: flagImgType) => flag.id !== flagId);
          });
        });
      }, animationDuration.max * 1000);
    }
  };

  const resumeFlag = (flagId: string) => {
    const flag = flags.find((flag) => flag.id === flagId);
    if (flag) {
      clearTimeout(flag.timeoutId);
    }
  };

  return { flags, createFlag, deleteFlag, resumeFlag };
};

export default useFlagAnimations;
