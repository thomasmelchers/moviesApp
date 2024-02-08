import React from 'react'
import './genresTag.scss'

interface Props {
    genreName: string
    index: number
}

const GenresTag: React.FC<Props> = ({ genreName, index }) => {
    return (
        <div>
            <p className={`movieGenre ${index >= 3 ? 'extra-margin-top' : ''}`}>
                {genreName}
            </p>
        </div>
    )
}

export default GenresTag
