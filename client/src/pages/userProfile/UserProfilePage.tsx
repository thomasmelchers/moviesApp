import React from 'react'
import { Grid } from '@mui/material'
import './userProfilePage.scss'

const UserProfilePage = () => {
    return (
        <Grid
            container
            flexDirection="column"
            item
            xs={10}
            md={6}
            lg={4}
            p={3}
            className="container__profile"
        >
            <section>profile</section>
        </Grid>
    )
}

export default UserProfilePage
