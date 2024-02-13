import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import customTheme from './theme/customTheme'
import { ThemeProvider } from '@mui/material/styles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    // <React.StrictMode>
    <ThemeProvider theme={customTheme}>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </ThemeProvider>,
    // </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
