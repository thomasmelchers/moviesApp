import React from 'react'
import { Grid } from '@mui/material'
import Spinner from '../../components/shared/spinner/Spinner'
import useTMDBApiSelectedGenres from '../../hooks/useTMDBApiSelectedGenres'
import ProductsTypeRow from '../../components/shared/productsTypeRow/ProductsTypeRow'
import IProductGenres from '../../interfaces/IProductsGenres'
import { ProductType } from '../../types'
import HandleSearch from '../../components/shared/search/HandleSearch'

interface IFormattedGenres {
    id: number
    name: string
    url: string
    productType: ProductType
}

const Home = () => {
    const { loading, error, listOfSelectedGenres: genresMovieSelected } = useTMDBApiSelectedGenres('movie', 3)

    const {
        loading: tvShowLoading,
        error: tvShowError,
        listOfSelectedGenres: genresTvShowSelected,
    } = useTMDBApiSelectedGenres('tv', 3)

    const getGenres = (genresSelected: IProductGenres[], productType: ProductType) => {
        const formattedGenres = genresSelected.map((genre) => ({
            id: genre.id,
            name: genre.name,
            url: genre.url,
            productType: productType,
        }))

        return formattedGenres
    }

    const formattedGenresMovie: IFormattedGenres[] = getGenres(genresMovieSelected, 'movie')

    const formattedGenresTvShow: IFormattedGenres[] = getGenres(genresTvShowSelected, 'tv')

    const productsGenres = formattedGenresMovie.concat(formattedGenresTvShow)
    const shuffledProductGenres = productsGenres.sort(() => Math.random() - 0.5)

    const rowsOfMovies = shuffledProductGenres?.map((genre) => (
        <ProductsTypeRow
            key={genre.url}
            productsTypeName={genre.name}
            productsTypeApiUrl={genre.url}
            productsTypeGenreId={genre.id}
            productType={genre.productType}
        />
    ))

    return (
        <Grid container flexDirection="column" justifyContent="center" alignItems="center" pb={{ xs: '10vh', md: 0 }}>
            <Grid
                container
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                p={3}
                mb={2}
                className="search"
            >
                <Grid item xs={12} sm={8} md={6} lg={5}>
                    <HandleSearch />
                </Grid>
            </Grid>
            {error || tvShowError ? <p>{error || tvShowError}</p> : null}
            {loading && tvShowLoading && !error && !tvShowError ? <Spinner /> : rowsOfMovies}
        </Grid>
    )
}

export default Home
