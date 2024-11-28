export interface commonGameOptionsType {
  regions?: string[];
  endlessMode?: boolean;
}

export interface flagMatchGameOptionsType {
  defaultTime: number;
  defaultNumberOfFlag: number;
}

export interface populationShowdownGameOptionsType {
  defaultTime: number;
}

export interface hiddenFlagGameOptionsType {
  defaultEnergy: number;
  defaultSkip: number;
  defaultReveal: number;
}
