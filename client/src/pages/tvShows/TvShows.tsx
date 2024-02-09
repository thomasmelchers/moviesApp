import { Grid } from '@mui/material'
import useTMDBApiGenres from '../../hooks/useTMDBApiGenres'
import ProductsTypeRow from '../../components/shared/productsTypeRow/ProductsTypeRow'
import Spinner from '../../components/shared/spinner/Spinner'
import Filters from '../../components/shared/filters/Filters'
import './tvShows.scss'

const TvShows = () => {
    const productType = 'tv'

    const { loading, error, listOfSelectedGenres } = useTMDBApiGenres(
        productType,
        5,
    )

    const rowOfSeries = listOfSelectedGenres?.map((genre) => (
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
            {loading && !error ? (
                <Spinner />
            ) : (
                <>
                    <Filters productType={productType} />
                    {rowOfSeries}
                </>
            )}
        </Grid>
    )
}

export default TvShows
