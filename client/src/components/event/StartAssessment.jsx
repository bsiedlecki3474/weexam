import { useState, useEffect, useRef } from 'react'
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";

import {
  Box
} from "@mui/material"

import { Assessment, AssessmentSummary } from '../assessment'

import { getEventAssessment } from "../../api/events";
import { handleStartAssessment } from '../../redux/actions/assessment';

import lang from '../../lang'

const styles = theme => ({
  root: {
    height: '100%'
  },
  answerContainer: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  floatingButton: {
    position: 'fixed !important',
    bottom: theme.spacing(3),
    right: theme.spacing(3)
  }
})

const StartAssessment = props => {
  const { classes, params, assessmentStarted, onHandleStartAssessment } = props;
  const { id } = params;

  const [event, setEvent] = useState({});

  const {
    assessmentId,
    isEventActive,
    isActive,
    userFinished
  } = event;

  useEffect(() => {
    getEventAssessment(id).then(res => setEvent(res))
  }, [id, assessmentStarted])

  return (
    <Box className={classes.root}>
      {event && (
        isEventActive && isActive && !userFinished
        ? <Assessment
            eventId={id}
            assessmentId={assessmentId}
            endDate={event?.expectedEndDate}
          /> 
        : <AssessmentSummary
            assessment={event}
            handleStartAssessment={e => onHandleStartAssessment(id)}
          />
      )}      
    </Box>
  )
}

const mapStateToProps = state => ({
  assessmentStarted: state.assessment.assessmentStarted
})

const mapDispatchToProps = dispatch => ({
  onHandleStartAssessment: (id) => dispatch(handleStartAssessment(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(withParams(withStyles(styles)(StartAssessment)));