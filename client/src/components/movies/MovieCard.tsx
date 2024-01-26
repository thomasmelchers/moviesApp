import React from 'react'
import { Grid } from '@mui/material'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import IMovieData from '../../interfaces/IMovieDiscoverData'
import './MovieCard.scss'
import { Link } from 'react-router-dom'

interface Props {
    movie: IMovieData
}

const MovieCard: React.FC<Props> = ({ movie }) => {
    return (
        <Grid
            key={movie.id}
            item
            xs={12}
            md={6}
            lg={2.9}
            xl={1.4}
            my={{ xs: 2, lg: 1, xl: 1 }}
            className="card"
        >
            <Link to={`/movie/${movie.id}`}>
                <div className="poster">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.original_title}
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            height: 'auto',
                            borderRadius: '10px',
                            transition: '0.5s',
                        }}
                    />
                </div>
                <div className="details">
                    <div className="title">
                        <p>{movie.title}</p>
                    </div>
                    <div className="ratings">
                        <div className="star">
                            <StarOutlinedIcon className="star-icon" />
                            <span>{movie.vote_average.toFixed(1)}</span>
                        </div>
                        {/* <div className="like">
                            <FavoriteBorderOutlinedIcon className="like-icon" />
                        </div> */}
                    </div>
                </div>
            </Link>
        </Grid>
    )
}

export default MovieCard
