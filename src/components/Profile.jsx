import {
  Box,
  Typography
} from "@mui/material"
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { withStyles } from '@mui/styles';

import { connect } from "react-redux"

const styles = theme => ({
  // userIcon: {
  //   fontSize: '1rem',
  //   width: 100,
  //   height: 100
  // }
})

const Profile = props => {
  const { classes, firstName, lastName, token } = props;

  return (
    <Box>
      <Box mb={2}>
        <Typography component="h1" variant="h4">
          {firstName} {lastName}
        </Typography>
        <Typography variant="p">{token}</Typography>
      </Box>
      {/* <Typography component="p">
        Tests: {13}
      </Typography>
      <Typography component="p">
        Last login: {'2021-12-30'}
      </Typography> */}
    </Box>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    firstName: state.auth?.data?.firstName,
    lastName: state.auth?.data?.lastName,
    token: state.auth?.data?.token // to be removed
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));