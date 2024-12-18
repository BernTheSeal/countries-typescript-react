import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface searchInputProps {
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const SearchInput: FunctionComponent<searchInputProps> = (props) => {
  const { setSearchValue } = props;

  const [localSearchValue, setLocalSearchValue] = useState<string>("");

  useEffect(() => {
    const handle = setTimeout(() => {
      setSearchValue(localSearchValue);
    }, 500);

    return () => clearTimeout(handle);
  }, [localSearchValue]);

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(e.target.value);
  };

  return (
    <div className="searchInput-container">
      <input
        placeholder="search country or capital..."
        type="search"
        value={localSearchValue}
        onChange={handleSearchValue}
      />
    </div>
  );
};

export default SearchInput;
