import { useState, useEffect } from 'react'
import axios from 'axios'
import CONSTANTES from '../utils/constantes'
import { ProductType } from '../types'
import IGenresApi from '../interfaces/IGenresApi'

const useGenres = (productType: ProductType) => {
    const [error, setError] = useState<string | null>(null)
    const [genres, setGenres] = useState<IGenresApi[]>()

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/genre/${productType}/list?api_key=${CONSTANTES.TMDB_API_KEY}`,
                )
                setGenres(response.data.genres)
            } catch (error: any) {
                console.log(error)
                setError(error)
            }
        }

        fetchGenres()
    }, [])

    return { error, genres }
}

export default useGenres
