import React, { useRef, useCallback } from 'react'
import { Grid } from '@mui/material'
import Spinner from '../../components/shared/spinner/Spinner'
import ProductCard from '../../components/shared/productCard/ProductCard'
import IMovieDetail from '../../interfaces/IMovieData'
import useTrendings from '../../hooks/useTrendings'

const TrendingMovies = () => {
    const { moviesResults, isLoading, isError, error, hasNextPage, setPageNum } = useTrendings('movie')

    const intObserver = useRef<IntersectionObserver | null>()
    const lastElementRef = useCallback(
        (element: HTMLDivElement | null) => {
            if (isLoading || !element) return

            if (intObserver.current) {
                intObserver.current.disconnect()
            }

            intObserver.current = new IntersectionObserver((posts) => {
                if (posts[0].isIntersecting && hasNextPage) {
                    console.log('we are near the last post!')
                    setPageNum((prev) => prev + 1)
                }
            })

            if (element) intObserver.current.observe(element)
        },
        [isLoading, hasNextPage]
    )

    const moviesContent = moviesResults.map((movie: IMovieDetail, index) => {
        // last element
        if (moviesResults.length === index + 1) {
            return (
                <ProductCard
                    key={movie.id}
                    ref={lastElementRef}
                    productType="movie"
                    productId={movie.id}
                    productTitle={movie.title}
                    productPosterPath={movie.poster_path}
                    productVoteAverage={movie.vote_average}
                />
            )
        }

        return (
            <ProductCard
                key={movie.id}
                productType="movie"
                productId={movie.id}
                productTitle={movie.title}
                productPosterPath={movie.poster_path}
                productVoteAverage={movie.vote_average}
            />
        )
    })

    return (
        <Grid
            container
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            p={3}
            item
            xs={11}
            mb={{ xs: '10vh', md: 4 }}
            className="paper"
        >
            <div className="category-title">
                <h2>Trending Movies</h2>
            </div>
            {isError ? <p>{error.message}</p> : null}

            <Grid
                container
                justifyContent={{ xs: 'center', md: 'space-between' }}
                flexDirection="row"
                alignItems="center"
                flexWrap="wrap"
                width="100%"
            >
                {moviesContent}
                {/* Avoiding to jump back to the after loading new items */}
                {isLoading ? <Spinner /> : null}
            </Grid>
        </Grid>
    )
}

export default TrendingMovies
