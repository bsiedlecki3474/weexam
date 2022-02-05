import { connect } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green, indigo } from '@mui/material/colors';

import Router from './router/Router.js'

const browserTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

console.log(browserTheme)

const ThemeWrapper = props => {
  const theme = createTheme({
    palette: {
      mode: props.theme ?? (browserTheme ?? 'dark'),
      primary: {
        main: props.theme === 'light' ? green[700] : green[500],
      },
      secondary: {
        main: props.theme === 'light' ? indigo[800] : indigo[300],
      },
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider> 
  )
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  }
}

export default connect(mapStateToProps)(ThemeWrapper);
