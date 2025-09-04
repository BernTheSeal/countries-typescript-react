import { useEffect, useMemo, useState } from "react";
import { clearInterval, setInterval, setTimeout } from "worker-timers";
import { useLocation } from "react-router-dom";
import "animate.css";

//*components
import GameOver from "../shared-components/GameOver";
import GameTitle from "../shared-components/GameTitle";

//*hooks
import useGetGameInfo from "../../hooks/use-getGameInfo";
import useGameTimer from "../../hooks/use-gameTimer";
import useCountdownTimer from "../../hooks/use-countdownTimer";
import useFetchCountriesData from "../../hooks/use-fetchCountriesData";
import { populationShowdownDefaultOptions } from "../../data/gamesOptions";

const PopulationShowdown = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [hasSwitchAnimation, setHasSwitchAnimation] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isVisibleCircle, setIsVisibleCircle] = useState<boolean>(true);
  const [isAnswerTrue, setIsAnswerTrue] = useState<any>(true);
  const [positionCircle, setPositionCircle] = useState<string>("100px");
  const [populationValue, setPopulationValue] = useState<any>(0);
  const [degValue, setDegValue] = useState<number>(0);
  const [degValueInterval, setDegValueInterval] = useState<any>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const { startTimer, stopTimer, elapsedTime } = useGameTimer();
  const { gameInfo, gameInfotTrigger } = useGetGameInfo(
    "populationShowdownGameInfo"
  );

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
  const { regions } = commonGameOptions;

  const currentTime = specificGameOptions.time
    ? specificGameOptions.time
    : populationShowdownDefaultOptions.defaultTime;

  const {
    displayTime,
    time,
    startTimeInterval,
    stopTimeInterval,
    resetTimeInterval,
  } = useCountdownTimer(currentTime);

  const { countries, countriesFetchTrigger } = useFetchCountriesData({
    sortingType: "shuffled",
    regions: regions || undefined,
  });

  const handleAnswer = (answer: string) => {
    const isHigher: boolean =
      answer == "higher" &&
      countries[currentIndex].population <
        countries[currentIndex + 1].population;
    const isLower: boolean =
      answer == "lower" &&
      countries[currentIndex].population >
        countries[currentIndex + 1].population;
    handleCountAnimation();
    setIsClick(true);
    clearInterval(degValueInterval);
    stopTimeInterval();

    if (isHigher || isLower) {
      setIsAnswerTrue(true);
      setTimeout(() => {
        setPositionCircle("0");
      }, 1400);
      setTimeout(() => {
        setIsVisibleCircle(false);
      }, 2200);
      setTimeout(() => {
        setHasSwitchAnimation(true);
        setScore((n) => n + displayTime);
      }, 2500);
      setTimeout(() => {
        resetTimeInterval();
        handleNextCountry();
      }, 2950);
    } else {
      setIsAnswerTrue(false);
      setTimeout(() => {
        setPositionCircle("0");
      }, 1400);
      setTimeout(() => {
        resetTimeInterval();
        stopTimer();
        setIsGameOver(!isGameOver);
      }, 2300);
    }
  };

  const handleNextCountry = () => {
    if (!specificGameOptions.isUnlimitedTime) {
      startTimeInterval();
    }
    startDegValueInterval();
    setPositionCircle("100px");
    setIsClick(false);
    setHasSwitchAnimation(false);
    setIsVisibleCircle(true);

    if (countries.length - (currentIndex + 2) < 2) {
      countriesFetchTrigger();
      setCurrentIndex(0);
      return;
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const startDegValueInterval = () => {
    setDegValue(0);
    if (degValueInterval) {
      clearInterval(degValueInterval);
    }

    const totalTime = currentTime;
    const updateInterval = 100;
    const totalDegValue = 360;
    const totalUpdates = (totalTime * 1000) / updateInterval;
    let elapsedUpdates = 0;
    let currentDegValue = 0;

    const progress = setInterval(() => {
      elapsedUpdates++;
      currentDegValue = (totalDegValue * elapsedUpdates) / totalUpdates;
      setDegValue(currentDegValue);

      if (currentDegValue >= totalDegValue) {
        clearInterval(progress);
        setDegValue(totalDegValue);
      }
    }, updateInterval);

    setDegValueInterval(progress);
  };

  const handleCountAnimation = () => {
    setPopulationValue(0);
    let currentValue = 0;
    let targetValue = countries[currentIndex + 1].population;
    const animationDuration = 1000;
    const incrementAmount = targetValue / (animationDuration / 10);
    const animationInterval = setInterval(() => {
      currentValue += incrementAmount;
      if (currentValue >= targetValue) {
        setPopulationValue(targetValue.toLocaleString());
        clearInterval(animationInterval);
      } else {
        setPopulationValue(Math.floor(currentValue).toLocaleString());
      }
    }, 10);
  };

  const handlePlayAgain = () => {
    resetTimeInterval();
    if (!specificGameOptions.isUnlimitedTime) {
      startTimeInterval();
    }
    setPositionCircle("100px");
    countriesFetchTrigger();
    gameInfotTrigger();
    setScore(0);
    setCurrentIndex(0);
    setIsClick(false);
    setIsGameOver(false);
    startTimer();
  };

  useEffect(() => {
    if (time === 10) {
      stopTimer();
      setIsGameOver(true);
    }
  }, [time]);

  useEffect(() => {
    if (!specificGameOptions.isUnlimitedTime) {
      startTimeInterval();
    }
    startDegValueInterval();
  }, [countries]);

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <>
      {isGameOver ? (
        <GameOver
          score={score}
          storageName="populationShowdownGameInfo"
          playAgain={handlePlayAgain}
          elapsedTime={elapsedTime}
          isCustomGame={isCustomGame}
        />
      ) : (
        <div className="ps-container">
          {countries.length > 0 && (
            <div className="ps-container-game">
              {gameInfo && (
                <GameTitle
                  title={"population showdown"}
                  iconLeft={"fa-solid fa-caret-up"}
                  iconRight={"fa-solid fa-caret-down"}
                  score={score}
                  highScore={gameInfo.highScore}
                  isCustomGame={isCustomGame}
                />
              )}
              <div
                style={{
                  background: !specificGameOptions.isUnlimitedTime
                    ? `conic-gradient(transparent ${degValue}deg, ${
                        isVisibleCircle ? "white" : "transparent"
                      } 0deg)`
                    : "transparent",
                }}
                className={`ps-container-game-circle  ${
                  isClick ? "circle-time-animation" : ""
                }`}
              >
                <div
                  className={`ps-container-game-circle-time animate__animated   ${
                    !isVisibleCircle ? "circle-animation" : ""
                  } `}
                >
                  {!specificGameOptions.isUnlimitedTime ? (
                    displayTime
                  ) : (
                    <i className="fa-solid fa-infinity"></i>
                  )}
                  {isAnswerTrue ? (
                    <div
                      className={`ps-container-game-circle-time-answer`}
                      style={{
                        top: positionCircle,
                        backgroundColor: "#22bb22",
                      }}
                    >
                      <i className="fa-solid fa-check"></i>
                    </div>
                  ) : (
                    <div
                      className={`ps-container-game-circle-time-answer`}
                      style={{
                        top: positionCircle,
                        backgroundColor: "#ff2222",
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`ps-container-game-card first-div ${
                  hasSwitchAnimation ? "firts-div-animation" : ""
                } `}
              >
                <div className="ps-container-game-card-info">
                  <div className="ps-container-game-card-info-firts-div">
                    <img src={countries[currentIndex].flags.png} alt="" />
                    <h3>{countries[currentIndex].name}</h3>
                  </div>
                  <div>
                    <p> has</p>
                    <h4>
                      {countries[currentIndex].population.toLocaleString()}
                    </h4>
                    <p>population</p>
                  </div>
                </div>
              </div>
              <div
                className={`ps-container-game-card second-div ${
                  hasSwitchAnimation ? "second-div-animation" : ""
                } `}
              >
                <div className="ps-container-game-card-info">
                  <div className="ps-container-game-card-info-firts-div">
                    <img src={countries[currentIndex + 1].flags.png} alt="" />
                    <h3>{countries[currentIndex + 1].name}</h3>
                  </div>
                  <div>
                    <p> has</p>
                    {!isClick ? (
                      <div className="ps-container-game-card-info-buttons">
                        <button onClick={() => handleAnswer("higher")}>
                          <span>Higher</span>
                          <i className="fa-solid fa-caret-up"></i>
                        </button>
                        <button onClick={() => handleAnswer("lower")}>
                          <span>Lower</span>
                          <i className="fa-solid fa-caret-down"></i>
                        </button>
                      </div>
                    ) : (
                      <h4>{populationValue}</h4>
                    )}
                    <p>
                      population{" "}
                      {!isClick ? `than ${countries[currentIndex].name}` : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`ps-container-game-card third-div ${
                  hasSwitchAnimation ? "third-div-animation" : ""
                }`}
              >
                <div className="ps-container-game-card-info">
                  <img src={countries[currentIndex + 2].flags.png} alt="" />
                  <div>
                    <h3>{countries[currentIndex + 2].name}</h3>
                    <p>
                      {countries[currentIndex + 2].population.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PopulationShowdown;
