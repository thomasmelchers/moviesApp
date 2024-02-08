import { useState, useEffect } from 'react'
import useInterceptorAxios from './useInterceptorAxios'
import useAuth from './useAuth'
import ILikes from '../interfaces/ILikes'

const useGetLikes = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [likes, setLikes] = useState<ILikes>()

    const { auth } = useAuth()
    const interceptorAxios = useInterceptorAxios()

    useEffect(() => {
        const fecthUserLikes = async () => {
            try {
                const response = await interceptorAxios.get(
                    `/users/${auth.id}/likes`,
                )
                setLikes(response.data.result)
            } catch (error: any) {
                console.error(error.message)
                setError(error.message)
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }

        fecthUserLikes()
    }, [])

    return { loading, error, likes }
}
export default useGetLikes
