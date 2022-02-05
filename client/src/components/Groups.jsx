import { useEffect, useState } from "react";
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import {
  Box,
  Typography
} from "@mui/material"

import {
  MaterialTable
} from '.'

import { handleGetGroupList } from '../redux/actions/group';

const styles = theme => ({
})

const Groups = props => {
  const { classes, groups, onHandleGetGroupList } = props;
  console.log(props)

  useEffect(() => {
    onHandleGetGroupList();
  }, [])

  const columns = [
    { id: 'name', label: 'Username' },
    { id: 'members', label: 'Members' },
    { id: 'createdOn', label: 'Created on' }
  ]

  const data = groups && groups.map(row => ({
    id: row.id,
    name: row.name,
    members: row.members,
    createdOn: row.createdOn,
    disabled: !row.isActive
  }));

  console.log(groups)

  return (
    <Box>
      <MaterialTable
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
    groups: state.group?.data
  }
}

const mapDispatchToProps = dispatch => ({
  onHandleGetGroupList: () => dispatch(handleGetGroupList())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Groups));