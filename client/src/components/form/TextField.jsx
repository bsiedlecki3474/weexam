import React, { useState, useEffect } from 'react';
import {
  TextField as MdlTextField,
  Skeleton
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  skeleton: {
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(1)}px 0`,
    width: '100%'
  },
  helperText: {
    position: 'absolute',
    bottom: '-' + theme.spacing(3)
  },
  calendarIcon: {
    '&::-webkit-calendar-picker-indicator': {
      filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
    }
  }
}));

const TextField = props => {
  const {
    id,
    label,
    type,
    handleChange,
    handleDelayedChange,
    delay,
    value,
    color,
    variant,
    fullWidth,
    required,
    margin,
    endAdornment,
    startAdornment,
    validation,
    error,
    helperText,
    isLoading
  } = props;

  // const [timer, setTimer] = useState(null);

  // const delayWrapper = callback => {
  //   clearTimeout(timer);
  //   setTimer(setTimeout(() => callback, delay ?? 1350));
  //   return callback;
  // }

  // const delayWrapper = callback => {
  //   clearTimeout(timer);
  //   setTimer(setTimeout(callback(), delay ?? 1350));
  // }

  const classes = useStyles();

  useEffect(() => {

  }, )

  return (
    isLoading
      ? <Skeleton className={classes.skeleton} variant="rect" height={45} />
      : <MdlTextField
          {...props}
          id={id}
          label={label}
          value={value || null}
          type={type ?? "text"}
          InputProps={{ endAdornment, startAdornment }}
          InputLabelProps={{ shrink: ['date', 'datetime-local'].includes(type) || !!value }}
          // onChange={e => handleDelayedChange
          //   ? delayWrapper(() => handleDelayedChange(e, id))
            // : handleChange(e, id)}
          onChange={e => handleChange(e, id)}
          color={"secondary" ?? color}
          variant={variant ?? 'standard'}
          fullWidth={fullWidth ?? true}
          isLoading={isLoading}
          required={required ?? false}
          margin={margin ?? "normal"}
          inputProps={{ validation, className: classes.calendarIcon }}
          error={error}
          helperText={!isLoading && error && helperText}
          FormHelperTextProps={{ className: classes.helperText }}
        />
  );
}

export default TextField;