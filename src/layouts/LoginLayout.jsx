import { useState } from 'react';
import { Box } from "@mui/system";
import { withStyles } from '@mui/styles';

import {
  Typography,
  Paper,
  Button,
  TextField,
  IconButton,
  InputAdornment 
} from "@mui/material";

import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

const styles = theme => ({
  root: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: `url(${process.env.PUBLIC_URL + 'assets/login1.jpg'})`, // https://unsplash.com/@aaronburden
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
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4)
  }
})

const LoginLayout = props => {
  const { classes } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Box className={classes.root}>
      <div className={classes.wrapper}>
        <Typography variant="h1" mb={5}><b>wee</b>xam</Typography>
        <Paper elevation={6} className={classes.paper}>

            <Box className={classes.formBox}>
              <TextField
                label="Login"
                variant="outlined"
              />
              <TextField
                label="Password"
                type={passwordVisible ? 'text' : 'password'}
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={e => setPasswordVisible(!passwordVisible)}
                      edge="end"
                    >
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }}
              />
              <Button fullWidth variant="contained">Login</Button>
            </Box>

        </Paper>
      </div>
    </Box>
  )
}

export default withStyles(styles)(LoginLayout);