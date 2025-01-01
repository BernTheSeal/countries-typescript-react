import { countryFetchOptionsType } from "./countryFetchOptionsType";

export type handleUpdateAdvancedSearchType = <
  T extends keyof countryFetchOptionsType
>(
  item: any,
  option: T
) => void;
