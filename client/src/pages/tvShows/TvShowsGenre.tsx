import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductByGenre } from '../../api/tmdbAxios'
import ITvShowDetail from '../../interfaces/ITvShowDetail'
import { Grid } from '@mui/material'
import Spinner from '../../components/shared/spinner/Spinner'
import ProductCard from '../../components/shared/productCard/ProductCard'
import Pagination from '../../components/shared/pagination/Pagination'

const TvShowsGenre = () => {
    const { tvShowGenre } = useParams()

    const [tvShows, setTvShows] = useState<ITvShowDetail[]>()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState<number>(1)
    const [error, setError] = useState<string | null>(null)

    let tvShowParamsSplit: string[] = []
    if (tvShowGenre) {
        tvShowParamsSplit = tvShowGenre?.split('-')
    }
    const tvShowGenreNb = tvShowParamsSplit[1]
    const tvShowTypeName = tvShowParamsSplit[0]

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getProductByGenre('tv', tvShowGenreNb, page)

                setTvShows(response)
            } catch (error: any) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, [page, tvShowGenreNb])

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
                    <h2>{tvShowTypeName}</h2>
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
                        {tvShows?.map((tvShow: ITvShowDetail) => (
                            <ProductCard
                                productType="tv"
                                productId={tvShow.id}
                                productTitle={tvShow.name}
                                productPosterPath={tvShow.poster_path}
                                productVoteAverage={tvShow.vote_average}
                                key={tvShow.id}
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

export default TvShowsGenre
