export interface sortingOptionsType {
  sortingType?:
    | "shuffled"
    | "alphabetical"
    | "population"
    | "area"
    | "languages"
    | "neighbors";
  sortingOrder?: "asc" | "desc";
}

export interface countryFetchOptionsType extends sortingOptionsType {
  populationValue?: [
    minPopulation?: number | undefined,
    maxPopulation?: number | undefined
  ];
  areaValue?: [minArea?: number | undefined, maxArea?: number | undefined];
  regions?: string[];
  languages?: string[];
  seaAccess?: boolean;
  independent?: boolean;
  unitedNations?: boolean;
}
