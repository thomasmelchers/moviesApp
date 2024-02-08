import { useState, useEffect } from 'react'
import axios from 'axios'
import CONSTANTES from '../utils/constantes'
import IProductGenres from '../interfaces/IProductsGenres'
import { ProductType } from '../types'

const useTMDBApiGenres = (
    productType: ProductType,
    nbGenresSelected: number,
) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [listOfSelectedGenres, setListOfSelectedGenres] = useState<
        IProductGenres[]
    >([])

    useEffect(() => {
        const fetchMovieGenres = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/genre/${productType}/list?api_key=${CONSTANTES.TMDB_API_KEY}`,
                )

                const responseArray = response.data.genres
                const selectedGenres = selectRandomGenres(
                    responseArray,
                    nbGenresSelected,
                )

                let formattedGenres = selectedGenres.map((selectedGenre) => ({
                    id: selectedGenre.id,
                    name: selectedGenre.name,
                    url: `https://api.themoviedb.org/3/discover/${productType}?api_key=${CONSTANTES.TMDB_API_KEY}&with_genres=${selectedGenre.id}`,
                }))

                setListOfSelectedGenres(formattedGenres)
                setLoading(false)
            } catch (error: any) {
                console.error(error)
                setError('Error fetching genres')
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }

        fetchMovieGenres()
    }, [productType, nbGenresSelected])

    return { loading, error, listOfSelectedGenres }
}

const selectRandomGenres = (
    array: IProductGenres[],
    count: number,
): IProductGenres[] => {
    const shuffledArray = [...array]

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1))
        ;[shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ]
    }

    return shuffledArray.slice(0, count)
}

export default useTMDBApiGenres
