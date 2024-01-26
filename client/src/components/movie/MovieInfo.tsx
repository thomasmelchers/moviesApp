import React from 'react'
import './movieInfo.scss'
import IMovieData from '../../interfaces/IMovieData'

interface Props {
    movie: IMovieData
}

const MovieInfo: React.FC<Props> = ({ movie }) => {
    return (
        <div>
            <p className="movie-info__title">
                Release Date:{' '}
                <span className="movie-info__value">{movie.release_date}</span>
            </p>
            <p className="movie-info__title">
                Production Company:{' '}
                <span className="movie-info__value">
                    {movie.production_companies[0]?.name}{' '}
                </span>
            </p>
            <p className="movie-info__title">
                Version Original:
                <span className="movie-info__value">
                    {movie.original_language}
                </span>
            </p>
            <p className="movie-info__title">
                Status:
                <span className="movie-info__value">{movie.status}</span>
            </p>
        </div>
    )
}

export default MovieInfo
