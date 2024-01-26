import IMovieData from './IMovieData'

interface IMovieType {
    page: number
    results: IMovieData[]
    total_page: number
    total_results: number
}

export default IMovieType
