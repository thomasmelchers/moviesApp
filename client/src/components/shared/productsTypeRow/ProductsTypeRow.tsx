import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import Spinner from '../spinner/Spinner'
import ProductCard from '../../shared/productCard/ProductCard'
import IMovieData from '../../../interfaces/IMovieData'
import { ProductType } from '../../../types'
import './productsTypeRow.scss'
import ITvShowDetail from '../../../interfaces/ITvShowDetail'

interface Props {
    productType: ProductType
    productsTypeName: string
    productsTypeApiUrl: string
    productsTypeGenreId?: number
}

const ProductsTypeRow: React.FC<Props> = ({
    productType,
    productsTypeName,
    productsTypeApiUrl,
    productsTypeGenreId,
}) => {
    const [moviesData, setMoviesData] = useState<IMovieData[]>()
    const [tvShowsData, setTvShowsData] = useState<ITvShowDetail[]>()
    const [loading, setLoading] = useState<boolean>(true)

    const fetchMovies = async () => {
        try {
            const response = await axios.get(productsTypeApiUrl)

            productType === 'movie'
                ? setMoviesData(response.data.results.filter((e: IMovieData) => e.poster_path !== null))
                : setTvShowsData(response.data.results.filter((e: ITvShowDetail) => e.poster_path !== null))
        } catch (error: any) {
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    const productRows = () => {
        if (productType === 'movie') {
            return moviesData
                ?.slice(0, 8)
                .map((movie: IMovieData) => (
                    <ProductCard
                        key={movie.id}
                        productType={productType}
                        productId={movie.id}
                        productVoteAverage={movie.vote_average}
                        productTitle={movie.title}
                        productPosterPath={movie.poster_path}
                    />
                ))
        } else if (productType === 'tv') {
            return tvShowsData
                ?.slice(0, 8)
                .map((tvShow: ITvShowDetail) => (
                    <ProductCard
                        key={tvShow.id}
                        productType={productType}
                        productId={tvShow.id}
                        productVoteAverage={tvShow.vote_average}
                        productTitle={tvShow.name}
                        productPosterPath={tvShow.poster_path}
                    />
                ))
        }
    }

    // Handling Sci-Fi & Fantasy genre link issue
    productsTypeName = productType === 'tv' && productsTypeGenreId === 10765 ? 'Sci Fi & Fantasy' : productsTypeName

    const link =
        productType === 'movie'
            ? productsTypeName.startsWith('Trending')
                ? '/movies/trending'
                : `/movies/${productsTypeName}-${String(productsTypeGenreId)}`
            : productsTypeName.startsWith('Trending')
            ? '/tv-shows/trending'
            : `/tv-shows/${productsTypeName}-${String(productsTypeGenreId)}`

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
                <Link to={link} className="category-title__link">
                    <h2>{productsTypeName}</h2>
                    <span className="explore-text">Explore All &gt;</span>
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <Grid
                    container
                    justifyContent={{ xs: 'center', md: 'space-evenly' }}
                    flexDirection="row"
                    alignItems="center"
                    flexWrap="wrap"
                    width="100%"
                >
                    {productRows()}
                </Grid>
            )}
        </Grid>
    )
}

export default ProductsTypeRow
