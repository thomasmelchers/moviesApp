import React, { useState, useEffect } from 'react'
import CONSTANTES from '../../../utils/constantes'
import axios from 'axios'
import './youtubeTrailer.scss'
import { ProductType } from '../../../types'

interface Props {
    id: string | undefined
    productType: ProductType
}

const YoutubeTrailer: React.FC<Props> = ({ id, productType }) => {
    const [video, setVideo] = useState<any | null>({})

    const fetchVideo = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/${productType}/${id}/videos?api_key=${CONSTANTES.TMDB_API_KEY}`,
            )

            const videoKey = response.data.results.find(
                (object: any) =>
                    object.type === 'Teaser' || object.type === 'Trailer',
            )
            setVideo(videoKey)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchVideo()
    }, [id])

    const embedUrl = `https://www.youtube.com/embed/${String(video?.key)}`

    return (
        <>
            {video ? (
                <iframe
                    title="YouTube Video"
                    src={embedUrl}
                    allowFullScreen
                ></iframe>
            ) : (
                <p>Sorry there is no trailer to display for this selection</p>
            )}
        </>
    )
}

export default YoutubeTrailer
