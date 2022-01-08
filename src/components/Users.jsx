import { useEffect, useState } from "react";
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
    { id: 'username', label: 'Username' },
    { id: 'firstName', label: 'First name' },
    { id: 'lastName', label: 'Last name' },
    { id: 'role', label: 'Role' },
    { id: 'createdOn', label: 'Created on' }
  ]

  const data = users.map(row => ({
    id: row.id,
    username: row.username,
    firstName: row.firstName,
    lastName: row.lastName,
    role: row.role,
    createdOn: row.createdOn,
    disabled: !row.isActive
  }));

  console.log(users)

  return (
    <Box>
      <MaterialTable
        title="Users"
        checkboxes
        columns={columns}
        data={data}
      />
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    users: state.user?.data
  }
}

const mapDispatchToProps = dispatch => ({
  onHandleGetUserList: () => dispatch(handleGetUserList())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Users));