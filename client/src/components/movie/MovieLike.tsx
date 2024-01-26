import React, { useState, useEffect } from 'react'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import useInterceptorAxios from '../../hooks/useInterceptorAxios'
import './movieLike.scss'
import ILikes from '../../interfaces/ILikes'
import useAuth from '../../hooks/useAuth'

interface Props {
    productId: number
}

const MovieLike: React.FC<Props> = ({ productId }) => {
    const [isLikeUpdated, setIsLikeUpdated] = useState<boolean>(false)
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const { auth } = useAuth()
    const interceptorAxios = useInterceptorAxios()

    const productKind = 'movie'

    const getMovieslikes = async () => {
        try {
            const response = await interceptorAxios.get(
                `/users/${auth.id}/likes`,
            )

            checkLikes(response.data.result)
        } catch (error: any) {
            console.error(error.message)
        }
    }

    const updateMoviesLikes = async () => {
        try {
            const response = await interceptorAxios.patch(
                `/users/${auth.id}/likes`,
                JSON.stringify({ movieLike: productId }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            )
            checkLikes(response.data.result)
            setIsLikeUpdated((prev) => !prev)
        } catch (error: any) {
            console.error(error.message)
        }
    }

    const checkLikes = (likes: ILikes) => {
        if (productKind === 'movie') {
            setIsLiked(
                likes.movies != null ? likes.movies.includes(productId) : false,
            )
        } else {
            setIsLiked(
                likes.series != null ? likes.series.includes(productId) : false,
            )
        }
    }

    useEffect(() => {
        console.log('useEffect on')
        getMovieslikes()
    }, [isLikeUpdated])

    return (
        <div className="like">
            {isLiked ? (
                <FavoriteOutlinedIcon
                    className="like-icon"
                    onClick={updateMoviesLikes}
                />
            ) : (
                <FavoriteBorderOutlinedIcon
                    className="like-icon"
                    onClick={updateMoviesLikes}
                />
            )}
        </div>
    )
}

export default MovieLike
