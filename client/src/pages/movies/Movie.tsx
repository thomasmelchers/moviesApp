import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import axios from 'axios'
import CONSTANTES from '../../utils/constantes'
import YoutubeTrailer from '../../components/movie/YoutubeTrailer'
import { useNavigate } from 'react-router-dom'
import './movie.scss'
import IMovieData from '../../interfaces/IMovieData'
import MovieHeader from '../../components/movie/MovieHeader'
import Genres from '../../components/movie/Genres'
import MovieInfo from '../../components/movie/MovieInfo'
import Spinner from '../../components/spinner/Spinner'

const Movie = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [movie, setMovie] = useState<IMovieData | null>(null)

    const fetchMovie = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${CONSTANTES.TMDB_API_KEY}`,
            )

            setMovie(response.data)
        } catch (error: any) {
            console.error(error)
            navigate('/*')
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [id, navigate])

    if (!movie) {
        // Movie data is not available yet, you might want to show a loading spinner or message
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
            className="paper"
        >
            <MovieHeader movie={movie} />
            <Grid
                container
                justifyContent={{ sm: 'center', lg: 'space-between' }}
            >
                <Grid item md={3.5}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
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
                    <YoutubeTrailer id={id} />
                </Grid>
                <Grid container mt={2}>
                    <Grid container justifyContent="flex-start" item xs={12}>
                        {movie.genres.map((genre) => (
                            <Genres key={genre.id} genreName={genre.name} />
                        ))}
                    </Grid>

                    <Grid item xs={12} mt={2}>
                        <p className="movieOverview">{movie.overview} </p>
                    </Grid>
                    <Grid
                        container
                        justifyContent={{ xs: 'center', md: 'space-between' }}
                        alignItems={{ xs: 'center' }}
                        mt={2}
                    >
                        <Grid item xs={12} md={6} lg={4}>
                            <MovieInfo movie={movie} />
                        </Grid>
                        <Grid
                            item
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                            md={6}
                            lg={7.5}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                                alt={movie.original_title}
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
        </Grid>
    )
}

export default Movie
