import { useEffect, useMemo, useState } from "react";
import { setTimeout } from "worker-timers";
import { useLocation } from "react-router-dom";
import { flagMatchDefaultOptions } from "../../data/gamesOptions";

//*components
import GameOver from "../shared-components/GameOver";
import GameTitle from "../shared-components/GameTitle";

//*hooks
import useGetGameInfo from "../../hooks/use-getGameInfo";
import useGameTimer from "../../hooks/use-gameTimer";
import useCountdownTimer from "../../hooks/use-countdownTimer";
import useFetchCountriesData from "../../hooks/use-fetchCountriesData";
import { CountryType } from "../../types/countryType";

const FlagMatch = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isAnswerTrue, setIsAnswerTrue] = useState<boolean | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [isFlagAnimation, setIsFlagAnimation] = useState<boolean>(true);

  const { startTimer, stopTimer, elapsedTime } = useGameTimer();
  const { gameInfo, gameInfotTrigger } = useGetGameInfo("flagMatchGameInfo");

  const location = useLocation();
  const commonGameOptions = useMemo(
    () => location.state?.commonGameOptions || {},
    [location.state]
  );
  const specificGameOptions = useMemo(
    () => location.state?.specificGameOptions || {},
    [location.state]
  );

  const numberOfFLag = specificGameOptions?.numberOfFlag
    ? specificGameOptions.numberOfFlag
    : flagMatchDefaultOptions.defaultNumberOfFlag;
  const { regions } = commonGameOptions;
  const {
    displayTime,
    time,
    startTimeInterval,
    stopTimeInterval,
    resetTimeInterval,
  } = useCountdownTimer(
    specificGameOptions.time
      ? specificGameOptions.time
      : flagMatchDefaultOptions.defaultTime
  );
  const [isCustomGame] = useState<boolean>(
    !!(
      Object.keys(commonGameOptions).length ||
      Object.keys(specificGameOptions).length
    )
  );
  const { countries, countriesFetchTrigger } = useFetchCountriesData({
    sortingType: "shuffled",
    regions: regions || undefined,
  });

  useEffect(() => {
    if (time === 10) {
      stopTimer();
      setIsGameOver(true);
    }
  }, [time]);

  useEffect(() => {
    if (countries && countries.length > 0) {
      handleCurrentCountries();
    }
  }, [currentIndex, countries]);

  useEffect(() => {
    startTimer();
  }, []);

  const handleCurrentCountries = () => {
    if (!specificGameOptions.isUnlimitedTime) {
      startTimeInterval();
    }
    setClickedIndex(null);
    setIsAnswerTrue(null);
    setIsClick(false);

    if (countries.length - currentIndex < numberOfFLag) {
      countriesFetchTrigger();
      setCurrentIndex(0);
      return;
    } else {
      const selectedCountry = countries.slice(
        currentIndex,
        currentIndex + numberOfFLag
      )[Math.floor(Math.random() * numberOfFLag)];
      setSelectedCountry(selectedCountry.name);
      setTimeout(() => {
        setIsFlagAnimation(false);
      }, 300);
    }
  };

  const handleAnswer = (countryName: string, index: number) => {
    stopTimeInterval();
    setIsClick(true);
    setClickedIndex(index);

    if (countryName === selectedCountry) {
      setIsAnswerTrue(true);
      setScore((n) => n + displayTime);
      setTimeout(() => {
        setIsFlagAnimation(true);
      }, 700);
      setTimeout(() => {
        resetTimeInterval();
        setCurrentIndex((prev) => prev + numberOfFLag);
      }, 1000);
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    setIsAnswerTrue(false);
    setTimeout(() => {
      stopTimer();
      setIsGameOver(true);
    }, 1000);
  };

  const handlePlayAgain = () => {
    countriesFetchTrigger();
    gameInfotTrigger();
    resetTimeInterval();
    startTimer();
    handleCurrentCountries();
    setCurrentIndex(0);
    setScore(0);
    setIsFlagAnimation(true);
    setIsGameOver(false);
  };

  return (
    <>
      {isGameOver ? (
        <GameOver
          score={score}
          storageName="flagMatchGameInfo"
          elapsedTime={elapsedTime}
          playAgain={handlePlayAgain}
          isCustomGame={isCustomGame}
        />
      ) : (
        <div className="fm-container">
          {gameInfo && (
            <GameTitle
              title={"flag match"}
              iconLeft={"fa-regular fa-flag"}
              iconRight={"fa-regular fa-flag"}
              score={score}
              highScore={gameInfo.highScore}
              isCustomGame={isCustomGame}
            />
          )}
          <div className="fm-container-gameArea">
            <div
              className={`fm-container-gameArea-flags flags-${numberOfFLag}`}
            >
              {countries
                .slice(currentIndex, currentIndex + numberOfFLag)
                .map((country: CountryType, index: number) => (
                  <div key={index}>
                    <button
                      className={`${!isClick ? "fm-button-default" : ""} ${
                        isFlagAnimation
                          ? "fm-flag-animation-hidden"
                          : "fm-flag-animation-appear"
                      }`}
                      disabled={isClick}
                      onClick={() => handleAnswer(country.name, index)}
                    >
                      <img src={country.flags.png} alt="flag" />
                      {isClick && index === clickedIndex && (
                        <div>
                          {isAnswerTrue ? (
                            <div className="fm-true-answer">
                              <i className="fa-solid fa-check"></i>
                            </div>
                          ) : (
                            <div className="fm-wrong-answer">
                              <i className="fa-solid fa-xmark"></i>
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  </div>
                ))}
            </div>
            <div className="fm-container-gameArea-time">
              <h3>{selectedCountry ? selectedCountry : null}</h3>
              {specificGameOptions.isUnlimitedTime ? (
                <p>
                  <i className="fa-solid fa-infinity"></i>
                </p>
              ) : (
                <p>{displayTime}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlagMatch;
