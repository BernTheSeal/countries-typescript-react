import axios from "axios"
import { useEffect, useState } from "react"
import { CountryType } from "../types/countryType"
import { countryFetchOptionsType } from "../types/countryFetchOptionsType"

const useFetchCountriesData = (options?: countryFetchOptionsType) => {
    const URL = "https://restcountries.com/v3.1/all"
    const [countries, setCountries] = useState<CountryType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const getCountries = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get<CountryType[]>(URL)
            let filteredData = data

            if (options?.populationValue) {
                const [minPop = 0, maxPop = 100000000000] = options.populationValue
                filteredData = filteredData.filter((country: CountryType) => country.population >= minPop && country.population <= maxPop)
            }

            if (options?.areaValue) {
                const [minArea = 0, maxArea = 18000000] = options.areaValue
                filteredData = filteredData.filter((country: CountryType) => country.area >= minArea && country.area <= maxArea)
            }

            if (options?.regions) {
                const regions = options.regions
                filteredData = filteredData.filter((country: CountryType) => regions.includes(country.region))
            }

            if (options?.languages) {
                const languages = options.languages
                filteredData = filteredData.filter((country: CountryType) => {
                    if (country.languages) {
                        const spokenLanguages = Object.values(country.languages)
                        return languages.some(lang => spokenLanguages.includes(lang))
                    }
                })
            }

            if (options?.seaAccess !== undefined) {
                const isSeaAccess = !options.seaAccess
                filteredData = filteredData.filter((country: CountryType) => country.landlocked === isSeaAccess)
            }

            if (options?.independent !== undefined) {
                const isIndependent = options.independent
                filteredData = filteredData.filter((country: CountryType) => country.independent === isIndependent)
            }

            if (options?.unitedNations !== undefined) {
                const isUnitedNations = options.unitedNations
                filteredData = filteredData.filter((country: CountryType) => country.unMember === isUnitedNations)
            }

            switch (options?.sortingType) {
                case "alphabetical":
                    alphabeticalSorting(filteredData, options.sortingOrder)
                    break;
                case "shuffled":
                    shuffledSorting(filteredData)
                    break;
                case "population":
                    populationSorting(filteredData, options.sortingOrder)
                    break;
                case "area":
                    areaSorting(filteredData, options.sortingOrder)
                    break;
                default:
                    setCountries(filteredData)
                    break;
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const shuffledSorting = (countries: CountryType[]): void => {
        const shuffledSortingArray = [...countries]
        for (let i = shuffledSortingArray.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [shuffledSortingArray[i], shuffledSortingArray[j]] = [shuffledSortingArray[j], shuffledSortingArray[i]]
        }
        setCountries(shuffledSortingArray)
    }

    const alphabeticalSorting = (countries: CountryType[], sortingOrder = "desc"): void => {
        const alphabeticalSortingArray = [...countries].sort((a, b) =>
            sortingOrder === "desc" ? b.name.common.localeCompare(a.name.common) : a.name.common.localeCompare(b.name.common)
        )
        setCountries(alphabeticalSortingArray)
    }

    const populationSorting = (countries: CountryType[], sortingOrder = "desc"): void => {
        const populationSortingArray = [...countries].sort((a, b) =>
            sortingOrder === "desc" ? b.population - a.population : a.population - b.population
        )
        setCountries(populationSortingArray)
    }

    const areaSorting = (countries: CountryType[], sortingOrder = "desc"): void => {
        const areaSortingArray = [...countries].sort((a, b) =>
            sortingOrder === "desc" ? b.area - a.area : a.area - b.area
        )
        setCountries(areaSortingArray)
    }

    useEffect(() => {
        getCountries()
    }, [])

    return { countries, loading }
}

export default useFetchCountriesData