import { FunctionComponent } from "react"
import { CountryType } from "../../type"
import { NavigateFunction } from "react-router-dom"
import { useNavigate } from "react-router-dom"

interface iCountryProps {
    country: CountryType,
    index: number
}

const country: FunctionComponent<iCountryProps> = (props) => {
    const navigate: NavigateFunction = useNavigate()
    const { country } = props
    return (
        <div className="country-card" onClick={() => navigate(country.name.common)}>
            <header className="country-card-header">
                <img src={country.flags.png} alt="" />
            </header>
            <main className="country-card-main">
                <h1>{country.name.common} </h1>
                <h2>Capital: {country.capital}</h2>
                <h2>Population: {country.population.toLocaleString()}</h2>
                <h2>Region: {country.region}</h2>
            </main>
        </div>
    )
}

export default country
