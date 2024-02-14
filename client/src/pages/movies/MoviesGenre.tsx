import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductByGenre } from '../../api/tmdbAxios'
import CONSTANTES from '../../utils/constantes'
import IMovieData from '../../interfaces/IMovieData'
import { Grid } from '@mui/material'
import ProductCard from '../../components/shared/productCard/ProductCard'
import Spinner from '../../components/shared/spinner/Spinner'
import Pagination from '../../components/shared/pagination/Pagination'

const MoviesGenre = () => {
    const { movieGenre } = useParams()

    const [moviesGenre, setMoviesGenre] = useState<IMovieData[]>()
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    let movieGenreParamsSplit: string[] = []
    if (movieGenre) {
        movieGenreParamsSplit = movieGenre?.split('-')
    }
    const moviesGenreNb = movieGenreParamsSplit[1]
    const moviesGenreName = movieGenreParamsSplit[0]

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getProductByGenre('movie', moviesGenreNb, page)

                setMoviesGenre(response)
            } catch (error: any) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, [page, moviesGenreNb])

    const nextPage = () => setPage((prev) => prev + 1)
    const previousPage = () => setPage((prev) => prev - 1)

    return (
        <Grid
            container
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            p={3}
            item
            xs={11}
            mb={{ xs: '10vh', md: 4 }}
            className="paper"
        >
            <Grid container flexDirection="row" justifyContent="flex-start" alignItems="center" mb={5}>
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
            <Grid container justifyContent="center" item xs={10} md={6}>
                <Pagination page={page} setPage={setPage} nextPage={nextPage} previousPage={previousPage} />
            </Grid>
        </Grid>
    )
}

export default MoviesGenre
