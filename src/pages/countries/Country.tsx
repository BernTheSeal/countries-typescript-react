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
        <p>
            {props.index + 1} - <div onClick={() => {
                navigate(COUNTRY_NAME_URL)
            }}>{country.name.common}</div>
        </p>

    )
}

export default country
