import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#393e46',
                        backgroundColor: '#ffd369',
                        opacity: 0.7,
                    },

                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: '#222831',
                            backgroundColor: '#ffd369',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#ffd369',
                            backgroundColor: 'transparent',
                        },
                        // '&.MuiFilledInput': {
                        //     '&:not(.Mui-focused)': {
                        //         '& input': {
                        //             color: 'red', // Change this to your text color after fill and not focused
                        //         },
                        //     },
                        // },

                        '&.Mui-disabled': {
                            borderColor: '#222831',
                            backgroundColor: 'grey',
                            opacity: 0.8,
                        },
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#393e46',
                    '&.Mui-focused': {
                        color: '#ffd369',
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    color: 'green',
                },
            },
        },
    },
})

export default theme
