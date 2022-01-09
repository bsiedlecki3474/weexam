import { connect } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

import Router from './router/Router.js'

const ThemeWrapper = props => {
  const theme = createTheme({
    palette: {
      mode: props.theme,
      primary: {
        main: green[600],
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
