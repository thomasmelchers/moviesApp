interface IMovieDiscoverData {
    adult: boolean
    backdrop_path: string
    belong_to_collection: string | null
    budget: number
    genres: IGenres[]
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

export interface IGenres {
    id: number
    name: string
}

export interface IProductionCompanies {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export interface ISpokenLanguages {
    english_name: string
    iso_639_1: string
    name: string
}
export default IMovieDiscoverData
