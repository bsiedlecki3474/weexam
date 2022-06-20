import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import {
  Box,
  Typography
} from "@mui/material"

import lang from '../../lang'

import {
  MaterialTable
} from '../'

import { handleGetTestList } from '../../redux/actions/tests';

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
    { id: 'groupName', label: 'Groups' },
    { id: 'questions', label: 'Questions' },
    { id: 'showScores', label: 'Scores visible' },
    { id: 'completionRate', label: 'Completion rate' }
  ]

  const data = tests && tests.map(row => ({
    id: row.id,
    name: <a onClick={e => navigate('/tests/' + row.id)}>{row.name}</a>,
    groupName: row.groupName ?? window.DASH,
    questions: row.questions ?? window.DASH,
    showScores: row.showScores ? lang.main.yes : lang.main.no,
    completionRate: row.participants
      ? `${row.completedUsers}/${row.participants} (${(row.completedUsers / row.participants * 100).toFixed(2)}%)`
      : 'No participants',
    disabled: !row.isActive
  }));

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