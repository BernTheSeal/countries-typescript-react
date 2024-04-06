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
    const COUNTRY_NAME_URL: string = country.name.common.replace(/ /g, "-")
    return (
        <div className="country-card" onClick={() => navigate(COUNTRY_NAME_URL)}>
            <header>

            </header>
            <main>
                <h1>{country.name.common} </h1>
            </main>

        </div>


    )
}

export default country
