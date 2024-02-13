import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid } from '@mui/material'
import { ProductType } from '../../types'
import ITvShowDetail from '../../interfaces/ITvShowDetail'
import IMovieDetail from '../../interfaces/IMovieData'
import Spinner from '../../components/shared/spinner/Spinner'
import useSearchMovies from '../../hooks/useSearchMovies'
import ProductCard from '../../components/shared/productCard/ProductCard'
import './search.scss'

const Search = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const initialQuery = queryParams.get('query') || ''
    const type = (queryParams.get('type') as ProductType) || 'movie'

    const { isLoading, isError, error, moviesResults, tvShowsResults, hasNextPage, setPageNum } = useSearchMovies(
        initialQuery,
        type,
    )

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
        [isLoading, hasNextPage],
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

    const content = type === 'movie' ? moviesContent : tvShowsContent
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
            <div className="search__title">
                <h2>{initialQuery}</h2>
            </div>
            {isError ? <p>{error?.message}</p> : null}

            <Grid
                container
                justifyContent={{ xs: 'center', md: 'space-between' }}
                flexDirection="row"
                alignItems="center"
                flexWrap="wrap"
                width="100%"
            >
                {content}
                {isLoading ? <Spinner /> : null}
            </Grid>
        </Grid>
    )
}

export default Search
