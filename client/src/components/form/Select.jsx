import React from 'react';

import SelectField from './SelectField';
import SelectMultiple from './SelectMultiple';

import { Skeleton } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  skeleton: {
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(1)}px 0`,
    width: '100%'
  }
}));

const Select = props => {
	const classes = useStyles();
	const { isLoading, multiple, virtualized, error, helperText } = props;
	const helper = !isLoading && error && helperText;

	return isLoading
		? <Skeleton className={classes.skeleton} variant="rect" height={45} />
		: multiple
      ? <SelectMultiple helper={helper} {...props} />
      : <SelectField helper={helper} {...props} />
}

export default Select;