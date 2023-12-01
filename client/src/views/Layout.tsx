import React from "react"
import { Outlet } from "react-router-dom"
import NavBar from "../components/navBar/NavBar"
import Footer from "../components/footer/Footer"

const Layout = () => {
  return (
    <>
      <header className="header">
        <NavBar />
      </header>
      <main className="App">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
