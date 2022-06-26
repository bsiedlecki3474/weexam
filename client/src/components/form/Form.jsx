import { useState } from "react";
import { withStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Box,
  Typography,
  IconButton,
  CardContent,
  CardActions,
  Grid,
  Button,
  Paper
} from "@mui/material"

const styles = theme => ({
  form: {
    position: 'relative',
    height: '100%'
  },
  container: {
    height: `calc(100% - ${theme.spacing(4)})`
  }
})

const Form = props => {
  const { classes, title, fullHeight, submitAction, submitButtonText, deleteAction, deleteActionText, formRef, children } = props;

  return (
    <form
      ref={formRef}
      className={fullHeight && classes.form}
      autoComplete="off"
    >
      <Typography variant="h6">{title}</Typography>
      <Grid container spacing={4} className={classes.container}>
        {children}
      </Grid>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {submitAction && <Button variant="outlined" size="small" onClick={submitAction}>{submitButtonText ?? 'save'}</Button>}
        {deleteAction && <Button variant="outlined" size="small" color="error" onClick={deleteAction}>{deleteActionText ?? 'delete'}</Button>}
      </Box>
    </form>
  )
}

export default withStyles(styles)(Form);