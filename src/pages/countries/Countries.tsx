import axios from "axios"
import { CountryType } from "../../type"
import { useState, useEffect } from "react"
import Country from "./Country"
import Loading from "../../components/utils/Loading"
import Header from "../../components/utils/Header"


interface sortingOptions {
    name: string,
    icon: string
}

const Countries = () => {
    const [countries, setCountries] = useState<CountryType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')

    const [sortingValue, setSortingValue] = useState<string>('Default Sorting')
    const [regionsArray, setRegionsArray] = useState<string[]>([])

    const [minPopulationValue, setMinPopulationValue] = useState<number>(NaN)
    const [maxPopulationValue, setMaxPopulationValue] = useState<number>(NaN)

    const sortingOptions: sortingOptions[] = [
        { name: 'Default Sorting', icon: 'fa-solid fa-sort' },
        { name: 'A to Z Order', icon: 'fa-solid fa-arrow-down-a-z' },
        { name: 'Z to A Order', icon: 'fa-solid fa-arrow-down-z-a' },
        { name: 'High to Low', icon: 'fa-solid fa-person' },
        { name: 'Low to High', icon: 'fa-solid fa-person' },
    ]

    const getRegions = (): string[] => {
        const uniqueRegions: Set<string> = new Set();
        countries.forEach((country) => {
            if (country.region) {
                uniqueRegions.add(country.region);
            }
        })
        return Array.from(uniqueRegions);
    }
    const regions = getRegions()

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

    const handleRegionFilter = (countries: any) => {
        if (regionsArray.length === 0) {
            return true;
        } else {
            return regionsArray.some((region) => countries.region === region);
        }
    }

    const handleSorting = (a: any, b: any, sortingValue: any) => {
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
    }

    const handlePopulationSorting = (countries: any, maxPopulation: number, minPopulation: number) => {
        if (isNaN(maxPopulation) && isNaN(minPopulation)) {
            return countries;
        }
        else if (isNaN(maxPopulation) && minPopulation > 0) {
            return countries.population > minPopulation
        }
        else if (maxPopulation > 0 && isNaN(minPopulation)) {
            return countries.population < maxPopulation
        }
        else {
            return countries.population >= minPopulation && countries.population <= maxPopulation
        }
    }

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <>
            <Header onPage={'countries'} />
            <div className="countries">
                <Loading loading={loading}>
                    <h2 className="page-title"> Countries </h2>
                    <div className="countries-inputs">
                        {/* searching input */}
                        <div className="countries-inputs-search" >
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input placeholder="search country, capital or region..." type="search"
                                onChange={(e) => {
                                    setSearchValue(e.target.value)
                                }}
                            />
                        </div>

                        {/*sorting input */}
                        <div className="countries-inputs-sorting">
                            <div className="countries-inputs-sorting-current">
                                <i className="fa-solid fa-sort"></i>
                                <span>{sortingValue}</span>
                            </div>
                            <ul className="countries-inputs-sorting-hidden">
                                {sortingOptions.map((sorting) => (
                                    <li
                                        onClick={() => setSortingValue(sorting.name)}>
                                        <i className={sorting.icon}></i>
                                        <span> {sorting.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/*regions sorting input */}
                        <div className="countries-inputs-regions">
                            <div className="countries-inputs-regions-current">
                                <i className="fa-solid fa-earth-americas"></i>
                                <span>Regions</span>
                            </div>
                            <ul className="countries-inputs-regions-hidden">
                                {regions.map((region) => (
                                    <li
                                        key={region}
                                        onClick={() => {
                                            if (!regionsArray.includes(region)) {
                                                setRegionsArray((prev) => [...prev, region])
                                            } else {
                                                const updatedRegions = regionsArray.filter(item => item !== region);
                                                setRegionsArray(updatedRegions);
                                            }
                                        }}>
                                        <span> {region} </span>
                                        {regionsArray.includes(region) ? <i className="fa-solid fa-check"></i> : null}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* population sorting input */}
                        <div className="countries-inputs-population">
                            <div>
                                <i className="fa-solid fa-person"></i>
                                <input type="number" placeholder="Min population" className="countries-inputs-population-left" onChange={(e) => setMinPopulationValue(parseInt(e.target.value))} />
                            </div>
                            <div>
                                <i className="fa-solid fa-person"></i>
                                <input type="number" placeholder="Max population" onChange={(e) => setMaxPopulationValue(parseInt(e.target.value))} />
                            </div>
                        </div>
                    </div>

                    {/*shown countries */}
                    <div className="countries-list">
                        {countries
                            .slice()
                            .sort((a, b) => handleSorting(a, b, sortingValue))
                            .filter(handleRegionFilter)
                            .filter(handleSearch)
                            .filter((country) => handlePopulationSorting(country, maxPopulationValue, minPopulationValue))
                            .map((country, index) => {
                                return (
                                    <Country index={index} key={country.name.common} country={country} />
                                )
                            })}
                        {countries.length == 0 && (
                            <div>There is no country.</div>
                        )}
                    </div>
                </Loading >
            </div >
        </>
    )
}

export default Countries
