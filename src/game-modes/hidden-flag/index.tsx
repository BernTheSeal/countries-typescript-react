import { CountryType } from "../../types/countryType";
import { useEffect, useState, useMemo } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import GameOver from "../shared-components/GameOver";
import StatusBar from "./StatusBar";
import GameInfo from "./GameInfo";
import GameTitle from "../shared-components/GameTitle";
import ScoreInfoBar from "./ScoreInfoBar";
import useGetGameInfo from "../../hooks/use-getGameInfo";
import useGameTimer from "../../hooks/use-gameTimer";
import useFetchCountriesData from "../../hooks/use-fetchCountriesData";
import { hiddenFLagDefaultOptions } from "../../data/gamesOptions";

const HiddenFlag = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(10);
  const [inputValue, setInputValue] = useState<string>("");
  const [hiddenArray, setHiddenArray] = useState<string[]>([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);
  const [isFlagAnimating, setIsFlagAnimating] = useState<boolean>(false);
  const [searchCountries, setSearchCountries] = useState<CountryType[]>([]);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [onHover, setOnHover] = useState<number | null>(null);

  const { defaultSkip, defaultEnergy, defaultReveal } =
    hiddenFLagDefaultOptions;
  const { startTimer, stopTimer, elapsedTime } = useGameTimer();
  const { gameInfo, getGameInfo } = useGetGameInfo("hiddenFlagGameInfo");

  const location = useLocation();
  const commonGameOptions = useMemo(
    () => location.state?.commonGameOptions || {},
    [location.state]
  );
  const specificGameOptions = useMemo(
    () => location.state?.specificGameOptions || {},
    [location.state]
  );

  const [isCustomGame] = useState<boolean>(
    !!(
      Object.keys(commonGameOptions).length ||
      Object.keys(specificGameOptions).length
    )
  );

  const energy = specificGameOptions?.energy
    ? specificGameOptions?.energy
    : defaultEnergy;

  const skip = specificGameOptions?.skip
    ? specificGameOptions?.skip
    : defaultSkip;

  const reveal = specificGameOptions?.reveal
    ? specificGameOptions?.reveal
    : defaultReveal;

  const { isUnlimitedEnergy, isUnlimitedSkip, isUnlimitedReveal } =
    specificGameOptions && specificGameOptions;

  const [energyCount, setEnergyCount] = useState<number>(energy);

  const [skipCount, setSkipCount] = useState<number>(skip);

  const [revealLimit, setRevealLimit] = useState<number>(reveal);

  const { regions } = commonGameOptions;
  const { countries, countriesFetchTrigger, allCountries } =
    useFetchCountriesData({
      sortingType: "shuffled",
      regions: regions || undefined,
    });

  useEffect(() => {
    console.log(specificGameOptions);
  }, [specificGameOptions]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchCountries.length > 0) {
      handleAnswer(searchCountries[0].name.common);
    }
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleinputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const normalizeString = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "")
      .trim();
  };

  const handleNextFlag = (isSkip?: boolean): void => {
    setInputValue("");
    setIsAnswerCorrect(null);
    const initialHiddenArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    if (isSkip) {
      if (skipCount > 0) {
        if (!isUnlimitedSkip) {
          setSkipCount((prev) => prev - 1);
        }
        setCurrentScore(initialHiddenArray.length + 1);
      } else {
        return;
      }
    } else {
      setCurrentScore(initialHiddenArray.length + 1);
    }
    setIsFlagAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * initialHiddenArray.length);
      const updatedArray = initialHiddenArray.filter(
        (index) => index !== initialHiddenArray[randomIndex]
      );
      setHiddenArray(updatedArray);
      setTimeout(() => {
        if (countries && countries.length - 1 == currentIndex) {
          setCurrentIndex(-1);
        }
        setCurrentIndex((prev) => prev + 1);
        setIsFlagAnimating(false);
      }, 200);
    }, 200);
    setIsAnswered(false);
  };

  const handleDeleteABox = (selectedBox?: string): void => {
    let updatedArray: string[] = [];
    if (selectedBox) {
      if (revealLimit > 0) {
        if (!isUnlimitedReveal) {
          setRevealLimit((prev) => prev - 1);
        }
        updatedArray = hiddenArray.filter((index) => index !== selectedBox);
      } else {
        return;
      }
    } else {
      const randomIndex = Math.floor(Math.random() * hiddenArray.length);
      updatedArray = hiddenArray.filter(
        (index) => index !== hiddenArray[randomIndex]
      );
    }
    setHiddenArray(updatedArray);
    setCurrentScore(updatedArray.length + 2);
  };

  const handleAnswer = (answer: string): void => {
    if (inputValue !== "") {
      setInputValue("");
      setIsAnswered(true);
      setHiddenArray([]);
      if (countries && countries[currentIndex].name.common == answer) {
        setIsAnswerCorrect(true);
        setScore((prev) => {
          if (currentScore === 10) {
            return prev + currentScore * 2;
          } else {
            return prev + currentScore;
          }
        });
        setTimeout(() => {
          handleNextFlag();
        }, 2000);
      } else {
        setIsAnswerCorrect(false);
        if (!isUnlimitedEnergy) {
          setEnergyCount((prev) => prev - 1);
        }
        if (energyCount > 1) {
          setScore((prev: number) => {
            if (currentScore === 10) {
              if (score - (currentScore * 2 - 5) > 0) {
                return prev - (currentScore * 2 - 5);
              } else {
                return 0;
              }
            } else {
              if (score - (currentScore * 2 - 5) > 0) {
                return prev - (currentScore - 2);
              } else {
                return 0;
              }
            }
          });
          setTimeout(() => {
            handleNextFlag(false);
          }, 2000);
        } else {
          setTimeout(() => {
            stopTimer();
            setIsGameOver(true);
          }, 1200);
        }
      }
    }
  };

  const handleSearchCountry = (countries: any): void => {
    const updatedValue = normalizeString(inputValue);
    if (updatedValue.length > 0) {
      const result = [...countries]
        .filter((country: CountryType) =>
          normalizeString(country.name.common).startsWith(
            updatedValue.slice(0, updatedValue.length)
          )
        )
        .slice(0, 3);
      if (result.length > 0) {
        setSearchCountries(result);
        return;
      }
    }
    if (updatedValue.length > 0) {
      const result = [...countries]
        .filter((country: CountryType) =>
          normalizeString(country.name.common).includes(updatedValue)
        )
        .slice(0, 3);
      setSearchCountries(result);
    }
  };

  const handlePlayAgain = () => {
    countriesFetchTrigger();
    startTimer();
    getGameInfo();
    handleNextFlag(false);
    setSkipCount(10);
    setEnergyCount(3);
    setRevealLimit(20);
    setScore(0);
    setIsAnswered(false);
    setIsGameOver(false);
  };

  useEffect(() => {
    handleSearchCountry(allCountries);
  }, [inputValue]);

  useEffect(() => {
    startTimer();
    handleDeleteABox();
  }, []);

  return (
    <>
      {isGameOver ? (
        <GameOver
          score={score}
          storageName="hiddenFlagGameInfo"
          elapsedTime={elapsedTime}
          playAgain={handlePlayAgain}
          isCustomGame={isCustomGame}
        />
      ) : (
        <div className="hf-container">
          <div className="hf-container-game">
            {gameInfo && (
              <GameTitle
                title={"hidden flag"}
                iconLeft={"fa-solid fa-flag"}
                iconRight={"fa-regular fa-flag"}
                score={score}
                highScore={gameInfo.highScore}
                isCustomGame={isCustomGame}
              />
            )}
            <div className="hf-container-game-content">
              <div
                onContextMenu={handleContextMenu}
                className="hf-container-game-content-header"
              >
                <div
                  style={{ scale: isFlagAnimating ? "0" : "1" }}
                  className="hf-container-game-content-header-flag"
                >
                  <div className="hf-container-game-content-header-flag-hidden">
                    {Array.from({ length: 9 }).map((_, index) => {
                      const activeBox = hiddenArray.includes(String(index));
                      return (
                        <div
                          onMouseEnter={() => setOnHover(index)}
                          onMouseLeave={() => setOnHover(null)}
                          onClick={() =>
                            activeBox && handleDeleteABox(String(index))
                          }
                          key={index}
                          style={{
                            backgroundColor: activeBox ? "#333" : "",
                            cursor:
                              revealLimit > 0 && activeBox ? "pointer" : "",
                          }}
                          className={`hf-container-game-content-header-flag-hidden-box`}
                        >
                          {onHover === index && (
                            <i
                              style={{
                                visibility: hiddenArray.includes(String(index))
                                  ? "visible"
                                  : "hidden",
                                color: revealLimit > 0 ? "#fff989" : "#525252",
                              }}
                              className={`fa-solid fa-xmark ${
                                revealLimit > 0 ? "hf-game-hoverI" : ""
                              } `}
                            ></i>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {countries &&
                  countries.length > 0 &&
                  currentIndex >= 0 &&
                  currentIndex < countries.length ? (
                    <img
                      src={countries[currentIndex].flags.png}
                      alt="current flag"
                    />
                  ) : null}
                </div>
                <div className="hf-container-game-content-header-buttons">
                  <button
                    disabled={isAnswered}
                    onClick={() => handleDeleteABox()}
                    className={`${
                      hiddenArray.length > 0
                        ? "hf-game-button-active"
                        : "hf-game-button-inactive"
                    }`}
                  >
                    <i className="fa-solid fa-expand"></i>
                  </button>
                  <button
                    disabled={isAnswered}
                    onClick={() => handleNextFlag(true)}
                    className={`${
                      skipCount > 0
                        ? "hf-game-button-active"
                        : "hf-game-button-inactive"
                    }`}
                  >
                    <i className="fa-solid fa-forward"></i>
                  </button>
                </div>
                <div className="hf-container-game-content-header-player-info"></div>
                <GameInfo positionFrom="right" distanceInPx={400}>
                  <StatusBar
                    name={"energy"}
                    count={energyCount}
                    maxValue={energy}
                    color="#cd3737"
                    icon="fa-solid fa-heart"
                    isUnlimited={isUnlimitedEnergy}
                  />
                  <StatusBar
                    name={"skip"}
                    count={skipCount}
                    maxValue={skip}
                    color=" #37c3cd"
                    icon="fa-solid fa-play"
                    isUnlimited={isUnlimitedSkip}
                  />
                  <StatusBar
                    name={"reveal"}
                    count={revealLimit}
                    maxValue={reveal}
                    color=" #37cd57"
                    icon="fa-solid fa-square-xmark"
                    isUnlimited={isUnlimitedReveal}
                  />
                </GameInfo>
                {!isCustomGame && (
                  <GameInfo positionFrom="left" distanceInPx={400}>
                    <ScoreInfoBar currentScore={currentScore} />
                  </GameInfo>
                )}
              </div>
              <div className="hf-container-game-content-footer">
                <div
                  className={`${
                    inputValue.length > 0
                      ? "hf-game-search-active"
                      : "hf-game-search-inactive"
                  }  hf-container-game-content-footer-search`}
                >
                  {searchCountries.length > 0 ? (
                    searchCountries.map(
                      (country: CountryType, index: number) => (
                        <div
                          onClick={() => handleAnswer(country.name.common)}
                          className="hf-container-game-content-footer-search-countryBox"
                          key={index}
                        >
                          <div className="hf-container-game-content-footer-search-countryBox-name">
                            {" "}
                            {country.name.common}
                          </div>
                          {index === 0 && (
                            <div className="hf-container-game-content-footer-search-countryBox-enter">
                              <span>
                                {" "}
                                <AiOutlineEnter className="hf-container-game-content-footer-search-countryBox-enter-icon" />
                              </span>
                              <span>enter</span>
                            </div>
                          )}
                        </div>
                      )
                    )
                  ) : (
                    <div className="hf-container-game-content-footer-search-notFoundedBox">
                      <span> "{inputValue}"</span>
                    </div>
                  )}
                </div>
                <div className="hf-container-game-content-footer-input">
                  <input
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleinputValue(e);
                    }}
                    type="text"
                    placeholder="type country name..."
                  />
                  <i className="fa-solid fa-arrow-right"></i>
                  {isAnswered && (
                    <div
                      className={`${
                        isAnswerCorrect
                          ? "hf-game-correct-answer"
                          : "hf-game-wrong-answer"
                      } hf-container-game-content-footer-input-answer`}
                    >
                      <p>
                        {isAnswerCorrect ? "correct answer" : "wrong answer"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HiddenFlag;
