import Header from "../../components/Header";
import PageContainer from "../../components/PageContainer";
import PageTitle from "../../components/PageTitle";
import CountriesContainer from "./CountriesContainer/CountriesContainer";
import FilterActions from "./FilterActions";
import AdvancedSearch from "./FilterActions/AdvancedSearch";
import SearchInput from "./FilterActions/SearchInput";
import SortingInput from "./FilterActions/SortingInput";
import useFetchCountriesData from "../../hooks/use-fetchCountriesData";
import { useEffect, useState } from "react";

import { sortingOptionsType } from "../../types/countryFetchOptionsType";

const CountriesPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const [sortingOptions, setSortingOptions] = useState<sortingOptionsType>({
    sortingType: "alphabetical",
    sortingOrder: "asc",
  });

  const { countries, countriesFetchTrigger } = useFetchCountriesData({
    ...sortingOptions,
  });

  useEffect(() => {
    countriesFetchTrigger();
  }, [sortingOptions]);

  const pageTitleIcons = [
    { radius: "5px", color: "#fa2828" },
    { radius: "5px", color: "#faf128" },
    { radius: "5px", color: "#1cb319" },
    { radius: "5px", color: "#9d19b3" },
  ];

  return (
    <>
      <Header onPage={"countries"} />
      <PageContainer>
        <PageTitle title="countries" icons={pageTitleIcons} />
        <FilterActions>
          <SearchInput setSearchValue={setSearchValue} />
          <div className="secondDiv">
            <AdvancedSearch />
            <SortingInput
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptions}
            />
          </div>
        </FilterActions>
        <div className="divider"></div>
        <CountriesContainer
          countries={countries}
          searchValue={searchValue}
          sortingOptions={sortingOptions}
        />
      </PageContainer>
    </>
  );
};

export default CountriesPage;
