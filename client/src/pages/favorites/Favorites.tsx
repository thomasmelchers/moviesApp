import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CONSTANTES from '../../utils/constantes'
import useGetLikes from '../../hooks/useGetLikes'
import IMovieDetail from '../../interfaces/IMovieData'
import ITvShowDetail from '../../interfaces/ITvShowDetail'
import { ProductType } from '../../types'
import { Grid } from '@mui/material'
import Spinner from '../../components/shared/spinner/Spinner'
import ProductCard from '../../components/shared/productCard/ProductCard'

const Favorites = () => {
    const { likes } = useGetLikes()

    const [loading, setLoading] = useState<boolean>(true)
    const [moviesLikesData, setMoviesLikesData] = useState<IMovieDetail[]>()
    const [tvShowsLikesData, setTvShowsLikesData] = useState<ITvShowDetail[]>()

    const moviesLikes: number[] | undefined = likes?.movies
    const tvShowsLikes: number[] | undefined = likes?.series

    const fetchDetails = async (type: ProductType, id: number) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/${type}/${id}?api_key=${CONSTANTES.TMDB_API_KEY}`
            )
            return response.data
        } catch (error: any) {
            console.error(error)
            return null
        }
    }

    const fetchData = async (type: ProductType, ids: number[]) => {
        try {
            const detailsArray = await Promise.all(ids.map(async (id) => await fetchDetails(type, id)))
            console.log(type, detailsArray)
            return detailsArray.filter((detail) => detail !== null)
        } catch (error: any) {
            console.error('Error fetching data', error)
            return []
        }
    }

    useEffect(() => {
        const setData = async () => {
            if (moviesLikes) {
                const movies: IMovieDetail[] = await fetchData('movie', moviesLikes)
                setMoviesLikesData(movies)
            }

            if (tvShowsLikes) {
                const tvShows: ITvShowDetail[] = await fetchData('tv', tvShowsLikes)
                setTvShowsLikesData(tvShows)
            }
            setLoading(false)
        }

        setData()
    }, [likes])

    useEffect(() => {
        console.log('movies:', moviesLikesData, 'tv:', tvShowsLikesData)
        console.log(loading)
    }, [moviesLikesData, tvShowsLikesData, loading])

    return (
        <Grid container flexDirection="column" justifyContent="center" alignItems="center" mb={{ xs: '10vh', md: 0 }}>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Grid
                        container
                        flexDirection="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        p={3}
                        item
                        xs={11}
                        mb={4}
                        className="paper"
                    >
                        <Grid item xs={12}>
                            <div className="category-title">
                                <h2>Movies Liked</h2>
                            </div>
                        </Grid>

                        {moviesLikesData?.map((movie) => (
                            <ProductCard
                                key={movie.id}
                                productId={movie.id}
                                productType="movie"
                                productTitle={movie.title}
                                productPosterPath={movie.poster_path}
                                productVoteAverage={movie.vote_average}
                            />
                        ))}
                    </Grid>

                    <Grid
                        container
                        flexDirection="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        p={3}
                        item
                        xs={11}
                        mb={4}
                        className="paper"
                    >
                        <Grid item xs={12}>
                            <div className="category-title">
                                <h2>Tv-Shows Liked</h2>
                            </div>
                        </Grid>

                        {tvShowsLikesData?.map((tvShow) => (
                            <ProductCard
                                key={tvShow.id}
                                productId={tvShow.id}
                                productType="tv"
                                productTitle={tvShow.name}
                                productPosterPath={tvShow.poster_path}
                                productVoteAverage={tvShow.vote_average}
                            />
                        ))}
                    </Grid>
                </>
            )}
        </Grid>
    )
}

export default Favorites
