import axios from "axios"
import { CountryType } from "../../types/countryType"
import { useEffect, useState, useRef } from "react"
import GameOver from "../shared-components/GameOver";
import { clearInterval, setInterval, setTimeout } from 'worker-timers';
import GameTitle from "../shared-components/GameTitle";

const FlagMatch = () => {
    const [countries, setCountries] = useState<CountryType[]>([])
    const [gameInfo, setGameInfo] = useState<any>('')
    const [currentCountries, setCurrentCountries] = useState<any>([])
    const [selectedCountry, setSelectedCountry] = useState<any>([])
    const [score, setScore] = useState<number>(0)
    const [time, setTime] = useState<number>(11)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [isClick, setIsClick] = useState<boolean>(false)
    const [isAnswerTrue, setIsAnswerTrue] = useState<boolean | null>(null);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null)
    const [isFlagAnimation, setIsFlagAnimation] = useState<boolean>(false)
    const intervalId = useRef<any>(null)

    const getCountry = async () => {
        try {
            const { data } = await axios.get<CountryType[]>('https://restcountries.com/v3.1/all')
            const filteredData = data.filter((country: any) => country.population > 3000)
            setCountries(filteredData)
        } catch (error) {
            console.log(error)
        }
    }

    const getPlayerInfo = () => {
        const gameInfo = JSON.parse(localStorage.getItem("flagMatchGameInfo") || '{"highScore": 0, "playedTime": 0, "totalScore": 0}')
        setGameInfo(gameInfo)
    }

    const handleCurrentCountries = () => {
        setClickedIndex(null)
        setIsAnswerTrue(null)
        setIsClick(false)
        setTime(10)
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
            startTimeInterval()
        }, 300);
    }

    const handleAnswer = (countryName: string, index: number) => {
        setIsClick(true)
        setClickedIndex(index)
        clearInterval(intervalId.current)
        if (countryName === selectedCountry.name) {
            setIsAnswerTrue(true)
            setScore(n => n + time)
            setTimeout(() => {
                setIsFlagAnimation(true)
            }, 700);
            setTimeout(() => {
                handleCurrentCountries()
            }, 1000);
        } else {
            setIsAnswerTrue(false)
            setTimeout(() => {
                setIsGameOver(true)
            }, 1000);
        }
    }

    const handlePlayAgain = () => {
        setTime(10)
        startTimeInterval()
        setIsGameOver(false)
        setScore(0)
        handleCurrentCountries()
        getPlayerInfo()
    }

    const startTimeInterval = () => {
        if (intervalId.current) {
            clearInterval(intervalId.current)
        }
        intervalId.current = setInterval(() => {
            setTime(prev => {
                if (prev !== 0) {
                    return prev - 1
                } else {
                    clearInterval(intervalId.current)
                    return 0;
                }
            })
        }, 1000)
    }

    useEffect(() => {
        getCountry()
        getPlayerInfo()
    }, [])

    useEffect(() => {
        handleCurrentCountries()
    }, [countries])

    return (
        <>
            {isGameOver || time === 0 ? (<GameOver
                score={score}
                storageName="flagMatchGameInfo"
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
                            <p>{time}</p>
                        </div>
                    </div>
                </div>)}
        </>
    )
}

export default FlagMatch
