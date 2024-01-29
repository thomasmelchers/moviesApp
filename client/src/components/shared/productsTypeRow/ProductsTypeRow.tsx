import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import Spinner from '../spinner/Spinner'
import ProductCard from '../../shared/productCard/ProductCard'
import IMovieData from '../../../interfaces/IMovieData'
import { ProductType } from '../../../types'
import './productsTypeRow.scss'

interface Props {
    productType: ProductType
    productsTypeName: string
    productsTypeApiUrl: string
    productsTypeGenreId: number
}

const ProductsTypeRow: React.FC<Props> = ({
    productType,
    productsTypeName,
    productsTypeApiUrl,
    productsTypeGenreId,
}) => {
    const [productsData, setProductsData] = useState<IMovieData[]>()
    const [loading, setLoading] = useState<boolean>(true)

    const fetchMovies = async () => {
        try {
            const response = await axios.get(productsTypeApiUrl)

            setProductsData(response.data.results)
        } catch (error: any) {
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    return (
        <Grid
            container
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            p={3}
            item
            xs={11}
            mb={4}
            className="paper"
        >
            <div className="category-title">
                <Link to={`${productsTypeName}-${String(productsTypeGenreId)}`}>
                    <h2>{productsTypeName}</h2>
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <Grid
                    container
                    justifyContent={{ xs: 'center', md: 'space-between' }}
                    flexDirection="row"
                    alignItems="center"
                    flexWrap="wrap"
                    width="100%"
                >
                    {productsData
                        ?.slice(0, 8)
                        .map((movie: any) => (
                            <ProductCard
                                product={movie}
                                key={movie.id}
                                productType={productType}
                            />
                        ))}
                </Grid>
            )}
        </Grid>
    )
}

export default ProductsTypeRow
