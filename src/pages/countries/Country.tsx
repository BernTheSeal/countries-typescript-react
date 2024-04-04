import { FunctionComponent } from "react"
import { CountryType } from "../../type"

interface iCountryProps {
    country: CountryType,
    index: number
}

const country: FunctionComponent<iCountryProps> = (props) => {
    const { country } = props
    return (
        <div>
            {props.index + 1} -{country.name.common}
        </div>
    )
}

export default country
