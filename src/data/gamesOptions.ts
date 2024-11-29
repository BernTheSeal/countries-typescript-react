import {
  flagMatchGameOptionsType,
  populationShowdownGameOptionsType,
  hiddenFlagGameOptionsType,
} from "../types/gamesOptionsType";

export const flagMatchDefaultOptions: flagMatchGameOptionsType = {
  defaultTime: 10,
  defaultNumberOfFlag: 4,
};

export const populationShowdownDefaultOptions: populationShowdownGameOptionsType =
  { defaultTime: 10 };

export const hiddenFLagDefaultOptions: hiddenFlagGameOptionsType = {
  defaultEnergy: 5,
  defaultSkip: 20,
  defaultReveal: 40,
};
