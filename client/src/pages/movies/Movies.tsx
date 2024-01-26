import React, { useState, useEffect } from 'react'
import CONSTANTES from '../../utils/constantes'
import axios from 'axios'
import { Grid } from '@mui/material'
import MoviesRow from '../../components/movies/MoviesRow'
import IMovieGenres from '../../interfaces/IMovieGenres'

const Movies = () => {
    const [movieGenres, setMovieGenres] = useState<IMovieGenres[]>()

    const nbOfGenresSelected = 5

    const fetchMovieGenres = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${CONSTANTES.TMDB_API_KEY}`,
            )

            const responseArray = response.data.genres
            const selectedGenres = selectRandomGenres(
                responseArray,
                nbOfGenresSelected,
            )

            let listOfSelectedGenres: IMovieGenres[] = []

            for (const selectedGenre of selectedGenres) {
                const newFormatGenre: IMovieGenres = {
                    id: selectedGenre.id,
                    name: selectedGenre.name,
                    url: `https://api.themoviedb.org/3/discover/movie?api_key=${CONSTANTES.TMDB_API_KEY}&with_genres=${selectedGenre.id}`,
                }

                listOfSelectedGenres.push(newFormatGenre)
            }

            setMovieGenres(listOfSelectedGenres)
        } catch (error: any) {
            console.error(error)
        }
    }

    const selectRandomGenres = (
        array: IMovieGenres[],
        count: number,
    ): IMovieGenres[] => {
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

    useEffect(() => {
        fetchMovieGenres()
    }, [])

    console.log(movieGenres)

    return (
        <Grid
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            {movieGenres?.map((movieGenre) => (
                <MoviesRow
                    key={movieGenre.name}
                    movieName={movieGenre.name}
                    movieUrl={movieGenre.url}
                    movieGenreId={movieGenre.id}
                />
            ))}
        </Grid>
    )
}

export default Movies
