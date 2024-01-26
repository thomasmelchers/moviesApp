import React, { useState, useEffect } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import axios from 'axios'
import CONSTANTES from '../../utils/constantes'
import './youtubeTrailer.scss'

interface Props {
    id: string | undefined
}

const YoutubeTrailer: React.FC<Props> = ({ id }) => {
    const [video, setVideo] = useState<any | null>({})

    const fetchVideo = async () => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${CONSTANTES.TMDB_API_KEY}`,
        )

        const videoKey = response.data.results.find(
            (object: any) => object.type === 'Teaser',
        )
        setVideo(videoKey)
    }

    useEffect(() => {
        fetchVideo()
    }, [id])

    const embedUrl = `https://www.youtube.com/embed/${String(video?.key)}`

    // const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    //     // access to player in all event handlers via event.target
    //     event.target.pauseVideo()
    // }

    // const opts = {
    //     // height: 'auto',
    //     // width: '100%',
    //     playerVars: {
    //         // https://developers.google.com/youtube/player_parameters
    //         autoplay: 1,
    //         origin: 'http://localhost:3000',
    //     },
    // }
    return (
        // <YouTube
        //     videoId={String(video?.key)}
        //     opts={opts}
        //     onReady={onPlayerReady}
        //     style={{ width: '100%', height: 'auto' }}
        // />
        <iframe
            title="YouTube Video"
            // width="100%"
            // height="100%"
            src={embedUrl}
            frameBorder="0"
            allowFullScreen
        ></iframe>
    )
}

export default YoutubeTrailer
