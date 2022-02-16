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

import { handleGetGroupList } from '../../redux/actions/groups/groups';

const styles = theme => ({
})

const Groups = props => {
  const { classes, groups, onHandleGetGroupList } = props;
  const navigate = useNavigate();
  console.log(props)

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
    name: <a onClick={e => navigate('/groups/' + row.id)}>{row.name}</a>,
    members: row.members,
    createdOn: row.createdOn,
    disabled: !row.isActive
  }));

  console.log(groups)

  return (
    <Box>
      <MaterialTable
        handleAddNew={() => navigate('/groups/add')}
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
    groups: state.groups?.data
  }
}

const mapDispatchToProps = dispatch => ({
  onHandleGetGroupList: () => dispatch(handleGetGroupList())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Groups));