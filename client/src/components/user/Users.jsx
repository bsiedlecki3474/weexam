import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import {
  Box,
  Typography
} from "@mui/material"

import {
  MaterialTable
} from '../'

import { handleGetUserList } from '../../redux/actions/users';

const styles = theme => ({
  // userIcon: {
  //   fontSize: '1rem',
  //   width: 100,
  //   height: 100
  // }
})

const Users = props => {
  const { classes, users, onHandleGetUserList } = props;
  const navigate = useNavigate();
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

  const data = users && users.map(row => ({
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
        handleAddNew={() => navigate('/users/add')}
        title="Users"
        checkboxes
        columns={columns}
        data={data}
      />
    </Box>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    users: state.users?.data
  }
}

const mapDispatchToProps = dispatch => ({
  onHandleGetUserList: () => dispatch(handleGetUserList())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Users));