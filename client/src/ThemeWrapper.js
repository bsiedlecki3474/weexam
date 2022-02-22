import { connect } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red, green, indigo } from '@mui/material/colors';
import { Snackbar } from './components'

import Router from './router/Router.js'

const browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const ThemeWrapper = props => {
  const userTheme = props.theme ?? browserTheme;
  const theme = createTheme({
    palette: {
      mode: userTheme,
      primary: {
        main: userTheme === 'light' ? green[700] : green[500],
      },
      secondary: {
        main: userTheme === 'light' ? indigo[800] : indigo[300],
      },
    },
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: red[500],
            fontWeight: 600
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Router />
      <Snackbar />
    </ThemeProvider> 
  )
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  }
}

export default connect(mapStateToProps)(ThemeWrapper);
