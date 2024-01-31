import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import IMovieData from '../../../interfaces/IMovieDiscoverData'
import { ProductType } from '../../../types'
import './productCard.scss'

interface Props {
    productType: ProductType
    productId: number
    productTitle: string
    productPosterPath: string
    productVoteAverage: number
}

const ProductCard: React.FC<Props> = ({
    productType,
    productId,
    productTitle,
    productPosterPath,
    productVoteAverage,
}) => {
    return (
        <Grid
            key={productId}
            item
            xs={12}
            md={6}
            lg={2.9}
            xl={1.4}
            my={{ xs: 2, lg: 1, xl: 1 }}
            className="card"
        >
            <Link
                to={
                    productType === 'movie'
                        ? `/movie/${productId}`
                        : `/tv-show/${productId}`
                }
            >
                <div className="poster">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${productPosterPath}`}
                        alt={productTitle}
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
                        <p>{productTitle}</p>
                    </div>
                    <div className="ratings">
                        <div className="star">
                            <StarOutlinedIcon className="star-icon" />
                            <span>{productVoteAverage.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </Grid>
    )
}

export default ProductCard
