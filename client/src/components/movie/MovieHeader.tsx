import React from 'react'
import { Grid } from '@mui/material'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import IMovieData from '../../interfaces/IMovieData'

import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import './movieHeader.scss'
import MovieLike from './MovieLike'

interface Props {
    movie: IMovieData
}

const MovieHeader: React.FC<Props> = ({ movie }) => {
    const originalTitle =
        movie.title !== movie.original_title ? (
            <p className="movie__header__title-original-tile">
                {movie.original_title}
            </p>
        ) : null

    return (
        <Grid container className="movie__header">
            <Grid item xs={12} md={8} className="movie__header__title">
                <h1>{movie.title}</h1>
                {originalTitle}
            </Grid>
            <Grid
                item
                sx={{
                    display: { xs: 'none', sm: 'none', md: 'flex' },
                }}
                flexDirection={{ md: 'row' }}
                justifyContent={{ md: 'flex-start' }}
                alignItems={{ md: 'center' }}
                className="movie__header__note"
            >
                {/* <h6>Note</h6> */}
                <div>
                    <StarOutlinedIcon className="star-icon" />
                    <span> {movie.vote_average.toFixed(1)}/10</span>
                </div>
                <MovieLike productId={movie.id} />
            </Grid>
        </Grid>
    )
}

export default MovieHeader
