import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CountryType } from "../../type"
import axios from "axios"
import Loading from "../../components/utils/Loading"
import Header from "../../components/utils/Header"

type DayOfWeek = {
    name: string;
    abbreviation: string;
};

const Details = () => {
    const params = useParams<{ name: string }>()
    const { name } = params
    const [currentCountry, setCurrentCountry] = useState<CountryType[] | any>()
    const [loading, setLoading] = useState<boolean>(false)
    const [languages, setLanguages] = useState<string[] | any>([])
    const [currencies, setCurrencies] = useState<string[] | any>([])
    const [rank, setRank] = useState<number | string>('')
    const [borders, setBorders] = useState<string[] | any>([])

    const daysOfWeek: DayOfWeek[] = [
        { name: "Sunday", abbreviation: "Sun" },
        { name: "Monday", abbreviation: "Mon" },
        { name: "Tuesday", abbreviation: "Tue" },
        { name: "Wednesday", abbreviation: "Wed" },
        { name: "Thursday", abbreviation: "Thu" },
        { name: "Friday", abbreviation: "Fri" },
        { name: "Saturday", abbreviation: "Sat" }
    ];

    //* get current country
    useEffect(() => {
        const getCountry = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get<CountryType[]>(`https://restcountries.com/v3.1/all`)
                const currentCountry = data.find((country) => {
                    return country.name.common === name
                })
                setCurrentCountry([currentCountry])
            } catch {
                console.log('error')
            } finally {
                setLoading(false)
            }
        }
        getCountry()
    }, [])

    //* get languages
    useEffect(() => {
        if (currentCountry && currentCountry.length > 0) {
            const languages = currentCountry[0].languages
            const languagesArray = Object.values(languages)
            setLanguages(languagesArray)
        }
    }, [currentCountry])

    //*get rank
    useEffect(() => {
        if (currentCountry && currentCountry.length > 0) {
            const getCountry = async () => {
                try {
                    const { data } = await axios.get<CountryType[]>('https://restcountries.com/v3.1/all');
                    data.sort((a, b) => b.population - a.population).find((country, index) => {
                        if (country.name.common === currentCountry[0].name.common) {
                            setRank(index + 1)
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            getCountry()
        }
    }, [currentCountry])

    //*get currencies
    useEffect(() => {
        if (currentCountry && currentCountry.length > 0 && currentCountry[0].currencies) {
            const currencies = currentCountry[0].currencies
            const currenciesArray = Object.values(currencies)
            setCurrencies(currenciesArray)
        } else {
            setCurrencies([{ name: '-', symbol: '-' }])
        }
    }, [currentCountry])

    //*get borders
    useEffect(() => {
        if (currentCountry && currentCountry.length > 0) {
            const getCountry = async () => {
                try {
                    const { data } = await axios.get<CountryType[]>('https://restcountries.com/v3.1/all');
                    const borders = data.filter((country) => currentCountry[0].borders.includes(country.cca3))
                    setBorders(borders)
                } catch (error) {
                    console.log(error)
                }
            }
            getCountry()
        }

    }, [currentCountry])

    return (
        <>
            <Header onPage="countries" />
            <Loading loading={loading}>
                {currentCountry && currentCountry.length > 0 && (

                    <div className="details-page">
                        <div className="details-page-name">
                            <h2>{currentCountry[0].name.common}</h2>
                            <h3>{currentCountry[0].capital}</h3>
                        </div>
                        <div className="details-page-flag">
                            <img src={currentCountry[0].flags.png} alt="flag" />
                        </div>
                        <div className="details-page-languages">
                            <div>
                                <i className="fa-solid fa-message"></i>
                                <h4>Languages</h4>
                            </div>
                            <ol>
                                {languages.map((language: string) => (
                                    <li >
                                        <span>{language}</span>
                                    </li>)
                                )}
                            </ol>
                        </div>
                        <div className="details-page-population">
                            <div className="details-page-population-value">
                                <div className="details-page-population-value-title">
                                    <i className="fa-solid fa-person"></i>
                                    <h4>Population</h4>
                                </div>
                                <p className="details-page-population-value-description">
                                    {currentCountry[0].population.toLocaleString()}
                                </p>
                            </div>
                            <div className="details-page-population-rank">
                                <div className="details-page-population-rank-title">
                                    <i className="fa-solid fa-crown"></i>
                                    <h4>Rank</h4>
                                </div>
                                <p className="details-page-population-rank-description">
                                    {rank}
                                </p>
                            </div>
                        </div>
                        <div className="details-page-regions">
                            <div className="details-page-regions-region">
                                <div className="details-page-regions-region-title">
                                    <i className="fa-solid fa-globe"></i>
                                    <h4>Region</h4>
                                </div>
                                <p className="details-page-regions-region-description">
                                    {currentCountry[0].region}
                                </p>
                            </div>
                            <div className="details-page-regions-subregion">
                                <div className="details-page-regions-subregion-title">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <h4>Subregion</h4>
                                </div>
                                <p className="details-page-regions-subregion-description">
                                    {currentCountry[0].subregion}
                                </p>
                            </div>

                        </div>
                        <div className="details-page-check">
                            <div className="details-page-check-independent">
                                <div className="details-page-check-independent-title">
                                    <i className="fa-solid fa-pencil"></i>
                                    <h4>Independent</h4>
                                </div>
                                <div className="details-page-check-independent-description">
                                    {currentCountry[0].independent
                                        ? <i style={{ color: "green", fontSize: "18px" }} className="fa-solid fa-check">  </i>
                                        : <i style={{ color: "red", fontSize: "18px" }} className="fa-solid fa-xmark"></i>}
                                </div>
                            </div>
                            <div className="details-page-check-UN">
                                <div className="details-page-check-UN-title">
                                    <i className="fa-solid fa-earth-europe"></i>
                                    <h4>United Nations</h4>
                                </div>
                                <div className="details-page-check-independent-description">
                                    {currentCountry[0].unMember
                                        ? <i style={{ color: "green", fontSize: "18px" }} className="fa-solid fa-check">  </i>
                                        : <i style={{ color: "red", fontSize: "18px" }} className="fa-solid fa-xmark"></i>}
                                </div>
                            </div>
                            <div className="details-page-check-sea">
                                <div className="details-page-check-sea-title">
                                    <i className="fa-solid fa-water"></i>
                                    <h4>Sea Access</h4>
                                </div>
                                <div className="details-page-check-independent-description">
                                    {currentCountry[0].landlocked
                                        ? <i style={{ color: "red", fontSize: "18px" }} className="fa-solid fa-xmark">  </i>
                                        : <i style={{ color: "green", fontSize: "18px" }} className="fa-solid fa-check"></i>}
                                </div>
                            </div>
                        </div>
                        <div className="details-page-startofweek">
                            <div className="details-page-startofweek-title">
                                <i className="fa-solid fa-calendar"></i>
                                <h4>
                                    Start Of Week
                                </h4>
                            </div>
                            <div className="details-page-startofweek-description">
                                <ol>
                                    {daysOfWeek.map((day, index) => (
                                        <div className="details-page-startofweek-description-calendar">
                                            <p className="day">
                                                {day.abbreviation}
                                            </p>
                                            <div className="day_decimal" >
                                                <p key={index} className={day.name.toLowerCase() === currentCountry[0].startOfWeek ? 'day-active' : ''}>
                                                    {index + 1}
                                                </p>
                                            </div>
                                        </div>

                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="details-page-currencies">
                            <div className="details-page-currencies-currency">
                                <div className="details-page-currencies-currency-title">
                                    <i className="fa-solid fa-coins"></i>
                                    <h4>Currency</h4>
                                </div>
                                <ol>
                                    {currencies.map((currency: any) => (
                                        <li style={{
                                            listStyleType: "decimal",
                                            marginLeft: "17px"
                                        }}>{currency.name}</li>
                                    ))}
                                </ol>
                            </div>
                            <div className="details-page-currencies-currency">
                                <div className="details-page-currencies-currency-title">
                                    <i className="fa-solid fa-dollar-sign"></i>
                                    <h4>Symbol</h4>
                                </div>
                                <ol>
                                    {currencies.map((currency: any) => (
                                        <li>{currency.symbol}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        {
                            currentCountry[0].coatOfArms.png && (
                                <div className="details-page-coa">
                                    <img src={currentCountry[0].coatOfArms.png} alt="coatofarms" />
                                    <h4>Coat of Arms</h4>
                                </div>
                            )
                        }

                        <div className="details-page-borders">
                            <div className="details-page-borders-title">
                                <i className="fa-solid fa-border-all"></i>
                                <h4>Borders</h4>
                            </div>
                            {

                                <ul className="details-page-borders-description">
                                    {borders.length > 0 ? borders.map((border: any, index: number) => (
                                        <li className="details-page-borders-description-country">
                                            <div>
                                                <img src={border.flags.png} alt="" />
                                                <p> {border.name.common} </p>
                                            </div>
                                            <div className="hidden">
                                                <i className="fa-solid fa-person"></i>
                                                <p>{border.population.toLocaleString()}</p>
                                            </div>
                                            <div className="hidden">
                                                <i className="fa-solid fa-globe"></i>
                                                <p>{border.region}</p> ,
                                                <p>{border.subregion}</p>
                                            </div>
                                        </li>
                                    )) : 'This country has no neighboring nations!'}
                                </ul>

                            }

                        </div>
                    </div>
                )
                }
            </Loading >
        </>

    )
}

export default Details
