import { useRef, useState, useMemo } from 'react';
import { withStyles } from '@mui/styles';
import { connect } from "react-redux"

import {
  Box,
  Typography,
  Paper,
  Button,
  // TextField,
  IconButton,
  InputAdornment
} from "@mui/material";

import { TextField } from './form'

import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

import lang from '../lang'
import { useLocalStorage } from '../hooks';

import { handleSignIn } from '../redux/actions/auth';
import { showSnackbar } from '../redux/actions/snackbar'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // gap: theme.spacing(4)
  },
  loginButton: {
    marginTop: `${theme.spacing(4)} !important`
  }
})

const Login = props => {
  const { classes, onHandleSignIn } = props;
  const [username, setUsername] = useLocalStorage('username');
  const [password, setPassword] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const formRef = useRef()

  const changeUsername = e => setUsername(e.target.value);
  const changePassword = e => setPassword(e.target.value);

  const checkFormValidity = () => formRef.current.checkValidity();

  const signIn = async e => {
    e.preventDefault();
    const { showSnackbar } = props;
    setShowErrors(true);
    if (checkFormValidity()) {
      await onHandleSignIn(username, password)
    } else {
      showSnackbar({
        message: lang.main.validation.fillAllRequired,
        severity: 'error'
      })
    }
  }

  return (
    <form ref={formRef} onSubmit={signIn}>
      <Box className={classes.root}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          handleChange={changeUsername}
          required
          error={showErrors && !username}
          helperText={lang.main.validation.empty}
          InputProps={{
            'autoComplete': 'username'
          }}
        />
        <TextField
          label="Password"
          type={passwordVisible ? 'text' : 'password'}
          variant="outlined"
          value={password}
          handleChange={changePassword}
          required
          error={showErrors && !password}
          helperText={lang.main.validation.empty}
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
          className={classes.loginButton}
          onClick={signIn}
          fullWidth
          variant="contained"
        >
          Login
        </Button>
      </Box>
    </form>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onHandleSignIn: (username, password) => dispatch(handleSignIn(username, password)),
    showSnackbar: data => dispatch(showSnackbar(data))
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Login));