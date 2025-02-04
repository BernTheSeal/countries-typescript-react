import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
  useRef,
} from "react";
import { sortingOptionsType } from "../../../../types/countryFetchOptionsType";
import { FaLongArrowAltUp } from "react-icons/fa";
import useClickOutside from "../../../../hooks/use-clickOutside";

interface sortingInputProps {
  sortingOptions: sortingOptionsType;
  setSortingOptions: Dispatch<SetStateAction<sortingOptionsType>>;
}

interface displaySorting {
  up: sortingOptionsType["sortingType"] | undefined;
  down: sortingOptionsType["sortingType"] | undefined;
}

type animationDirections = "up" | "down" | undefined;

const SortingInput: FunctionComponent<sortingInputProps> = ({
  sortingOptions,
  setSortingOptions,
}) => {
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [displayUpAndDown, setDisplayUpAndDown] = useState<displaySorting>({
    up: undefined,
    down: undefined,
  });
  const [displaySorting, setDisplaySorting] = useState<
    sortingOptionsType["sortingType"]
  >(sortingOptions.sortingType);

  const [animationDirection, setAnimationDirection] =
    useState<animationDirections>(undefined);
  const sortingMenuRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const buttons: sortingOptionsType["sortingOrder"][] = ["asc", "desc"];
  const sortingTypeList: sortingOptionsType["sortingType"][] = [
    "alphabetical",
    "population",
    "area",
    "languages",
    "neighbors",
  ];

  const handleClose = () => {
    setIsSortingMenuOpen(false);
    setTimeout(() => {
      setIsOpening(false);
    }, 200);
  };

  useClickOutside([sortingMenuRef, buttonRef], () => {
    handleClose();
  });

  const handleSortingMenuOpen = () => {
    if (!isOpening) {
      setIsOpening(!isOpening);
      setTimeout(() => {
        setIsSortingMenuOpen(!isSortingMenuOpen);
      }, 0);
    } else {
      setIsSortingMenuOpen(!isSortingMenuOpen);
      setTimeout(() => {
        setIsOpening(!isOpening);
      }, 200);
    }
  };

  const handleChangeSortingType = (options: sortingOptionsType): void => {
    const [currentType, currentOrder] = [
      sortingOptions.sortingType,
      sortingOptions.sortingOrder,
    ];
    const [selectedType, selectedOrder] = [
      options.sortingType,
      options.sortingOrder,
    ];

    if (currentType === selectedType && currentOrder === selectedOrder) return;

    setDisplayUpAndDown((prev: displaySorting) => {
      const [prevIndex, currentIndex] = [
        sortingTypeList.indexOf(currentType),
        sortingTypeList.indexOf(selectedType),
      ];

      if (prevIndex > currentIndex) {
        setAnimationDirection("up");
        return { ...prev, up: selectedType };
      } else if (prevIndex < currentIndex) {
        setAnimationDirection("down");
        return { ...prev, down: selectedType };
      } else {
        return prev;
      }
    });
    setTimeout(() => {
      setDisplaySorting(options.sortingType);
      setAnimationDirection(undefined);
    }, 200);

    setSortingOptions({
      sortingType: options.sortingType,
      sortingOrder: options.sortingOrder,
    });
  };

  return (
    <div className="sortingInput-container">
      <div
        className={`sortingInput-container-currentSorting ${
          isSortingMenuOpen ? "active" : "inactive"
        }`}
      >
        <button onClick={handleSortingMenuOpen} ref={buttonRef}>
          <div
            className={`${animationDirection === "up" ? "slideUp" : ""} ${
              animationDirection === "down" ? "slideDown" : ""
            }`}
          >
            <span>{displayUpAndDown.up}</span>
            <span>{displaySorting}</span>
            <span>{displayUpAndDown.down}</span>
          </div>
          <FaLongArrowAltUp
            className={`${
              sortingOptions.sortingOrder === "desc" ? "desc" : ""
            }`}
          />
        </button>
      </div>
      {isOpening && (
        <ul
          className={`sortingInput-container-sortingOptions ${
            isSortingMenuOpen ? "active" : "inactive"
          }`}
          ref={sortingMenuRef}
        >
          {sortingTypeList.map(
            (s: sortingOptionsType["sortingType"], index) => {
              const { sortingType, sortingOrder } = sortingOptions;
              return (
                <li
                  key={index}
                  className={`${sortingType === s ? "active" : ""}`}
                >
                  <p>{s}</p>
                  <div>
                    {buttons.map((b, index) => (
                      <button
                        key={index}
                        className={`${
                          sortingOrder === b && sortingType === s
                            ? "active"
                            : ""
                        } ${b === "desc" ? "desc" : ""}`}
                        onClick={() => {
                          handleChangeSortingType({
                            sortingType: s,
                            sortingOrder: b,
                          });
                        }}
                      >
                        <FaLongArrowAltUp />
                      </button>
                    ))}
                  </div>
                </li>
              );
            }
          )}
        </ul>
      )}
    </div>
  );
};

export default SortingInput;
