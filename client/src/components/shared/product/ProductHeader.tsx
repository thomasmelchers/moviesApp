import React from 'react'
import { Grid } from '@mui/material'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import IMovieDetail from '../../../interfaces/IMovieData'
import ProductLike from './ProductLike'
import ITvShowDetail from '../../../interfaces/ITvShowDetail'
import { ProductType } from '../../../types'
import './productHeader.scss'

interface Props {
    title: string
    originalTitle: string
    id: number
    voteAverage: number
}

const ProductHeader: React.FC<Props> = ({
    title,
    originalTitle,
    voteAverage,
    id,
}) => {
    const showOriginalTitle =
        title !== originalTitle ? (
            <p className="movie__header__title-original-tile">
                {originalTitle}
            </p>
        ) : null

    return (
        <Grid container className="movie__header">
            <Grid item xs={12} md={8} className="movie__header__title">
                <h1>{title}</h1>
                {showOriginalTitle}
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
                    <span> {voteAverage.toFixed(1)}/10</span>
                </div>
                <ProductLike productId={id} />
            </Grid>
        </Grid>
    )
}

export default ProductHeader
