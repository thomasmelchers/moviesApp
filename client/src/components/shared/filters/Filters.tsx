import React from 'react'
import useGenres from '../../../hooks/useGenres'
import { ProductType } from '../../../types'
import { Grid } from '@mui/material'
import Filter from './Filter'

interface Props {
    productType: ProductType
}

const Filters: React.FC<Props> = ({ productType }) => {
    const { genres, error } = useGenres(productType)

    console.log(genres)

    return (
        <Grid
            container
            flexDirection="row"
            justifyContent="center"
            item
            xs={11}
            mb={2}
        >
            {genres
                ? genres.map((genre, index) => (
                      <Filter
                          key={index}
                          name={genre.name}
                          genreId={genre.id}
                          productType={productType}
                      />
                  ))
                : null}
        </Grid>
    )
}

export default Filters
