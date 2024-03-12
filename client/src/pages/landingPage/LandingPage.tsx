import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import URL from '../../api/routes'
import './landingPage.scss'

const LandingPage = () => {
    return (
        <div className="landing-page-wrapper">
            <div className="background-container"></div>
            <Grid container className="landing-page">
                <Grid
                    item
                    xs={12}
                    className="landing-page__banner"
                    pl={{ xs: 1, md: 3, lg: 5 }}
                    pr={{ xs: 1, md: 3, lg: 5 }}
                >
                    <div className="landing-page__banner__tomflix">
                        <h1>TomFlix</h1>
                    </div>
                    <div className="landing-page__banner__signin">
                        <Link className="link" to="/login">
                            <button>Sign In</button>
                        </Link>
                    </div>
                </Grid>
                <Grid item xs={10} md={8} lg={6} className="landing-page__container">
                    <div>
                        <h2>Watch movies and tv-shows trailers at anytime wherever you are</h2>
                        <p>Ready to start the adventure</p>
                        <Link to={URL.register}>
                            <button>Let's start</button>
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default LandingPage
