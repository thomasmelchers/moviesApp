import { Grid } from '@mui/material'
import useTMDBApiSelectedGenres from '../../hooks/useTMDBApiSelectedGenres'
import Spinner from '../../components/shared/spinner/Spinner'
import ProductsTypeRow from '../../components/shared/productsTypeRow/ProductsTypeRow'
import Filters from '../../components/shared/filters/Filters'
import Trending from '../../components/shared/trending/Trending'

const Movies = () => {
    const productType = 'movie'

    const { loading, error, listOfSelectedGenres } = useTMDBApiSelectedGenres(productType, 5)

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
        <Grid container flexDirection="column" justifyContent="center" alignItems="center" mb={{ xs: '10vh', md: 0 }}>
            {error ? <p>{error}</p> : null}
            {loading && !error ? (
                <Spinner />
            ) : (
                <>
                    <Filters productType={productType} />
                    <Trending productType={productType} />
                    {rowsOfMovies}
                </>
            )}
        </Grid>
    )
}

export default Movies
