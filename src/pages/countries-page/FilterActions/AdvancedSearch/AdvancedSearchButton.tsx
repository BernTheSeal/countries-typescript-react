import { Dispatch, SetStateAction } from "react";

interface AdvancedSearchButtonProps {
  isAdvancedSearch: boolean;
  setIsAdvancedSearch: Dispatch<SetStateAction<boolean>>;
}

const AdvancedSearchButton = ({
  isAdvancedSearch,
  setIsAdvancedSearch,
}: AdvancedSearchButtonProps) => {
  const handleIsAdvancedSearch = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  return (
    <div className="advancedSearch-container">
      <button onClick={handleIsAdvancedSearch}>advanced search</button>
    </div>
  );
};

export default AdvancedSearchButton;
