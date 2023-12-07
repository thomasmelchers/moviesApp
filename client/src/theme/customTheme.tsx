import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    components: {
        // MuiTextField: {
        //     styleOverrides: {
        //         root: {
        // color: 'black',
        // backgroundColor: ' rgba(255,211,105)',
        // '&:before, &:after': {},

        // '& .MuiOutlinedInput-notchedOutline': {
        //     borderColor: '#393e46',
        //     backgroundColor: ' rgba(255,211,105)',
        // },

        // '& .MuiOutlinedInput-root': {
        //     '&:hover fieldset': {
        //         borderColor: '#222831',
        //         // backgroundColor: '#ffd369',
        //     },
        //     '&.Mui-focused fieldset': {
        //         borderColor: '#ffd369',
        //         backgroundColor: 'transparent',
        //     },
        // '&.MuiFilledInput': {
        //     '&:not(.Mui-focused)': {
        //         '& input': {
        //             color: 'red', // Change this to your text color after fill and not focused
        //         },
        //     },
        // },

        // '&.Mui-disabled': {
        //     borderColor: '#222831',
        //     backgroundColor: 'grey',
        //     opacity: 0.8,
        // },
        //             },
        //         },
        //     },
        // },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#393e46',
                    '&.Mui-focused': {
                        color: '#393e46',
                    },
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    color: '#393e46',
                    backgroundColor: 'rgba(255,211,105,0.7)',
                    borderRadius: '10px 10px 0 0',
                    '&:before, &:after': {
                        // borderBottom: '2px solid #393e46',
                        borderBottom: '2px solid #5D6573',
                    },
                    '&:hover': {
                        backgroundColor: 'rgb(255,211,105)',
                    },

                    '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: '3px solid #FFA07A',
                    },
                    '&.Mui-focused': {
                        backgroundColor: 'rgb(255,211,105)',
                    },
                    '&.Mui-focused:after': {
                        borderBottom: '3px solid #FFA07A',
                    },
                },
            },
        },
    },
})

export default theme
