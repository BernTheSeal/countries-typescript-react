import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CountryType } from "../../type"
import axios from "axios"
import Loading from "../../components/utils/Loading"

const Details = () => {
    const params = useParams<{ name: string }>()
    const { name } = params
    const [currentCountry, setCurrentCountry] = useState<CountryType[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const getCountry = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get<CountryType[]>(`https://restcountries.com/v3.1/name/${name?.replace(/-/g, "%20")}`)
            setCurrentCountry(data)
        } catch {
            console.log('error')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getCountry()
    }, [])

    console.log(currentCountry)
    return (
        <Loading loading={loading}>
            {currentCountry && currentCountry.length > 0 && (
                <div>
                    <p>country name:  {currentCountry[0].name.common}</p>
                    <p>capital: {currentCountry[0].capital}</p>
                </div>
            )}
        </Loading>
    )
}

export default Details
