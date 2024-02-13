import { useState, useEffect } from 'react'
import IMovieDetail from '../interfaces/IMovieData'
import { getMoviesSearch, getTvShowsSearch } from '../api/tmdbAxios'
import ITvShowDetail from '../interfaces/ITvShowDetail'
import { ProductType } from '../types'

const usePosts = (
    query: string,
    type: ProductType,
): {
    moviesResults: IMovieDetail[]
    tvShowsResults: ITvShowDetail[]
    isLoading: boolean
    isError: boolean
    error: { message?: string }
    hasNextPage: boolean
    setPageNum: React.Dispatch<React.SetStateAction<number>>
} => {
    const [moviesResults, setMoviesResults] = useState<IMovieDetail[]>([])
    const [tvShowsResults, setTvShowsResults] = useState<ITvShowDetail[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<{ message?: string }>({})
    const [hasNextPage, setHasNextPage] = useState<boolean>(false)
    const [pageNum, setPageNum] = useState<number>(1)

    // clear movies or tvShows results if query or type changes
    useEffect(() => {
        setPageNum(1)
        setMoviesResults([])
        setTvShowsResults([])
    }, [query, type])

    // fetch Movies
    const fetchMovies = async (signal: AbortSignal) => {
        const data: { results: IMovieDetail[] } = await getMoviesSearch(pageNum, query, { signal })
        const results: IMovieDetail[] = data.results.filter((e: IMovieDetail) => e.poster_path !== null)
        setMoviesResults((prev) => {
            if (prev.length === 0) {
                return results
            } else {
                return [...prev, ...results]
            }
        })
        setHasNextPage(Boolean(data.results.length))
        setIsLoading(false)
    }

    // fetch Tv-shows
    const fetchTvShows = async (signal: AbortSignal) => {
        const data: { results: ITvShowDetail[] } = await getTvShowsSearch(pageNum, query, { signal })
        const results: ITvShowDetail[] = data.results.filter((e: ITvShowDetail) => e.poster_path !== null)
        setTvShowsResults((prev) => {
            if (prev.length === 0) {
                return results
            } else {
                return [...prev, ...results]
            }
        })
        setHasNextPage(Boolean(data.results.length))
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError({})

        const controller = new AbortController()
        const { signal } = controller

        const fetchData = async () => {
            try {
                type === 'movie' ? fetchMovies(signal) : fetchTvShows(signal)
            } catch (error: any) {
                setIsLoading(false)
                if (signal.aborted) {
                    return
                }
                setIsError(true)
                setError({ message: error.message })
            }
        }

        fetchData()

        return () => {
            controller.abort()
        }
    }, [pageNum, query, type])

    return { moviesResults, tvShowsResults, isLoading, isError, error, hasNextPage, setPageNum }
}

export default usePosts
