import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import CONSTANTES from '../../utils/constantes'
import IMovieDetail from '../../interfaces/IMovieData'
import ProductCard from '../../components/shared/productCard/ProductCard'
import { Grid } from '@mui/material'
import Spinner from '../../components/shared/spinner/Spinner'
import ITvShowDetail from '../../interfaces/ITvShowDetail'
import './search.scss'

const Search = () => {
    const location = useLocation()
    const [loading, setLoading] = useState<boolean>(true)
    const [moviesResults, setMoviesResults] = useState<IMovieDetail[]>()
    const [tvShowResults, setTvShowResults] = useState<ITvShowDetail[]>()
    const [error, setError] = useState<string>()

    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('query')
    const type = queryParams.get('type')

    const MOVIE_URL = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${CONSTANTES.TMDB_API_KEY}`
    const TV_SHOW_URL = `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${CONSTANTES.TMDB_API_KEY}`
    const url = type === 'movie' ? MOVIE_URL : type === 'tv' ? TV_SHOW_URL : ''

    const fetchMovies = async () => {
        try {
            const response = await axios.get(url)

            type === 'movie'
                ? setMoviesResults(
                      response.data.results.filter(
                          (r: IMovieDetail) => r.poster_path,
                      ),
                  )
                : type === 'tv'
                  ? setTvShowResults(
                        response.data.results.filter(
                            (t: ITvShowDetail) => t.poster_path,
                        ),
                    )
                  : console.error('type is missing')
        } catch (error: any) {
            if (error.code === 'ERR_BAD_REQUEST') {
                setError(`Nothing has been found for this research: ${query}`)
            } else {
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    console.log(tvShowResults?.map((r) => r.name))

    const moviesResultsData = moviesResults?.map((movie) => (
        <ProductCard
            key={movie.id}
            productType="movie"
            productId={movie.id}
            productTitle={movie.title}
            productPosterPath={movie.poster_path}
            productVoteAverage={movie.vote_average}
        />
    ))

    const tvResultsData = tvShowResults?.map((tvShow) => (
        <ProductCard
            key={tvShow.id}
            productType="tv"
            productId={tvShow.id}
            productTitle={tvShow.name}
            productPosterPath={tvShow.poster_path}
            productVoteAverage={tvShow.vote_average}
        />
    ))

    const results =
        type === 'movie'
            ? moviesResultsData
            : type === 'tv'
              ? tvResultsData
              : null

    return (
        <Grid
            container
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            p={3}
            item
            xs={11}
            mb={{ xs: '10vh', md: 4 }}
            className="paper"
        >
            <div className="search__title">
                <h2>{query}</h2>
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
                    {results}
                </Grid>
            )}
        </Grid>
    )
}

export default Search
