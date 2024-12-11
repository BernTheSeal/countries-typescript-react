import Header from "../../components/Header";
import PageContainer from "../../components/PageContainer";
import PageTitle from "../../components/PageTitle";
import CountriesContainer from "./CountriesContainer/CountriesContainer";
import FilterActions from "./FilterActions";
import AdvancedSearch from "./FilterActions/AdvancedSearch";
import SearchInput from "./FilterActions/SearchInput";
import SortingInput from "./FilterActions/SortingInput";
import useFetchCountriesData from "../../hooks/use-fetchCountriesData";
import { useState } from "react";

const CountriesPage = () => {
  const { countries, countriesFetchTrigger, loading } = useFetchCountriesData({
    sortingType: "alphabetical",
    sortingOrder: "asc",
  });

  const [searchValue, setSearchValue] = useState<string>("");

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
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <div className="secondDiv">
            <AdvancedSearch />
            <SortingInput />
          </div>
        </FilterActions>
        <div className="divider"></div>
        <CountriesContainer countries={countries} searchValue={searchValue} />
      </PageContainer>
    </>
  );
};

export default CountriesPage;
