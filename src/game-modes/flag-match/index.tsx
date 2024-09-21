import { useEffect, useState } from "react"
import { setTimeout } from 'worker-timers';

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
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [selectedCountry, setSelectedCountry] = useState<string>('')
    const [score, setScore] = useState<number>(0)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [isClick, setIsClick] = useState<boolean>(false)
    const [isAnswerTrue, setIsAnswerTrue] = useState<boolean | null>(null);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null)
    const [isFlagAnimation, setIsFlagAnimation] = useState<boolean>(true)
    const { startTimer, stopTimer, elapsedTime } = useGameTimer()
    const defaultTimeCountdown = 10;
    const { displayTime, time, startTimeInterval, stopTimeInterval, resetTimeInterval } = useCountdownTimer(defaultTimeCountdown)
    const { gameInfo, gameInfotTrigger } = useGetGameInfo("flagMatchGameInfo")
    const { countries, countriesFetchTrigger } = useFetchCountriesData({
        sortingType: "shuffled",
    })

    useEffect(() => {
        if (time === 10) {
            stopTimer()
            setIsGameOver(true)
        }
    }, [time])

    useEffect(() => {
        if (countries && countries.length > 0) {
            handleCurrentCountries()
        }
    }, [currentIndex, countries])

    useEffect(() => {
        startTimer()
    }, [])

    const handleCurrentCountries = () => {
        startTimeInterval()
        setClickedIndex(null)
        setIsAnswerTrue(null)
        setIsClick(false)

        if (countries.length - currentIndex < 4) {
            countriesFetchTrigger()
            setCurrentIndex(0)
            return;

        } else {
            const selectedCountry = countries.slice(currentIndex, (currentIndex + 4))[Math.floor(Math.random() * 4)]
            setSelectedCountry(selectedCountry.name.common)
            setTimeout(() => {
                setIsFlagAnimation(false)
            }, 300);
        }
    }

    const handleAnswer = (countryName: string, index: number) => {
        stopTimeInterval()
        setIsClick(true)
        setClickedIndex(index)

        if (countryName === selectedCountry) {
            setIsAnswerTrue(true)
            setScore(n => n + displayTime)
            setTimeout(() => {
                setIsFlagAnimation(true)
            }, 700);
            setTimeout(() => {
                resetTimeInterval()
                setCurrentIndex(prev => prev + 4)
            }, 1000);
        } else {
            setIsAnswerTrue(false)
            setTimeout(() => {
                stopTimer()
                setIsGameOver(true)
            }, 1000);
        }
    }

    const handlePlayAgain = () => {
        countriesFetchTrigger()
        gameInfotTrigger()
        resetTimeInterval()
        startTimer()
        handleCurrentCountries()
        setCurrentIndex(0)
        setScore(0)
        setIsFlagAnimation(true)
        setIsGameOver(false)
    }

    return (
        <>
            {isGameOver ? (<GameOver
                score={score}
                storageName="flagMatchGameInfo"
                elapsedTime={elapsedTime}
                playAgain={handlePlayAgain}

            />)
                : (<div className="fm-container">
                {gameInfo && (
                    <GameTitle
                        title={'flag match'}
                        iconLeft={'fa-regular fa-flag'}
                        iconRight={'fa-regular fa-flag'}
                        score={score}
                        highScore={gameInfo.highScore}
                    />
                )}
                    <div className="fm-container-gameArea">
                        <div className="fm-container-gameArea-flags">
                            {countries.slice(currentIndex, (currentIndex + 4)).map((country: CountryType, index: number) => (
                                <div key={index} >
                                    <button
                                        className={`${isClick ? 'fm-button-clicked' : 'fm-button-default'} ${isFlagAnimation ? 'fm-flag-animation-hidden' : 'fm-flag-animation-appear'}`} disabled={isClick} onClick={() => handleAnswer(country.name.common, index)}>
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
                            <p>{displayTime}</p>
                        </div>
                    </div>
                </div>)}
        </>
    )
}

export default FlagMatch
