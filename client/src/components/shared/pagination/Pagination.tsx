import React from 'react'
import { Grid } from '@mui/material'
import './pagination.scss'

interface Props {
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    previousPage: () => void
    nextPage: () => void
}

const Pagination: React.FC<Props> = ({ page, setPage, previousPage, nextPage }) => {
    return (
        <nav>
            <button
                onClick={previousPage}
                disabled={page === 1}
                className="pagination__next-prev-button pagination__button pagination__prev-button"
            >
                Prev
            </button>

            {page - 2 >= 1 ? (
                <button
                    className="pagination__button pagination__not-show"
                    onClick={() => {
                        setPage((prev) => prev - 2)
                    }}
                >
                    {page - 2}
                </button>
            ) : null}

            {page - 1 >= 1 ? (
                <button
                    className="pagination__button pagination__not-show"
                    onClick={() => {
                        setPage((prev) => prev - 1)
                    }}
                >
                    {page - 1}
                </button>
            ) : null}

            <button className="pagination__current-page pagination__button">{page}</button>

            {page + 1 <= 500 ? (
                <button
                    className="pagination__button pagination__not-show"
                    onClick={() => {
                        setPage((prev) => prev + 1)
                    }}
                >
                    {page + 1}
                </button>
            ) : null}

            {page + 2 <= 500 ? (
                <button
                    className="pagination__button pagination__not-show"
                    onClick={() => {
                        setPage((prev) => prev + 2)
                    }}
                >
                    {page + 2}
                </button>
            ) : null}

            <button onClick={nextPage} disabled={page === 500} className="pagination__next-prev-button">
                Next
            </button>
        </nav>
    )
}

export default Pagination
