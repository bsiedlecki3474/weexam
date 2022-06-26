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

import { handleGetGroupList } from '../../redux/actions/groups';

const styles = theme => ({
})

const Groups = props => {
  const { classes, groups, onHandleGetGroupList, isRoot } = props;
  const navigate = useNavigate();

  useEffect(() => {
    onHandleGetGroupList();
  }, [])

  const columns = [
    { id: 'name', label: 'Group name' },
    { id: 'members', label: 'Members' },
    { id: 'createdOn', label: 'Created on' }
  ]

  const data = groups && groups.map(row => ({
    id: row.id,
    name: isRoot
      ? <a onClick={e => navigate('/groups/' + row.id)}>{row.name}</a>
      : row.name,
    members: row.members,
    createdOn: row.createdOn,
    disabled: !row.isActive
  }));

  return (
    <Box>
      <MaterialTable
        {...isRoot ? { handleAddNew: () => navigate('/groups/add') } : {}}
        title="Groups"
        checkboxes
        columns={columns}
        data={data}
      />
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    groups: state.groups?.data,
    isRoot: state?.auth?.data?.role === 'root',
  }
}

const mapDispatchToProps = dispatch => ({
  onHandleGetGroupList: () => dispatch(handleGetGroupList())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Groups));