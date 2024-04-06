import axios from "axios"
import { CountryType } from "../../type"
import { useState, useEffect } from "react"
import Country from "./Country"
import Loading from "../../components/utils/Loading"

const Countries = () => {
    const [countries, setCountries] = useState<CountryType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const getCountries = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get<CountryType[]>('https://restcountries.com/v3.1/all')
            setCountries(data)
        } catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <div>
            <Loading loading={loading}>
                {countries.map((country, index) => {
                    return (
                        <Country index={index} key={country.name.common} country={country} />
                    )
                })}
            </Loading>
        </div>
    )
}

export default Countries
