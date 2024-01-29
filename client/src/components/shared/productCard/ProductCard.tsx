import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import IMovieData from '../../../interfaces/IMovieDiscoverData'
import { ProductType } from '../../../types'
import './productCard.scss'

interface Props {
    product: IMovieData
    productType: ProductType
}

const ProductCard: React.FC<Props> = ({ product, productType }) => {
    return (
        <Grid
            key={product.id}
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
                        ? `/movie/${product.id}`
                        : `/tv-show/${product.id}`
                }
            >
                <div className="poster">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${product.poster_path}`}
                        alt={product.original_title}
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
                        <p>{product.title}</p>
                    </div>
                    <div className="ratings">
                        <div className="star">
                            <StarOutlinedIcon className="star-icon" />
                            <span>{product.vote_average.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </Grid>
    )
}

export default ProductCard
