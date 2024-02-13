import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { ProductType } from '../../../types'
import './productCard.scss'

interface Props {
    productType: ProductType
    productId: number
    productTitle: string
    productPosterPath: string | null
    productVoteAverage: number
}

const ProductCard = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { productType, productId, productTitle, productPosterPath, productVoteAverage } = props

    const card = (
        <Link to={productType === 'movie' ? `/movie/${productId}` : `/tv-show/${productId}`}>
            <div className="poster">
                {productPosterPath !== null ? (
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
                ) : (
                    <p>no cover for this product</p>
                )}
            </div>
            <div className="details">
                <div className="title">
                    <p>{productTitle}</p>
                </div>
                <div className="ratings">
                    <div className="star">
                        <StarOutlinedIcon className="star-icon" />
                        <span>{productVoteAverage?.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </Link>
    )

    const productCard = ref ? (
        <Grid ref={ref} item xs={12} md={6} lg={2.9} xl={1.4} my={{ xs: 2, lg: 1, xl: 1 }} className="card">
            {card}
        </Grid>
    ) : (
        <Grid item xs={12} md={6} lg={2.9} xl={1.4} my={{ xs: 2, lg: 1, xl: 1 }} className="card">
            {card}
        </Grid>
    )

    return productCard
})

export default ProductCard
