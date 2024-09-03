export interface countryFetchOptionsType {
    sortingType?: "shuffled" | "alphabetical" | "population" | "area";
    sortingOrder?: "asc" | "desc"
    populationValue?: [minPopulation?: number | undefined, maxPopulation?: number | undefined];
    areaValue?: [minArea?: number | undefined, maxArea?: number | undefined];
    regions?: string[];
    languages?: string[];
    seaAccess?: boolean;
    independent?: boolean;
    unitedNations?: boolean;
}



