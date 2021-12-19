import { useState } from 'react';
import { useMutation } from 'react-query';
import { withStyles } from '@mui/styles';
import axios from '../axios/axios';

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
  const { classes } = props;
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const changeUsername = e => setUsername(e.target.value);
  const changePassword = e => setPassword(e.target.value);

  const signIn = async e => {
    try {
      const res = await axios.post('/auth/signIn', { username, password });
      return res?.data;
    } catch (e) {
      console.log(e, e?.response?.message)
    }
  }

  return (
    <Box className={classes.root}>
      <TextField
        label="Username"
        variant="outlined"
        onChange={changeUsername}
      />
      <TextField
        label="Password"
        type={passwordVisible ? 'text' : 'password'}
        variant="outlined"
        onChange={changePassword}
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
      <Button
        fullWidth
        variant="contained"
        onClick={signIn}
      >
        Username
      </Button>
    </Box>
  )
}

export default withStyles(styles)(Login);