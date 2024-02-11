import React from 'react'
import { Link } from 'react-router-dom'
import { ProductType } from '../../../types'
import './filter.scss'

interface Props {
    name: string
    genreId: number
    productType: ProductType
}

const Filter: React.FC<Props> = ({ name, genreId, productType }) => {
    // Handling Sci-Fi & Fantasy genre link issue
    name = productType === 'tv' && genreId === 10765 ? 'Sci Fi & Fantasy' : name

    const link =
        productType === 'movie'
            ? `/movies/${name}-${String(genreId)}`
            : `/tv-shows/${name}-${String(genreId)}`

    return (
        <div className="filter">
            <Link to={link}>
                <button>{name}</button>
            </Link>
        </div>
    )
}

export default Filter
