import React from 'react'
import ProductsTypeRow from '../productsTypeRow/ProductsTypeRow'
import { ProductType } from '../../../types'
import { getTrendingUrl } from '../../../api/tmdbAxios'

interface Props {
    productType: ProductType
}

const Trending: React.FC<Props> = ({ productType }) => {
    const title = productType === 'movie' ? 'Trending Movies' : 'Trending Tv-Show'
    const trendingUrl = getTrendingUrl(productType)

    console.log(trendingUrl)

    return <ProductsTypeRow productsTypeName={title} productsTypeApiUrl={trendingUrl} productType={productType} />
}

export default Trending
