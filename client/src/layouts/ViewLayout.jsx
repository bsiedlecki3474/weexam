import { cloneElement } from "react";
import {
  Box,
  Typography,
  CardContent,
  CardActions,
  Grid,
  Button,
  Paper
} from "@mui/material"

import { withStyles } from '@mui/styles';


const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    '& > div': {
      width: '100%'
    },
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    height: '100%',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  actions: {
    height: theme.spacing(4),
    // paddingTop: theme.spacing(2) + ' !important',
    // paddingBottom: theme.spacing(2) + ' !important',
  },
})


const ViewLayout = props => {
  const { title, children, actions, classes } = props;

  return (
    <Box className={classes.root}>
      <Typography variant="h6">{title}</Typography>
      <Grid /*container*/ spacing={4} className={classes.container}>
        {/* <Paper> */}
          {children}
        {/* </Paper> */}
      </Grid>
      <Box className={classes.actions}>
        {actions?.map((el, i) => cloneElement(el, { key: i }))}
      </Box>
    </Box>

  )
}

export default withStyles(styles)(ViewLayout);