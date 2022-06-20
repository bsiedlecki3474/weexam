import {
  Box,
  Typography,
  Avatar
} from "@mui/material"

import { withStyles } from '@mui/styles';

import { connect } from "react-redux"

const styles = theme => ({
  avatar: {
    width: '128px',
    height: 64
  },
  userDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(2)
  }
})

const Profile = props => {
  const { classes, firstName, lastName, role } = props;

  return (
    <Box>
      <Typography variant="h5" mb={2}>My profile</Typography>
      <Box mt={2} display="flex">
        <Avatar className={classes.avatar}  sx={{ width: 128, height: 128 }} />
        <Box className={classes.userDataContainer}>
          <Typography variant="h6">{firstName} {lastName}</Typography>
          <Typography variant="p" color="text.light">{role}</Typography>
        </Box>
      </Box>
     
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    firstName: state.auth?.data?.firstName,
    lastName: state.auth?.data?.lastName,
    role: state.auth?.data?.role
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));