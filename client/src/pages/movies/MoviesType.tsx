import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CONSTANTES from '../../utils/constantes'
import IMovieType from '../../interfaces/IMovieType'
import { Grid } from '@mui/material'
import MovieCard from '../../components/movies/MovieCard'
import Spinner from '../../components/shared/spinner/Spinner'

const MoviesType = () => {
    const { movieType } = useParams()
    const [moviesType, setMoviesType] = useState<IMovieType>()
    const [loading, setLoading] = useState(true)

    let movieTypeSplit: string[] = []
    if (movieType) {
        movieTypeSplit = movieType?.split('-')
    }
    const movieTypeNb = movieTypeSplit[1]
    const movieTypeName = movieTypeSplit[0]

    const fetchMovies = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${CONSTANTES.TMDB_API_KEY}&with_genres=${movieTypeNb}`,
            )
            console.log(response.data)
            setMoviesType(response.data)
        } catch (error: any) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    return (
        <Grid
            container
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            p={3}
            item
            xs={11}
            mb={4}
            className="paper"
        >
            <div className="category-title">
                <h2>{movieTypeName}</h2>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <Grid
                    container
                    justifyContent={{ xs: 'center', md: 'space-between' }}
                    flexDirection="row"
                    alignItems="center"
                    flexWrap="wrap"
                    width="100%"
                >
                    {moviesType?.results.map((movie: any) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </Grid>
            )}
        </Grid>
    )
}

export default MoviesType
