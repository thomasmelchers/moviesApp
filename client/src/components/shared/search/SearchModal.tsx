import React from 'react'
import { Modal, Grid } from '@mui/material'
import './searchModal.scss'
import HandleSearch from './HandleSearch'

interface Props {
    open: boolean
    onClose: () => void
}

const SearchModal: React.FC<Props> = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose} className="modal">
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                item
                xs={10}
                md={8}
                className="search_modal"
            >
                <HandleSearch closeModalHandling={onClose} />
            </Grid>
        </Modal>
    )
}

export default SearchModal
