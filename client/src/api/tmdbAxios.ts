import axios from 'axios'
import CONSTANTES from '../utils/constantes'

export const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
})

export const getMoviesSearch = async (pageParam = 1, query: string, options = {}) => {
    const response = await tmdbApi.get(
        `/search/movie?query=${query}&page=${pageParam}&api_key=${CONSTANTES.TMDB_API_KEY}`,
    )
    return response.data
}
export const getTvShowsSearch = async (pageParam = 1, query: string, options = {}) => {
    const response = await tmdbApi.get(`/search/tv?query=${query}&page=${pageParam}&api_key=${CONSTANTES.TMDB_API_KEY}`)
    return response.data
}
