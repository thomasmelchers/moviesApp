import React from 'react'
import { Grid } from '@mui/material'
import Spinner from '../../components/shared/spinner/Spinner'
import useTMDBApiGenres from '../../hooks/useTMDBApiGenres'
import ProductsTypeRow from '../../components/shared/productsTypeRow/ProductsTypeRow'
import IProductGenres from '../../interfaces/IProductsGenres'
import { ProductType } from '../../types'

interface IFormattedGenres {
    id: number
    name: string
    url: string
    productType: ProductType
}

const Home = () => {
    const {
        loading,
        error,
        listOfSelectedGenres: genresMovieSelected,
    } = useTMDBApiGenres('movie', 3)

    const {
        loading: tvShowLoading,
        error: tvShowError,
        listOfSelectedGenres: genresTvShowSelected,
    } = useTMDBApiGenres('tv', 3)

    const getGenres = (
        genresSelected: IProductGenres[],
        productType: ProductType,
    ) => {
        const formattedGenres = genresSelected.map((genre) => ({
            id: genre.id,
            name: genre.name,
            url: genre.url,
            productType: productType,
        }))

        return formattedGenres
    }

    const formattedGenresMovie: IFormattedGenres[] = getGenres(
        genresMovieSelected,
        'movie',
    )

    const formattedGenresTvShow: IFormattedGenres[] = getGenres(
        genresTvShowSelected,
        'tv',
    )

    const productsGenres = formattedGenresMovie.concat(formattedGenresTvShow)
    const shuffledProductGenres = productsGenres.sort(() => Math.random() - 0.5)

    const rowsOfMovies = shuffledProductGenres?.map((genre) => (
        <ProductsTypeRow
            key={genre.name}
            productsTypeName={genre.name}
            productsTypeApiUrl={genre.url}
            productsTypeGenreId={genre.id}
            productType={genre.productType}
        />
    ))

    return (
        <Grid
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            {error ? <p>{error}</p> : null}
            {loading && !error ? <Spinner /> : rowsOfMovies}
        </Grid>
    )
}

export default Home
