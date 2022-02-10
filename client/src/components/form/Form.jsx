import { useState } from "react";
import { withStyles } from '@mui/styles';

import {
  Box,
  Typography,
  CardContent,
  CardActions,
  Grid,
  Button,
  Paper
} from "@mui/material"

const styles = theme => ({
  form: {
    height: '100%',
    '& > div': {
      height: '100%'
    }
  },
  cardHeader: {
    height: theme.spacing(4),
    fontWeight: '500',
    flexBasis: '100%'
  },
  cardContent: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  // cardBody: {
  //   padding: theme.spacing(2),
  // },
  cardActions: {
    height: theme.spacing(4),
    padding: theme.spacing(2) + ' !important'
  },
})

const Form = props => {
  const { classes, title, fullHeight, submitButton, formRef, children } = props;

  return (
    <form
      ref={formRef}
      className={fullHeight && classes.form}
      autoComplete="off"
    >
      <Paper>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">{title}</Typography>
          <Grid container className={classes.gridContainer} spacing={2}>
            {children}
          </Grid>
        </CardContent>
        <CardActions className={classes.cardActions}>
          {submitButton}
        </CardActions>
      </Paper>
      
    </form>
  )
}

export default withStyles(styles)(Form);