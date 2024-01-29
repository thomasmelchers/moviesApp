import React from 'react'
import { ProductType } from '../../../types'
import './productInfo.scss'

interface Props {
    productType: ProductType
    productionCompanyName: string
    orginalLanguage: string
    status: string
    releaseDate?: string
    nbOfSeasons?: number
    nbOfEpisodes?: number
    firstEpisodeRelease?: string
}

const ProductInfo: React.FC<Props> = ({
    productType,
    productionCompanyName,
    status,
    orginalLanguage,
    releaseDate,
    nbOfSeasons,
    nbOfEpisodes,
    firstEpisodeRelease,
}) => {
    return (
        <div>
            {productType === 'movie' ? (
                <p className="movie-info__title">
                    Release Date:{' '}
                    <span className="movie-info__value">{releaseDate}</span>
                </p>
            ) : null}
            <p className="movie-info__title">
                Production Company:{' '}
                <span className="movie-info__value">
                    {productionCompanyName}{' '}
                </span>
            </p>
            <p className="movie-info__title">
                Version Original:
                <span className="movie-info__value">{orginalLanguage}</span>
            </p>
            <p className="movie-info__title">
                Status:
                <span className="movie-info__value">{status}</span>
            </p>

            {productType === 'tv' ? (
                <>
                    <p className="movie-info__title">
                        Nb of Seasons:
                        <span className="movie-info__value">{nbOfSeasons}</span>
                    </p>

                    <p className="movie-info__title">
                        Nb of Episodes:
                        <span className="movie-info__value">
                            {nbOfEpisodes}
                        </span>
                    </p>
                    <p className="movie-info__title">
                        First Episode Release:
                        <span className="movie-info__value">
                            {firstEpisodeRelease}
                        </span>
                    </p>
                </>
            ) : null}
        </div>
    )
}

export default ProductInfo
