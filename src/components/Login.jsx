import { useState } from 'react';
import { withStyles } from '@mui/styles';

import { handleSignIn } from '../redux/actions/auth';

import { connect } from "react-redux"

import {
  Box,
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
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4)
  }
})

const Login = props => {
  const { classes, onHandleSignIn } = props;
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const changeUsername = e => setUsername(e.target.value);
  const changePassword = e => setPassword(e.target.value);

  const signIn = async e => {
    e.preventDefault();
    try {
      onHandleSignIn(username, password);
    } catch (e) {
      console.log(e, e?.response?.message)
    }
  }

  return (
    <form onSubmit={signIn}>
      <Box className={classes.root}>
        <TextField
          label="Username"
          variant="outlined"
          onChange={changeUsername}
          required
          InputProps={{
            'autoComplete': 'username'
          }}
        />
        <TextField
          label="Password"
          type={passwordVisible ? 'text' : 'password'}
          variant="outlined"
          onChange={changePassword}
          required
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={e => setPasswordVisible(!passwordVisible)}
                edge="end"
                tabIndex={-1}
              >
                {passwordVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>,
            'autoComplete': 'current-password'
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Login
        </Button>
      </Box>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    ...state
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onHandleSignIn: (username, password) => dispatch(handleSignIn(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));