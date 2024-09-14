import { useEffect, useState } from "react"
import axios from "axios"
import { CountryType } from "../../types/countryType"
import { clearInterval, setInterval, setTimeout } from 'worker-timers';
import 'animate.css'

//*components
import GameOver from "../shared-components/GameOver";
import GameTitle from "../shared-components/GameTitle";

//*hooks
import useGetGameInfo from "../../hooks/use-getGameInfo";
import useGameTimer from "../../hooks/use-gameTimer";
import useCountdownTimer from "../../hooks/use-countdownTimer";

const PopulationShowdown = () => {
    const [countries, setCountries] = useState<CountryType[]>([])
    const [currentCountries, setCurrentCountries] = useState<CountryType[]>([])
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
    const { gameInfo, getGameInfo } = useGetGameInfo("populationShowdownGameInfo")
    const { startTimer, stopTimer, elapsedTime } = useGameTimer()
    const defaultTimeCountdown = 10;
    const { displayTime, time, startTimeInterval, stopTimeInterval, resetTimeInterval } = useCountdownTimer(defaultTimeCountdown)

    const getCountry = async () => {
        try {
            const { data } = await axios.get<CountryType[]>(`https://restcountries.com/v3.1/all`)
            const filteredData = data.filter((country: any) => country.population > 1)
            setCountries(filteredData)
        } catch {
            console.log('error')
        }
    }


    const handlePlayGame = () => {
        if (countries.length > 0) {
            const threeCountries: any = []
            while (threeCountries.length < 3) {
                const randomIndex = Math.floor(Math.random() * countries.length)
                if (!threeCountries.includes(countries[randomIndex])) {
                    threeCountries.push(countries[randomIndex])
                }
            }
            setCurrentCountries(threeCountries)
        }
        startTimeInterval()
        startDegValueInterval()
    }

    const handleAnswer = (answer: string) => {
        const isHigher: boolean = (answer == "higher" && currentCountries[0].population < currentCountries[1].population)
        const isLower: boolean = (answer == "lower" && currentCountries[0].population > currentCountries[1].population)
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
        const newCurrentCountries: any = currentCountries.slice(1, 3)
        while (newCurrentCountries.length < 3) {
            const randomIndex = Math.floor(Math.random() * countries.length)
            if (!currentCountries.includes(countries[randomIndex])) {
                newCurrentCountries.push(countries[randomIndex])
            }
        }
        setCurrentCountries(newCurrentCountries)
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
        let targetValue = currentCountries[1].population
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
        getGameInfo()
        setScore(0)
        handlePlayGame()
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
        handlePlayGame()
    }, [countries])

    useEffect(() => {
        getCountry()
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
                    {currentCountries.length > 0 && (
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
                                        <img src={currentCountries[0].flags.png} alt="" />
                                        <h3>{currentCountries[0].name.common}</h3>
                                    </div>
                                    <div>
                                        <p> has</p>
                                        <h4>{currentCountries[0].population.toLocaleString()}</h4>
                                        <p>population</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`ps-container-game-card second-div ${hasSwitchAnimation ? 'second-div-animation' : ''} `}>
                                <div className="ps-container-game-card-info" >
                                    <div className="ps-container-game-card-info-firts-div">
                                        <img src={currentCountries[1].flags.png} alt="" />
                                        <h3>{currentCountries[1].name.common}</h3>
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
                                        <p>population {!isClick ? `than ${currentCountries[0].name.common}` : ''}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`ps-container-game-card third-div ${hasSwitchAnimation ? 'third-div-animation' : ''}`}>
                                <div className="ps-container-game-card-info" >
                                    <img src={currentCountries[2].flags.png} alt="" />
                                    <div>
                                        <h3>{currentCountries[2].name.common}</h3>
                                        <p>{currentCountries[2].population.toLocaleString()}</p>
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