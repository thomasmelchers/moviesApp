import React from 'react'
import './genres.scss'

interface Props {
    genreName: string
}

const Genres: React.FC<Props> = ({ genreName }) => {
    return (
        <div>
            <p className="movieGenre">{genreName}</p>
        </div>
    )
}

export default Genres
