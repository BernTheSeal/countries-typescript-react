import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from "react";

interface searchInputProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const SearchInput: FunctionComponent<searchInputProps> = (props) => {
  const { searchValue, setSearchValue } = props;

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="searchInput-container">
      <input
        placeholder="search country or capital..."
        type="search"
        value={searchValue}
        onChange={handleSearchValue}
      />
    </div>
  );
};

export default SearchInput;
