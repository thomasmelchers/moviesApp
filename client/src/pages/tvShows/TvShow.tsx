import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import CONSTANTES from '../../utils/constantes'
import { Grid } from '@mui/material'
import ProductHeader from '../../components/shared/product/ProductHeader'
import ProductInfo from '../../components/shared/product/ProductInfo'
import GenresTag from '../../components/shared/product/GenresTag'
import YoutubeTrailer from '../../components/shared/product/YoutubeTrailer'
import Spinner from '../../components/shared/spinner/Spinner'
import ITvShowDetail from '../../interfaces/ITvShowDetail'

const TvShow = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [tvShow, setTvShow] = useState<ITvShowDetail | null>(null)
    const [loading, setLaoding] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const productType = 'tv'

    const fetchMovie = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/tv/${id}?api_key=${CONSTANTES.TMDB_API_KEY}`,
            )
            setTvShow(response.data)
        } catch (error: any) {
            setError(error.message())
            navigate('/*')
        } finally {
            setLaoding(false)
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [id, navigate])

    if (!tvShow) {
        return <Spinner />
    }

    return (
        <Grid
            container
            flexDirection="column"
            item
            xs={12}
            md={10}
            lg={8}
            p={3}
            mb={{ xs: '10vh', md: 0 }}
            className="paper"
        >
            {error ? <p>{error}</p> : null}

            <>
                <ProductHeader
                    title={tvShow?.name}
                    originalTitle={tvShow.original_name}
                    voteAverage={tvShow.vote_average}
                    id={tvShow.id}
                    productType={productType}
                />
                <Grid
                    container
                    justifyContent={{ sm: 'center', lg: 'space-between' }}
                >
                    <Grid item md={3.5}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${tvShow?.poster_path}`}
                            alt={tvShow?.name}
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '3px',
                            }}
                        />
                    </Grid>
                    <Grid
                        container
                        item
                        md={8}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <YoutubeTrailer id={id} productType={productType} />
                    </Grid>
                    <Grid container mt={2}>
                        <Grid
                            container
                            justifyContent="flex-start"
                            item
                            xs={12}
                        >
                            {tvShow?.genres.map((genre, index) => (
                                <GenresTag
                                    key={genre.id}
                                    genreName={genre.name}
                                    index={index}
                                />
                            ))}
                        </Grid>

                        <Grid item xs={12} mt={2}>
                            <p className="movieOverview">{tvShow?.overview} </p>
                        </Grid>
                        <Grid
                            container
                            justifyContent={{
                                xs: 'center',
                                md: 'space-between',
                            }}
                            alignItems={{ xs: 'center' }}
                            mt={2}
                        >
                            <Grid item xs={12} md={6} lg={4}>
                                <ProductInfo
                                    productType={productType}
                                    productionCompanyName={
                                        tvShow?.production_companies[0]?.name
                                    }
                                    orginalLanguage={tvShow.original_language}
                                    status={tvShow.status}
                                    nbOfEpisodes={tvShow.number_of_episodes}
                                    nbOfSeasons={tvShow.number_of_seasons}
                                    firstEpisodeRelease={tvShow.first_air_date}
                                />
                            </Grid>
                            <Grid
                                item
                                sx={{ display: { xs: 'none', md: 'flex' } }}
                                md={6}
                                lg={7.5}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${tvShow?.backdrop_path}`}
                                    alt={tvShow?.original_name}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '3px',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        </Grid>
    )
}

export default TvShow
