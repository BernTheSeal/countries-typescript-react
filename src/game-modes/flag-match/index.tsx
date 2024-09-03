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

const FlagMatch = () => {
    const [gameInfo, setGameInfo] = useState<any>('')
    const [currentCountries, setCurrentCountries] = useState<any>([])
    const [selectedCountry, setSelectedCountry] = useState<any>([])
    const [score, setScore] = useState<number>(0)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [isClick, setIsClick] = useState<boolean>(false)
    const [isAnswerTrue, setIsAnswerTrue] = useState<boolean | null>(null);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null)
    const [isFlagAnimation, setIsFlagAnimation] = useState<boolean>(false)
    const { getGameInfo } = useGetGameInfo()
    const { startTimer, stopTimer, elapsedTime } = useGameTimer()
    const defaultTimeCountdown = 10;
    const { displayTime, time, startTimeInterval, stopTimeInterval, resetTimeInterval } = useCountdownTimer(defaultTimeCountdown)
    const { countries } = useFetchCountriesData()

    const handleGameInfo = () => {
        const gameInfo = getGameInfo("flagMatchGameInfo")
        setGameInfo(gameInfo)
    }

    const handleCurrentCountries = () => {
        startTimeInterval()
        setClickedIndex(null)
        setIsAnswerTrue(null)
        setIsClick(false)
        const shuffled = countries.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);
        const countryInfo = selected.map(country => ({
            name: country.name.common,
            flag: country.flags.png
        }));
        setCurrentCountries(countryInfo)
        setSelectedCountry(countryInfo[Math.floor(Math.random() * 4)])
        setTimeout(() => {
            setIsFlagAnimation(false)
        }, 300);
    }

    const handleAnswer = (countryName: string, index: number) => {
        stopTimeInterval()
        setIsClick(true)
        setClickedIndex(index)

        if (countryName === selectedCountry.name) {
            setIsAnswerTrue(true)
            setScore(n => n + displayTime)
            setTimeout(() => {
                setIsFlagAnimation(true)
            }, 700);
            setTimeout(() => {
                resetTimeInterval()
                handleCurrentCountries()
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
        resetTimeInterval()
        startTimeInterval()
        setScore(0)
        handleCurrentCountries()
        handleGameInfo()
        setIsGameOver(false)
        startTimer()
    }

    useEffect(() => {
        if (time === 10) {
            stopTimer()
            setIsGameOver(true)
        }
    }, [time])

    useEffect(() => {
        handleGameInfo()
    }, [])

    useEffect(() => {
        console.log(countries)
        startTimer()
        handleCurrentCountries()
    }, [countries])

    return (
        <>
            {isGameOver ? (<GameOver
                score={score}
                storageName="flagMatchGameInfo"
                elapsedTime={elapsedTime}
                playAgainFunction={handlePlayAgain}
            />)
                : (<div className="fm-container">
                    <GameTitle
                        title={'flag match'}
                        iconLeft={'fa-regular fa-flag'}
                        iconRight={'fa-regular fa-flag'}
                        score={score}
                        highScore={gameInfo.highScore}
                    />
                    <div className="fm-container-gameArea">
                        <div className="fm-container-gameArea-flags">
                            {currentCountries.map((country: any, index: number) => (
                                <div key={index} >
                                    <button
                                        className={`${isClick ? 'fm-button-clicked' : 'fm-button-default'} ${isFlagAnimation ? 'fm-flag-animation-hidden' : 'fm-flag-animation-appear'}`} disabled={isClick} onClick={() => handleAnswer(country.name, index)}>
                                        <img src={country.flag} alt="flag" />
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
                            <h3>{selectedCountry && selectedCountry.name}</h3>
                            <p>{displayTime}</p>
                        </div>
                    </div>
                </div>)}
        </>
    )
}

export default FlagMatch
