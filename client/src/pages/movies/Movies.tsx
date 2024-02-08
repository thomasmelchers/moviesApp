import { Grid } from '@mui/material'
import useTMDBApiGenres from '../../hooks/useTMDBApiGenres'
import Spinner from '../../components/shared/spinner/Spinner'
import ProductsTypeRow from '../../components/shared/productsTypeRow/ProductsTypeRow'

const Movies = () => {
    const productType = 'movie'

    const { loading, error, listOfSelectedGenres } = useTMDBApiGenres(
        productType,
        5,
    )

    const rowsOfMovies = listOfSelectedGenres?.map((genre) => (
        <ProductsTypeRow
            key={genre.name}
            productsTypeName={genre.name}
            productsTypeApiUrl={genre.url}
            productsTypeGenreId={genre.id}
            productType={productType}
        />
    ))

    return (
        <Grid
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mb={{ xs: '10vh', md: 0 }}
        >
            {error ? <p>{error}</p> : null}
            {loading && !error ? <Spinner /> : rowsOfMovies}
        </Grid>
    )
}

export default Movies
