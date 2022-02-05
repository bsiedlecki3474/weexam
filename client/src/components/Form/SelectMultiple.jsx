import React from 'react';
import {
  TextField,
  Typography,
  Autocomplete
} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  // listbox: {
  //   boxSizing: 'border-box',
  //   '& ul': {
  //     padding: 0,
  //     margin: 0,
  //   },
  // },
  inputPadding: {
    '& > div.MuiInputBase-root.MuiInputBase-adornedStart': {
      padding: `${theme.spacing(1)}px 0`
    }
  }
}));

const SelectMultiple = props => {
	const classes = useStyles(props);
  const { id, label, labelField, handleChange, variant, required, margin, error, helper } = props;
  let { options, values } = props;

  if (!Array.isArray(values)) values = values?.split(',').map(Number) ?? [];
  options = typeof options === 'object' && !Array.isArray(options) && options?.length
    ? Object.values(options)
    : (options ?? [])

  const selected = options.filter(el => values.includes(el.id));

  return (
    <Autocomplete
      {...props}
      id={id}
      multiple
      disableCloseOnSelect
      value={selected || []}
      options={options || []}
      getOptionLabel={option => option[labelField ?? 'name'] || ''}
      onChange={(e, val) => handleChange(id, val)}
      renderInput={(params) => 
        <TextField
          label={label}
          fullWidth
          required={required}
          margin={margin || "normal"}
          className={classes.inputPadding}
          color="secondary"
          variant={variant ?? 'standard'}
          InputLabelProps={{ shrink: !!values && (options.map((el, key) => el.id ?? key) || []).some(r => values.includes(r))}}
          {...params}
          inputProps={{
            ...params.inputProps,
            required: required && !selected?.length
            // https://github.com/mui-org/material-ui/issues/21663
          }}
          error={error}
          helperText={helper} />}
      renderOption={(option) => <Typography noWrap>{option[labelField ?? 'name']}</Typography>}
      
    />
  );
}

export default SelectMultiple;