import IGenresApi from './IGenresApi'
import IProductionCompanies from './IProductionCompanies'
import ISpokenLanguages from './ISpokenLanguages'
import IProductionCountries from './IProductionCountries'
import ITvShowSeasons from './ITvShowSeason'

interface ITvShowDetail {
    adult: boolean
    backdrop_path: string
    episode_run_time: number[]
    first_air_date: string
    genres: IGenresApi[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_production: string
    last_episode_to_air: string
    name: string
    next_episode_to_air: string | null
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: IProductionCompanies[]
    production_countries: IProductionCountries[]
    seasons: ITvShowSeasons[]
    spoken_languages: ISpokenLanguages[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
}

export default ITvShowDetail
