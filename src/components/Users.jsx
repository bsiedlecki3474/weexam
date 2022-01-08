import { useEffect } from "react";
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import {
  Box,
  Typography
} from "@mui/material"

import {
  MaterialTable
} from './'

import { handleGetUserList } from '../redux/actions/user';

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
    { id: 'firstName', label: 'First name' },
    { id: 'lastName', label: 'Last name'}
  ]

  // onHandleGetUserList().then(res => console.log(res))

  return (
    <Box>
      <MaterialTable
        title="Users"
        checkboxes
        columns={columns}
        data={users}
      />
    </Box>
  )
}

const mapStateToProps = state => {
  console.log(state.users)
  return {
    users: state.user?.data
  }
}

const mapDispatchToProps = dispatch => ({
  onHandleGetUserList: () => dispatch(handleGetUserList())
})

// const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Users));