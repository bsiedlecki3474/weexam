import React from 'react';
import { TextField, MenuItem, useMediaQuery } from '@mui/material';
import { useTheme, makeStyles} from '@mui/styles';

const Select = props => {
  const { id, label, labelField, handleChange, value, variant, required, margin, noAsterisk, error, helper } = props;
  let { options } = props;
  options = typeof options === 'object' && !Array.isArray(options) ? Object.values(options) : (options ?? [])

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

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
    <TextField
      id={id}
      select
      label={label}
      fullWidth
      required={required && !noAsterisk}
      margin={margin || "normal"}
      color="secondary"
			variant={variant ?? 'standard'}
      value={value ?? null}
      InputLabelProps={{ shrink: (!!value || value === 0) && (options.map((el, key) => el.id ?? key) || []).includes(value)}}
      SelectProps={{ native: isMobile }}
      onChange={e => handleChange(e, id)}
      error={error}
      helperText={helper}
      FormHelperTextProps={{ className: classes.helperText }}
    >
      { !required && (isMobile ? <option>&nbsp;</option> : <MenuItem>&nbsp;</MenuItem>) }
      {(options ?? []).map((el, key) => isMobile
        ? <option key={el.id ?? key} value={el.id ?? key}>{el[labelField ?? 'name']}</option>
        : <MenuItem key={el.id ?? key} value={el.id ?? key}>{el[labelField ?? 'name']}</MenuItem>
      )}
    </TextField>
  );
}

export default Select;