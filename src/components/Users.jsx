import {
  Box,
  Typography
} from "@mui/material"

import {
  MaterialTable
} from './'

import { withStyles } from '@mui/styles';


import { handleGetUserList } from '../redux/actions/user';

import { connect } from "react-redux"
import { useEffect } from "react";

const styles = theme => ({
  // userIcon: {
  //   fontSize: '1rem',
  //   width: 100,
  //   height: 100
  // }
})

const Users = props => {
  const { classes, users, onHandleGetUserList } = props;
  console.log(props)

  useEffect(() => {
    onHandleGetUserList();
  }, [])

  const columns = [
    { key: 'firstName', name: 'First name' },
    { key: 'lastName', name: 'Last name'}
  ]

  // onHandleGetUserList().then(res => console.log(res))

  return (
    <Box>
      <p>users:</p>
      <ol>{users?.map(el => 
        <li key={el.id}>{el.firstName} {el.lastName}</li>
      )}</ol>
      <Box mb={2}>
        <Typography component="h1" variant="h4">
          Users
        </Typography>
      </Box>
      <Box py={2}>
        <MaterialTable />
      </Box>
    </Box>
  )
}

const mapStateToProps = state => {
  console.log(state.users)
  return {
    users: state.users?.data
  }
}

const mapDispatchToProps = dispatch => ({
  onHandleGetUserList: () => dispatch(handleGetUserList())
})

// const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Users));