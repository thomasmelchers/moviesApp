import { Link } from "react-router-dom"
import { Grid } from "@mui/material"

const LandingPage = () => {
  return (
    <Grid container className="landing-page">
      <Grid
        item
        xs={12}
        className="landing-page__banner"
        pl={{ xs: 1, md: 3, lg: 5 }}
        pr={{ xs: 1, md: 3, lg: 5 }}
      >
        <div className="landing-page__banner__tomflix">
          <p>TomFlix</p>
        </div>
        <div className="landing-page__banner__signin">
          <Link className="link" to="/logn">
            <button>Sign In</button>
          </Link>
        </div>
      </Grid>
      <Grid item xs={10} md={8} lg={6} className="landing-page__container">
        <div>
          <h1>Watch Movies and Series at anytime wherever you are</h1>
          <p>Ready to start the adventure</p>
          <Link className="link register-link" to="/register">
            <button>Let's start</button>
          </Link>
        </div>
      </Grid>
    </Grid>
  )
}

export default LandingPage
