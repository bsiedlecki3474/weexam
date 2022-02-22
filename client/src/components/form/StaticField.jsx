import React from 'react';
import { Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
	root: {
		margin: '13px 0 11px 0',
		position: 'relative',
		height: 48
	},
	label: {
    color: theme.palette.text.secondary,
		transform: 'translate(0, 1.5px) scale(0.75)',
		transformOrigin: 'top left'
	},
	skeleton: {
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(1)}px 0`,
    width: '100%'
  }
}));

const StaticField = props => {
	const classes = useStyles();
	const { label, value, isLoading } = props;

	return (
		isLoading
			? <Skeleton className={classes.skeleton} variant="rect" height={45} />
			: <div className={classes.root} {...props}>
					<Typography variant="body1" className={classes.label}>{label}</Typography>
					<Typography variant="body1">{value ?? '–'}</Typography>
				</div>
	);
}

export default StaticField;