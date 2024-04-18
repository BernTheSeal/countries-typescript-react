import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CountryType } from "../../type"
import axios from "axios"
import Loading from "../../components/utils/Loading"
import Header from "../../components/utils/Header"

const Details = () => {
    const params = useParams<{ name: string }>()
    const { name } = params
    const [currentCountry, setCurrentCountry] = useState<CountryType[] | any>()
    const [loading, setLoading] = useState<boolean>(false)
    const [languages, setLanguages] = useState<string[] | any>([])
    const [rank, setRank] = useState<number | string>('')

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


    return (
        <Loading loading={loading}>
            {currentCountry && currentCountry.length > 0 && (
                <>
                    <Header onPage="countries" />
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
                            <ul>
                                {languages.map((language: string, i: number) => (
                                    <li>
                                        <span>{i + 1}</span>
                                        <span>{language}</span>
                                    </li>)
                                )}
                            </ul>
                        </div>
                        <div className="details-page-population">
                            <div className="details-page-population-value">
                                <div className="details-page-population-value-title">
                                    <i className="fa-solid fa-person"></i>
                                    <h4>Population</h4>
                                </div>
                                <div className="details-page-population-value-description">
                                    {currentCountry[0].population.toLocaleString()}
                                </div>
                            </div>
                            <div className="details-page-population-rank">
                                <div className="details-page-population-rank-title">
                                    <i className="fa-solid fa-crown"></i>
                                    <h4>Rank</h4>
                                </div>
                                <div className="details-page-population-rank-description">
                                    {rank}
                                </div>
                            </div>
                        </div>
                        <div className="details-page-regions">
                            <div className="details-page-regions-region">
                                <div className="details-page-regions-region-title">
                                    <i className="fa-solid fa-globe"></i>
                                    <h4>Region</h4>
                                </div>
                                <div className="details-page-regions-region-description">
                                    {currentCountry[0].region}
                                </div>
                            </div>
                            <div className="details-page-regions-subregion">
                                <div className="details-page-regions-subregion-title">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <h4>Subregion</h4>
                                </div>
                                <div className="details-page-regions-subregion-description">
                                    {currentCountry[0].subregion}
                                </div>
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
                        <div>

                        </div>
                    </div>
                </>

            )
            }
        </Loading >
    )
}

export default Details
