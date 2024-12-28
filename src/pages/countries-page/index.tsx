import Header from "../../components/Header";
import PageContainer from "../../components/PageContainer";
import PageTitle from "../../components/PageTitle";
import CountriesContainer from "./CountriesContainer/CountriesContainer";
import FilterActions from "./FilterActions";
import AdvancedSearchButton from "./FilterActions/AdvancedSearch/AdvancedSearchButton";
import AdvancedSearch from "./FilterActions/AdvancedSearch";
import SearchInput from "./FilterActions/SearchInput";
import SortingInput from "./FilterActions/SortingInput";
import { useState } from "react";
import Divider from "../../components/Divider";
import {
  countryFetchOptionsType,
  sortingOptionsType,
} from "../../types/countryFetchOptionsType";

const CountriesPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const [foundedCountriesLength, setFoundedCountriesLength] =
    useState<number>(0);

  const [advancedSearchOptions, setAdvancedSearchOptions] =
    useState<countryFetchOptionsType>({
      regions: undefined,
      languages: undefined,
      populationValue: undefined,
    });

  const [sortingOptions, setSortingOptions] = useState<sortingOptionsType>({
    sortingType: "alphabetical",
    sortingOrder: "asc",
  });

  const pageTitleIcons = [
    { radius: "5px", color: "#fa2828" },
    { radius: "5px", color: "#faf128" },
    { radius: "5px", color: "#1cb319" },
    { radius: "5px", color: "#9d19b3" },
  ];

  return (
    <>
      <Header onPage={"countries"} />

      <AdvancedSearch
        setAdvancedSearchOptions={setAdvancedSearchOptions}
        setIsAdvancedSearch={setIsAdvancedSearch}
        isAdvancedSearch={isAdvancedSearch}
        foundedCountriesLength={foundedCountriesLength}
      />

      <PageContainer>
        <PageTitle title="countries" icons={pageTitleIcons} />
        <FilterActions>
          <SearchInput setSearchValue={setSearchValue} />
          <div className="secondDiv">
            <AdvancedSearchButton
              isAdvancedSearch={isAdvancedSearch}
              setIsAdvancedSearch={setIsAdvancedSearch}
            />
            <SortingInput
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptions}
            />
          </div>
        </FilterActions>
        <Divider marginTop="40px" marginBottom="20px" />
        <CountriesContainer
          setFoundedCountriesLength={setFoundedCountriesLength}
          searchValue={searchValue}
          sortingOptions={sortingOptions}
          advancedSearchOptions={advancedSearchOptions}
        />
      </PageContainer>
    </>
  );
};

export default CountriesPage;
