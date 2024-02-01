import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ITvShowDetail from '../../interfaces/ITvShowDetail'
import CONSTANTES from '../../utils/constantes'
import Spinner from '../../components/shared/spinner/Spinner'
import { Grid } from '@mui/material'
import ProductCard from '../../components/shared/productCard/ProductCard'

const TvShowsGenre = () => {
    const { tvShowGenre } = useParams()

    const [tvShows, setTvShows] = useState<ITvShowDetail[]>()
    const [loading, setLoading] = useState(true)

    let tvShowParamsSplit: string[] = []
    if (tvShowGenre) {
        tvShowParamsSplit = tvShowGenre?.split('-')
    }
    const tvShowTypeNb = tvShowParamsSplit[1]
    const tvShowTypeName = tvShowParamsSplit[0]

    const fetchMovies = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/tv?api_key=${CONSTANTES.TMDB_API_KEY}&with_genres=${tvShowTypeNb}`,
            )

            setTvShows(
                response.data.results.filter(
                    (e: ITvShowDetail) => e.poster_path !== null,
                ),
            )
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
                <h2>{tvShowTypeName}</h2>
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
    )
}

export default TvShowsGenre
