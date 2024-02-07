import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import './handleSearch.scss'

const HandleSearch = () => {
    const [title, setTitle] = useState<string>('')
    const [productType, setProductType] = useState<string>('movie')
    const [isTitleSelected, setIsTitleSelected] = useState<boolean>(false)
    const [isTypeSelected, setIsTypeSelected] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()

        navigate(`/search?query=${title}&type=${productType}`)
    }

    return (
        <Grid
            container
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            p={3}
            mb={2}
            className="search"
        >
            <Grid item xs={12} sm={8} md={6} lg={5}>
                <form
                    onSubmit={handleSearch}
                    className={`search-form ${
                        isTitleSelected || isTypeSelected ? 'background' : null
                    }`}
                >
                    <select
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        onFocus={() => setIsTypeSelected(true)}
                        onBlur={() => setIsTypeSelected(false)}
                        className="search-input select"
                    >
                        <option value="movie">Movie</option>
                        <option value="tv">TV-Show</option>
                    </select>
                    {!isTitleSelected && !isTypeSelected ? (
                        <div className="search-vl"></div>
                    ) : null}

                    <input
                        type="text"
                        placeholder="Search for movies or TV-shows"
                        className={`search-input ${
                            isTypeSelected ? 'typeSelected' : ''
                        }`}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={() => setIsTitleSelected(true)}
                        onBlur={() => setIsTitleSelected(false)}
                    />

                    <button
                        disabled={!title}
                        onClick={handleSearch}
                        className="search-button"
                    >
                        <SearchIcon />
                    </button>
                </form>
            </Grid>
        </Grid>
    )
}

export default HandleSearch
