import flagsConfig from "../config/flagsConfig";

const getRandomWidthAndHeight = () => {
  const { widthAndHeight } = flagsConfig;
  return widthAndHeight[Math.floor(Math.random() * widthAndHeight.length)];
};

export default getRandomWidthAndHeight;
