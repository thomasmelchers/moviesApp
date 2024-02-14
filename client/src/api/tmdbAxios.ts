import axios from 'axios'
import CONSTANTES from '../utils/constantes'
import { ProductType } from '../types'
import ITvShowDetail from '../interfaces/ITvShowDetail'
import IMovieDetail from '../interfaces/IMovieData'

export const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
})

export const getMoviesSearch = async (pageParam = 1, query: string, options = {}) => {
    const response = await tmdbApi.get(
        `/search/movie?query=${query}&page=${pageParam}&api_key=${CONSTANTES.TMDB_API_KEY}`
    )
    return response.data
}
export const getTvShowsSearch = async (pageParam = 1, query: string, options = {}) => {
    const response = await tmdbApi.get(`/search/tv?query=${query}&page=${pageParam}&api_key=${CONSTANTES.TMDB_API_KEY}`)
    return response.data
}

export const getProductByGenre = async (type: ProductType, genreNb: string, page: number) => {
    const response = await tmdbApi.get(
        `/discover/${type}?with_genres=${genreNb}&page=${page}&api_key=${CONSTANTES.TMDB_API_KEY}`
    )

    return type === 'movie'
        ? response.data.results.filter((e: IMovieDetail) => e.poster_path !== null)
        : response.data.results.filter((e: ITvShowDetail) => e.poster_path !== null)
}
