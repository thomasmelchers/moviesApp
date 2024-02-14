import React, { useRef, useCallback } from 'react'
import { Grid } from '@mui/material'
import Spinner from '../../components/shared/spinner/Spinner'
import useTrendings from '../../hooks/useTrendings'
import ITvShowDetail from '../../interfaces/ITvShowDetail'
import ProductCard from '../../components/shared/productCard/ProductCard'

const TrendingTvShows = () => {
    const { tvShowsResults, isLoading, isError, error, hasNextPage, setPageNum } = useTrendings('tv')

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

    const tvShowsContent = tvShowsResults.map((tvShow: ITvShowDetail, index) => {
        // last element
        if (tvShowsResults.length === index + 1) {
            return (
                <ProductCard
                    key={tvShow.id}
                    ref={lastElementRef}
                    productType="tv"
                    productId={tvShow.id}
                    productTitle={tvShow.name}
                    productPosterPath={tvShow.poster_path}
                    productVoteAverage={tvShow.vote_average}
                />
            )
        }

        return (
            <ProductCard
                key={tvShow.id}
                productType="tv"
                productId={tvShow.id}
                productTitle={tvShow.name}
                productPosterPath={tvShow.poster_path}
                productVoteAverage={tvShow.vote_average}
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
                <h2>Trending Tv-Shows</h2>
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
                {tvShowsContent}
                {isLoading ? <Spinner /> : null}
            </Grid>
        </Grid>
    )
}

export default TrendingTvShows
