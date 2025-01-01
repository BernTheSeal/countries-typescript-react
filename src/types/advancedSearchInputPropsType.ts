import { countryFetchOptionsType } from "./countryFetchOptionsType";
import { handleUpdateAdvancedSearchType } from "./handleUpdateAdvancedSearchType";

export interface advancedSearchInputPropsType {
  advancedSearchOptions: countryFetchOptionsType;
  handleUpdateAdvancedSearch: handleUpdateAdvancedSearchType;
}
