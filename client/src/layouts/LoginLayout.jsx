import { withStyles } from '@mui/styles';

import {
  Box,
  Typography,
  Paper
} from "@mui/material";

import Login from '../components/Login'
import login1 from '../assets/login1.jpg'

const styles = theme => ({
  root: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: `url(${login1})`, // https://unsplash.com/@aaronburden
    '&::before': {
      content: "''",
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      opacity: .3,
      backgroundColor: '#fff'
    }
  },
  wrapper: {
    position: 'relative',
  },
  paper: {
    padding: theme.spacing(4, 2)
  }
})

const LoginLayout = props => {
  const { classes } = props;

  return (
    <Box className={classes.root}>
      <div className={classes.wrapper}>
        <Typography variant="h1" mb={5}><b>wee</b>xam</Typography>
        <Paper elevation={6} className={classes.paper}>
          <Login />
        </Paper>
      </div>
    </Box>
  )
}

export default withStyles(styles)(LoginLayout);