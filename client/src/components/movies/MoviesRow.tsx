import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import IMovieData from '../../interfaces/IMovieDiscoverData'
import MovieCard from './MovieCard'
import { Link } from 'react-router-dom'
import './moviesRow.scss'
import axios from '../../api/axios'
import Spinner from '../spinner/Spinner'

interface Prop {
    movieName: string
    movieUrl: string
    movieGenreId: number
}

const MoviesRow: React.FC<Prop> = ({ movieName, movieUrl, movieGenreId }) => {
    const [movieData, setMovieData] = useState<IMovieData[]>()
    const [loading, setLoading] = useState<boolean>(true)

    const fetchMovies = async () => {
        try {
            const response = await axios.get(movieUrl)

            setMovieData(response.data.results)
        } catch (error: any) {
            console.error(error.message)
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
                <Link to={`${movieName}-${String(movieGenreId)}`}>
                    <h2>{movieName}</h2>
                </Link>
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
                    {movieData
                        ?.slice(0, 8)
                        .map((movie: any) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                </Grid>
            )}
        </Grid>
    )
}

export default MoviesRow
