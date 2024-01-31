import IGenresApi from './IGenresApi'
import IProductionCompanies from './IProductionCompanies'
import ISpokenLanguages from './ISpokenLanguages'

interface IMovieDetail {
    adult: boolean
    backdrop_path: string
    belong_to_collection: string | null
    budget: number
    genres: IGenresApi[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: IProductionCompanies[]
    release_date: string
    revenue: number
    runtime: number
    spoken_language: ISpokenLanguages[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export default IMovieDetail
