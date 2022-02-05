import React from 'react';
import {
  TextField as MdlTextField,
  Skeleton
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const TextField = props => {
  const { id, label, type, handleChange, value, color, variant, fullWidth, required, margin, endAdornment, startAdornment, validation, error, helperText, isLoading } = props;
  
  const useStyles = makeStyles(theme => ({
    skeleton: {
      margin: `${theme.spacing(2)}px 0 ${theme.spacing(1)}px 0`,
      width: '100%'
    },
    helperText: {
      position: 'absolute',
      bottom: '-' + theme.spacing(3)
    }
  }));

  const classes = useStyles();

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
            InputLabelProps={{ shrink: type === "date" || !!value }}
            onChange={e => handleChange(e, id)}
            color={"secondary" ?? color}
            variant={variant ?? 'standard'}
            fullWidth={fullWidth ?? true}
            isLoading={isLoading}
            required={required ?? false}
            margin={margin ?? "normal"}
            inputProps={validation}
            error={error}
            helperText={!isLoading && error && helperText}
            FormHelperTextProps={{ className: classes.helperText }}
          />
  );
}

export default TextField;