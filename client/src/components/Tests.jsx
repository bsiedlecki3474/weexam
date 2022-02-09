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
} from '.'

import { handleGetTestList } from '../redux/actions/tests';

const styles = theme => ({
  // userIcon: {
  //   fontSize: '1rem',
  //   width: 100,
  //   height: 100
  // }
})

const Tests = props => {
  const { classes, tests, onHandleGetTestList } = props;
  const navigate = useNavigate();
  console.log(props)

  useEffect(() => {
    onHandleGetTestList();
  }, [])

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'groupName', label: 'Group' },
    { id: 'startDate', label: 'Start date' },
    { id: 'endDate', label: 'End Date' },
    { id: 'duration', label: 'Duration' },
    { id: 'completionRate', label: 'Completion rate' }
  ]

  const data = tests && tests.map(row => ({
    id: row.id,
    name: row.name,
    groupName: row.groupName,
    startDate: row.startDate,
    endDate: row.endDate,
    duration: row.duration ? row.duration + ' min' : '-',
    completionRate: row.participants ? `?/${row.participants} (?%)` : 'No participants',
    disabled: !row.isActive
  }));

  console.log(tests)

  return (
    <Box>
      <MaterialTable
        handleAddNew={() => navigate('/tests/add')}
        title="Tests"
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
    tests: state.tests?.data
  }
}

const mapDispatchToProps = dispatch => ({
  onHandleGetTestList: () => dispatch(handleGetTestList())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Tests));