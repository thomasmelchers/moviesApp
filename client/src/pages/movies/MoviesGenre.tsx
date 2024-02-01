import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CONSTANTES from '../../utils/constantes'
import IMovieData from '../../interfaces/IMovieData'
import { Grid } from '@mui/material'
import ProductCard from '../../components/shared/productCard/ProductCard'
import Spinner from '../../components/shared/spinner/Spinner'

const MoviesGenre = () => {
    const { movieGenre } = useParams()
    const [moviesGenre, setMoviesGenre] = useState<IMovieData[]>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    let movieGenreParamsSplit: string[] = []
    if (movieGenre) {
        movieGenreParamsSplit = movieGenre?.split('-')
    }
    const moviesGenreNb = movieGenreParamsSplit[1]
    const moviesGenreName = movieGenreParamsSplit[0]

    const fetchMovies = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${CONSTANTES.TMDB_API_KEY}&with_genres=${moviesGenreNb}`,
            )

            setMoviesGenre(
                response.data.results.filter(
                    (e: IMovieData) => e.poster_path !== null,
                ),
            )
        } catch (error: any) {
            console.error(error)
            setError(error.message)
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
                <h2>{moviesGenreName}</h2>
            </div>
            {error ? <p>{error}</p> : null}
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
                    {moviesGenre?.map((movie: IMovieData) => (
                        <ProductCard
                            productType="movie"
                            productId={movie.id}
                            productTitle={movie.title}
                            productPosterPath={movie.poster_path}
                            productVoteAverage={movie.vote_average}
                            key={movie.id}
                        />
                    ))}
                </Grid>
            )}
        </Grid>
    )
}

export default MoviesGenre
