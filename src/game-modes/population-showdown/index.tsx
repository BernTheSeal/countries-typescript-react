import { useEffect, useState } from "react"
import { clearInterval, setInterval, setTimeout } from 'worker-timers';
import 'animate.css'

//*components
import GameOver from "../shared-components/GameOver";
import GameTitle from "../shared-components/GameTitle";

//*hooks
import useGetGameInfo from "../../hooks/use-getGameInfo";
import useGameTimer from "../../hooks/use-gameTimer";
import useCountdownTimer from "../../hooks/use-countdownTimer";
import useFetchCountriesData from "../../hooks/use-fetchCountriesData";

const PopulationShowdown = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [hasSwitchAnimation, setHasSwitchAnimation] = useState<boolean>(false);
    const [isClick, setIsClick] = useState<boolean>(false)
    const [isVisibleCircle, setIsVisibleCircle] = useState<boolean>(true)
    const [isAnswerTrue, setIsAnswerTrue] = useState<any>(true)
    const [positionCircle, setPositionCircle] = useState<string>('100px')
    const [populationValue, setPopulationValue] = useState<any>(0)
    const [degValue, setDegValue] = useState<number>(0)
    const [degValueInterval, setDegValueInterval] = useState<any>(null)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const { startTimer, stopTimer, elapsedTime } = useGameTimer()
    const defaultTimeCountdown = 10;
    const { displayTime, time, startTimeInterval, stopTimeInterval, resetTimeInterval } = useCountdownTimer(defaultTimeCountdown)
    const { gameInfo, gameInfotTrigger } = useGetGameInfo("populationShowdownGameInfo")
    const { countries, countriesFetchTrigger } = useFetchCountriesData({
        sortingType: "shuffled",
    })

    const handleAnswer = (answer: string) => {
        const isHigher: boolean = (answer == "higher" && countries[currentIndex].population < countries[currentIndex + 1].population)
        const isLower: boolean = (answer == "lower" && countries[currentIndex].population > countries[currentIndex + 1].population)
        handleCountAnimation()
        setIsClick(true)
        clearInterval(degValueInterval)
        stopTimeInterval()

        if (isHigher || isLower) {
            setIsAnswerTrue(true)
            setTimeout(() => {
                setPositionCircle('0')
            }, 1400);
            setTimeout(() => {
                setIsVisibleCircle(false)
            }, 2200);
            setTimeout(() => {
                setHasSwitchAnimation(true)
                setScore(n => n + displayTime)
            }, 2500);
            setTimeout(() => {
                resetTimeInterval()
                handleNextCountry()
            }, 2950);
        } else {
            setIsAnswerTrue(false)
            setTimeout(() => {
                setPositionCircle('0')
            }, 1400);
            setTimeout(() => {
                resetTimeInterval()
                stopTimer()
                setIsGameOver(!isGameOver)
            }, 2300);
        }
    }

    const handleNextCountry = () => {
        startTimeInterval()
        startDegValueInterval()
        setPositionCircle('100px')
        setIsClick(false)
        setHasSwitchAnimation(false)
        setIsVisibleCircle(true)

        if (countries.length - (currentIndex + 2) < 2) {
            countriesFetchTrigger()
            setCurrentIndex(0)
            return;

        } else {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const startDegValueInterval = () => {
        setDegValue(0)
        if (degValueInterval) {
            clearInterval(degValueInterval)
        }

        const totalTime = defaultTimeCountdown
        const updateInterval = 100
        const totalDegValue = 360
        const totalUpdates = (totalTime * 1000) / updateInterval
        let elapsedUpdates = 0
        let currentDegValue = 0

        const progress = setInterval(() => {
            elapsedUpdates++
            currentDegValue = (totalDegValue * elapsedUpdates) / totalUpdates
            setDegValue(currentDegValue)

            if (currentDegValue >= totalDegValue) {
                clearInterval(progress)
                setDegValue(totalDegValue)
            }
        }, updateInterval)

        setDegValueInterval(progress)
    }

    const handleCountAnimation = () => {
        setPopulationValue(0)
        let currentValue = 0
        let targetValue = countries[currentIndex + 1].population
        const animationDuration = 1000
        const incrementAmount = targetValue / (animationDuration / 10)
        const animationInterval = setInterval(() => {
            currentValue += incrementAmount;
            if (currentValue >= targetValue) {
                setPopulationValue(targetValue.toLocaleString())
                clearInterval(animationInterval)
            } else {
                setPopulationValue(Math.floor(currentValue).toLocaleString())
            }
        }, 10);
    }

    const handlePlayAgain = () => {
        resetTimeInterval()
        startTimeInterval()
        setPositionCircle('100px')
        countriesFetchTrigger()
        gameInfotTrigger()
        setScore(0)
        setCurrentIndex(0)
        setIsClick(false)
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
        startTimeInterval()
        startDegValueInterval()
    }, [countries])

    useEffect(() => {
        startTimer()
    }, [])

    return (
        <>
            {isGameOver ? (<GameOver
                score={score}
                storageName="populationShowdownGameInfo"
                playAgain={handlePlayAgain}
                elapsedTime={elapsedTime}
            />)
                : (<div className="ps-container">
                    {countries.length > 0 && (
                        <div className="ps-container-game">
                            {gameInfo && (
                                <GameTitle
                                title={'population showdown'}
                                iconLeft={'fa-solid fa-caret-up'}
                                iconRight={'fa-solid fa-caret-down'}
                                score={score}
                                highScore={gameInfo.highScore}
                            />
                            )}
                            <div
                                style={{
                                    background: `conic-gradient(transparent ${degValue}deg, ${isVisibleCircle ? 'white' : 'transparent'} 0deg)`,
                                }}
                                className={`ps-container-game-circle  ${isClick ? 'circle-time-animation' : ''}`}>
                                <div
                                    className={`ps-container-game-circle-time animate__animated   ${!isVisibleCircle ? 'circle-animation' : ''} `}>
                                    {displayTime}
                                    {
                                        isAnswerTrue ? (
                                            <div className={`ps-container-game-circle-time-answer`} style={{ top: positionCircle, backgroundColor: '#248939' }}  >
                                                <i className="fa-solid fa-check"></i>
                                            </div>)
                                            : (
                                                <div className={`ps-container-game-circle-time-answer`} style={{ top: positionCircle, backgroundColor: '#b03535' }}  >
                                                    <i className="fa-solid fa-xmark"></i>
                                                </div>
                                            )
                                    }
                                </div>
                            </div>
                            <div className={`ps-container-game-card first-div ${hasSwitchAnimation ? 'firts-div-animation' : ''} `}>
                                <div className="ps-container-game-card-info" >
                                    <div className="ps-container-game-card-info-firts-div">
                                        <img src={countries[currentIndex].flags.png} alt="" />
                                        <h3>{countries[currentIndex].name.common}</h3>
                                    </div>
                                    <div>
                                        <p> has</p>
                                        <h4>{countries[currentIndex].population.toLocaleString()}</h4>
                                        <p>population</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`ps-container-game-card second-div ${hasSwitchAnimation ? 'second-div-animation' : ''} `}>
                                <div className="ps-container-game-card-info" >
                                    <div className="ps-container-game-card-info-firts-div">
                                        <img src={countries[currentIndex + 1].flags.png} alt="" />
                                        <h3>{countries[currentIndex + 1].name.common}</h3>
                                    </div>
                                    <div>
                                        <p> has</p>
                                        {!isClick ? <div className="ps-container-game-card-info-buttons">
                                            <button onClick={() => handleAnswer('higher')}>
                                                <span>Higher</span>
                                                <i className="fa-solid fa-caret-up"></i>
                                            </button>
                                            <button onClick={() => handleAnswer('lower')}>
                                                <span>Lower</span>
                                                <i className="fa-solid fa-caret-down"></i>
                                            </button>
                                        </div> : <h4>{populationValue}</h4>}
                                        <p>population {!isClick ? `than ${countries[currentIndex].name.common}` : ''}</p>
                                    </div>
                                </div>
                            </div>
                                <div className={`ps-container-game-card third-div ${hasSwitchAnimation ? 'third-div-animation' : ''}`}>
                                <div className="ps-container-game-card-info" >
                                    <img src={countries[currentIndex + 2].flags.png} alt="" />
                                    <div>
                                        <h3>{countries[currentIndex + 2].name.common}</h3>
                                        <p>{countries[currentIndex + 2].population.toLocaleString()}</p>
                                    </div>
                                </div>
                                </div>
                        </div>
                    )}
                </div >)}
        </>
    )
}

export default PopulationShowdown