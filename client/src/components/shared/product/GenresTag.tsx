import React from 'react'
import './genresTag.scss'

interface Props {
    genreName: string
}

const GenresTag: React.FC<Props> = ({ genreName }) => {
    return (
        <div>
            <p className="movieGenre">{genreName}</p>
        </div>
    )
}

export default GenresTag
