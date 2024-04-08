import axios from "axios"
import { CountryType } from "../../type"
import { useState, useEffect } from "react"
import Country from "./Country"
import Loading from "../../components/utils/Loading"

interface sortingOptions {
    name: string,
    icon: string
}

const Countries = () => {
    const [countries, setCountries] = useState<CountryType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortingValue, setSortingValue] = useState<string>('Default Sorting')
    const [isOpenSorting, setIsOpenSorting] = useState<boolean>(false)

    const sortingOptions: sortingOptions[] = [
        {
            name: 'Default Sorting',
            icon: 'fa-solid fa-sort'
        },
        {
            name: 'A to Z Order',
            icon: 'fa-solid fa-arrow-down-a-z'
        },
        {
            name: 'Z to A Order',
            icon: 'fa-solid fa-arrow-down-z-a'
        },
        {
            name: 'High to Low',
            icon: 'fa-solid fa-person'
        },
        {
            name: 'Low to High',
            icon: 'fa-solid fa-person'
        },
    ]

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

    const handleSearch = (countries: any) => {
        const value = searchValue.toLocaleLowerCase().replace(/\s+/g, '').trim()
        return (
            countries.name.common.toLowerCase().replace(/\s+/g, '').includes(value) ||
            (countries.capital && countries.capital[0].toLowerCase().replace(/\s+/g, '').includes(value))
        )
    }

    useEffect(() => {
        getCountries()
    }, [])

    console.log(sortingValue)

    return (
        <div className="countries">
            <Loading loading={loading}>


                <div className="countries-inputs">

                    {/* searching input */}
                    <div className="countries-inputs-search" >
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input placeholder="search country, capital or region..." type="search"
                            onChange={(e) => {
                                setSearchValue(e.target.value)
                                setIsOpenSorting(false)
                            }}
                        />
                    </div>

                    {/*sorting input */}
                    <div onClick={() => setIsOpenSorting(!isOpenSorting)} className="countries-inputs-sorting">
                        <div className="countries-inputs-sorting-current">
                            <i className="fa-solid fa-sort"></i>
                            <span>{sortingValue}</span>
                        </div>
                        {isOpenSorting ?
                            <ul className="countries-inputs-sorting-hidden">
                                {sortingOptions.map((sorting) => (
                                    <li
                                        onClick={() => setSortingValue(sorting.name)}>
                                        <i className={sorting.icon}></i>
                                        <span> {sorting.name}</span>
                                    </li>
                                ))}
                            </ul> : null}
                    </div>
                </div>

                {/*shown countries */}
                <div className="countries-list">
                    {countries
                        .slice()
                        .sort((a, b) => {
                            switch (sortingValue) {
                                case 'A to Z Order':
                                    return a.name.common.localeCompare(b.name.common)
                                case 'Z to A Order':
                                    return b.name.common.localeCompare(a.name.common)
                                case 'High to Low':
                                    return b.population - a.population;
                                case 'Low to High':
                                    return a.population - b.population;
                                default:
                                    return 0;
                            }
                        })
                        .filter(handleSearch)
                        .map((country, index) => {
                            return (
                                <Country index={index} key={country.name.common} country={country} />
                            )
                        })}
                </div>

            </Loading>
        </div>
    )
}

export default Countries
