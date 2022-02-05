import { Box, Paper, CircularProgress, Typography } from "@mui/material";
import { withStyles } from '@mui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    boxSizing: 'border-box'
  }
})

const Progress = props => {
  const { classes } = props;
  return (
    <Box>
      <Paper className={classes.root}>
        <Typography variant="h3" mb={5}><b>wee</b>xam</Typography>
        <CircularProgress size="3em" />
      </Paper>
    </Box>
  );
}

export default withStyles(styles)(Progress);