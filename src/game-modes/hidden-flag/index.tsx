import axios from "axios"
import { CountryType } from "../../types/countryType"
import { useEffect, useState } from "react"
import { AiOutlineEnter } from "react-icons/ai";
import GameOver from "../shared-components/GameOver";
import StatusBar from "./StatusBar";
import GameInfo from "./GameInfo";
import GameTitle from "../shared-components/GameTitle";
import ScoreInfoBar from "./ScoreInfoBar";

import useGetGameInfo from "../../hooks/use-getGameInfo";

interface shuffledCountriesType {
    name: string,
    flag: string
}

const HiddenFlag = () => {
    const [countries, setCountries] = useState<CountryType[]>([])
    const [shuffledCountries, setShuffledCountries] = useState<shuffledCountriesType[]>()
    const [shuffledCountriesIndex, setShuffledCountriesIndex] = useState<number>(0)
    const [gameInfo, setGameInfo] = useState<any>('')
    const [score, setScore] = useState<number>(0)
    const [currentScore, setCurrentScore] = useState<number>(10)
    const [skipCount, setSkipCount] = useState<number>(10)
    const [energyCount, setEnergyCount] = useState<number>(3)
    const [revealLimit, setRevealLimit] = useState<number>(20);
    const [inputValue, setInputValue] = useState<string>('')
    const [hiddenArray, setHiddenArray] = useState<string[]>(['0', '1', '2', '3', '4', '5', '6', '7', '8'])
    const [isFlagAnimating, setIsFlagAnimating] = useState<boolean>(false)
    const [searchCountries, setSearchCountries] = useState<CountryType[]>([])
    const [isAnswered, setIsAnswered] = useState<boolean>(false)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
    const [onHover, setOnHover] = useState<number | null>(null)
    const { getGameInfo } = useGetGameInfo()


    const getCountry = async () => {
        try {
            const { data } = await axios.get<CountryType[]>('https://restcountries.com/v3.1/all')
            const filteredData = data.filter((country: CountryType) => country.population > 3000)
            setCountries(filteredData)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGameInfo = () => {
        const gameInfo = getGameInfo('hiddenFlagGameInfo')
        setGameInfo(gameInfo)
    }

    const handleShuffleCountries = (countries: CountryType[]): void => {
        if (countries.length === 0) {
            return;
        }
        const countriesForShuffle: shuffledCountriesType[] = countries.map(country => ({
            name: country.name.common,
            flag: country.flags.png
        }));
        for (let i = countriesForShuffle.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [countriesForShuffle[i], countriesForShuffle[j]] = [countriesForShuffle[j], countriesForShuffle[i]]
        }
        setShuffledCountries(countriesForShuffle)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchCountries.length > 0) {
            handleAnswer(searchCountries[0].name.common)
        }
    }

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault()
    }

    const handleinputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value)
    }

    const normalizeString = (str: string): string => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '').trim()
    }

    const handleNextFlag = (isSkip?: boolean): void => {
        setInputValue('')
        setIsAnswerCorrect(null)
        const initialHiddenArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8']
        if (isSkip) {
            if (skipCount > 0) {
                setSkipCount((prev) => prev - 1)
                setCurrentScore(initialHiddenArray.length + 1)
            } else {
                return;
            }
        } else {
            setCurrentScore(initialHiddenArray.length + 1)
        }
        setIsFlagAnimating(true)
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * initialHiddenArray.length)
            const updatedArray = initialHiddenArray.filter((index) => index !== initialHiddenArray[randomIndex])
            setHiddenArray(updatedArray);
            setTimeout(() => {
                if (shuffledCountries && shuffledCountries.length - 1 == shuffledCountriesIndex) {
                    handleShuffleCountries(countries)
                    setShuffledCountriesIndex(-1)
                }
                setShuffledCountriesIndex(prev => prev + 1)
                setIsFlagAnimating(false)
            }, 200);
        }, 200);
        setIsAnswered(false)
    }

    const handleDeleteABox = (selectedBox?: string): void => {
        let updatedArray: string[] = []
        if (selectedBox) {
            if (revealLimit > 0) {
                updatedArray = hiddenArray.filter((index) => index !== selectedBox)
                setRevealLimit(prev => prev - 1)

            } else {
                return;
            }
        } else {
            const randomIndex = Math.floor(Math.random() * hiddenArray.length)
            updatedArray = hiddenArray.filter((index) => index !== hiddenArray[randomIndex])
        }
        setHiddenArray(updatedArray)
        setCurrentScore(updatedArray.length + 2)
    }

    const handleAnswer = (answer: string): void => {
        if (inputValue !== "") {
            setInputValue('')
            setIsAnswered(true)
            setHiddenArray([])
            if (shuffledCountries && shuffledCountries[shuffledCountriesIndex].name == answer) {
                setIsAnswerCorrect(true)
                setScore(prev => {
                    if (currentScore === 10) {
                        return prev + (currentScore * 2)
                    } else {
                        return prev + currentScore
                    }
                })
                setTimeout(() => {
                    handleNextFlag()
                }, 2000);
            } else {
                setIsAnswerCorrect(false)
                setEnergyCount((prev) => prev - 1)
                if (energyCount > 1) {
                    setScore((prev: number) => {
                        if (currentScore === 10) {
                            if (score - ((currentScore * 2) - 5) > 0) {
                                return prev - ((currentScore * 2) - 5)
                            } else {
                                return 0
                            }
                        } else {
                            if (score - ((currentScore * 2) - 5) > 0) {
                                return prev - (currentScore - 2)
                            } else {
                                return 0
                            }
                        }
                    })
                    setTimeout(() => {
                        handleNextFlag(false)
                    }, 2000);
                } else {
                    setTimeout(() => {
                        setIsGameOver(true)
                    }, 1200);
                }
            }
        }
    }

    const handleSearchCountry = (countries: any): void => {
        const updatedValue = normalizeString(inputValue)
        if (updatedValue.length > 0) {
            const result = [...countries]
                .filter((country: CountryType) => normalizeString(country.name.common).startsWith(updatedValue.slice(0, updatedValue.length)))
                .slice(0, 3)
            if (result.length > 0) {
                setSearchCountries(result)
                return;
            }
        }
        if (updatedValue.length > 0) {
            const result = [...countries]
                .filter((country: CountryType) => normalizeString(country.name.common).includes(updatedValue))
                .slice(0, 3)
            setSearchCountries(result)
        }
    }

    const handlePlayAgain = () => {
        handleGameInfo()
        handleShuffleCountries(countries)
        handleNextFlag(false)
        setSkipCount(10)
        setEnergyCount(3)
        setRevealLimit(20)
        setScore(0)
        setIsAnswered(false)
        setIsGameOver(false)
    }

    useEffect(() => {
        handleSearchCountry(countries)
    }, [inputValue])

    useEffect(() => {
        handleShuffleCountries(countries)
    }, [countries])

    useEffect(() => {
        handleGameInfo()
        getCountry()
        handleDeleteABox()
    }, [])

    return (
        <>
            {isGameOver ? (<GameOver
                score={score}
                storageName="hiddenFlagGameInfo"
                playAgainFunction={handlePlayAgain}
            />)
                : (
                    <div className="hf-container">
                        <div className="hf-container-game">
                            <GameTitle
                                title={'hidden flag'}
                                iconLeft={'fa-solid fa-flag'}
                                iconRight={'fa-regular fa-flag'}
                                score={score}
                                highScore={gameInfo.highScore}
                            />
                            <div className="hf-container-game-content">
                                <div onContextMenu={handleContextMenu} className="hf-container-game-content-header">
                                    <div style={{ scale: isFlagAnimating ? '0' : '1' }} className="hf-container-game-content-header-flag">
                                        <div className="hf-container-game-content-header-flag-hidden">
                                            {Array.from({ length: 9 }).map((_, index) => {
                                                const activeBox = hiddenArray.includes(String(index));
                                                return (
                                                    <div
                                                        onMouseEnter={() => setOnHover(index)}
                                                        onMouseLeave={() => setOnHover(null)}
                                                        onClick={() => activeBox && handleDeleteABox(String(index))}
                                                        key={index}
                                                        style={{
                                                            backgroundColor: activeBox ? "#333" : '',
                                                            cursor: (revealLimit > 0 && activeBox) ? "pointer" : ''
                                                        }}
                                                        className={`hf-container-game-content-header-flag-hidden-box`}>
                                                        {onHover === index && (
                                                            <i
                                                                style={{
                                                                    visibility: hiddenArray.includes(String(index)) ? "visible" : "hidden",
                                                                    color: revealLimit > 0 ? "#fff989" : "#525252"
                                                                }}
                                                                className={`fa-solid fa-xmark ${revealLimit > 0 ? "hf-game-hoverI" : ""} `}>
                                                            </i>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <img src={shuffledCountries && shuffledCountries[shuffledCountriesIndex].flag} alt="current flag" />
                                    </div>
                                    <div className="hf-container-game-content-header-buttons">
                                        <button
                                            disabled={isAnswered}
                                            onClick={() => handleDeleteABox()}
                                            className={`${hiddenArray.length > 0 ? 'hf-game-button-active' : 'hf-game-button-inactive'}`}  >
                                            <i className="fa-solid fa-expand"></i>
                                        </button>
                                        <button
                                            disabled={isAnswered}
                                            onClick={() => handleNextFlag(true)}
                                            className={`${skipCount > 0 ? 'hf-game-button-active' : 'hf-game-button-inactive'}`}  >
                                            <i className="fa-solid fa-forward"></i>
                                        </button>
                                    </div>
                                    <div className="hf-container-game-content-header-player-info">
                                    </div>
                                    <GameInfo positionFrom="right" distanceInPx={400}>
                                        <StatusBar name={'energy'} count={energyCount} maxValue={3} color="#cd3737" icon="fa-solid fa-heart" />
                                        <StatusBar name={'skip'} count={skipCount} maxValue={10} color=" #37c3cd" icon="fa-solid fa-play" />
                                        <StatusBar name={'reveal'} count={revealLimit} maxValue={20} color=" #37cd57" icon="fa-solid fa-square-xmark" />
                                    </GameInfo >
                                    <GameInfo positionFrom="left" distanceInPx={400}>
                                        <ScoreInfoBar currentScore={currentScore} />
                                    </GameInfo >

                                </div>
                                <div className="hf-container-game-content-footer">
                                    <div className={`${inputValue.length > 0 ? 'hf-game-search-active' : 'hf-game-search-inactive'}  hf-container-game-content-footer-search`}>
                                        {searchCountries.length > 0 ? searchCountries.map((country: CountryType, index: number) => (
                                            <div onClick={() => handleAnswer(country.name.common)} className="hf-container-game-content-footer-search-countryBox" key={index}>
                                                <div className="hf-container-game-content-footer-search-countryBox-name"> {country.name.common}</div>
                                                {index === 0 && (
                                                    <div className="hf-container-game-content-footer-search-countryBox-enter">
                                                        <span> <AiOutlineEnter className="hf-container-game-content-footer-search-countryBox-enter-icon" /></span>
                                                        <span >enter</span>
                                                    </div>
                                                )}
                                            </div>
                                        )) : (
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
                                                handleinputValue(e)
                                            }}
                                            type="text" placeholder="type country name..." />
                                        <i className="fa-solid fa-arrow-right"></i>
                                        {isAnswered && (
                                            <div className={`${isAnswerCorrect ? 'hf-game-correct-answer' : 'hf-game-wrong-answer'} hf-container-game-content-footer-input-answer`}>
                                                <p>{isAnswerCorrect ? 'correct answer' : 'wrong answer'}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                )}
        </>
    )
}

export default HiddenFlag
