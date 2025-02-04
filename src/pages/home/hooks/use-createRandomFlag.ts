import { useState } from "react";
import getRandomWidthAndHeight from "../utils/getRandomWidthAndHeight";
import getRandomCountryFlag from "../utils/getRandomCountryFlag";
import flagsConfig from "../config/flagsConfig";
import { flagImgType } from "../types/flagImgType";

const createRandomFlag = () => {
  const [flags, setFlags] = useState<flagImgType[]>([]);
  const { animationDuration } = flagsConfig;

  const createFlag = (countries: any) => {
    const randomAnimationDuration = Math.floor(
      Math.random() * (animationDuration.max - animationDuration.min + 1) +
        animationDuration.min
    );

    const proporites = getRandomWidthAndHeight();
    const randomPosition = Math.random() * 100;

    const newFlag: flagImgType = {
      id: Math.random(),
      left: randomPosition < 50 ? `${randomPosition}vw` : undefined,
      right: randomPosition >= 50 ? `${100 - randomPosition}vw` : undefined,
      animationDuration: `${randomAnimationDuration}s`,
      width: proporites.width,
      height: proporites.height,
      zIndex: proporites.zIndex,
      img: getRandomCountryFlag(countries),
    };

    setFlags((prevFlags: flagImgType[]) => [...prevFlags, newFlag]);

    setTimeout(() => {
      requestAnimationFrame(() => {
        setFlags((prevFlags: flagImgType[]) =>
          prevFlags.filter((flag: flagImgType) => flag.id !== newFlag.id)
        );
      });
    }, randomAnimationDuration * 1000);
  };

  return { flags, createFlag };
};

export default createRandomFlag;
