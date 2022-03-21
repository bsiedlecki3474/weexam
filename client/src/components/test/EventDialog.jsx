import { connect } from "react-redux"

import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { withStyles } from '@mui/styles';
import { useRef, useState, useEffect } from 'react';
import { Form, TextField, Select, Checkbox } from '../form'

import lang from '../../lang'

import {
  handleAddEvent,
  handleSaveEvent,
  handleDeleteEvent
} from '../../redux/actions/events';

import { handleGetEvents } from '../../redux/actions/tests';

import { showSnackbar } from '../../redux/actions/snackbar'

const styles = theme => ({
  // root: {
  //   minWidth: 400
  // }
})

const EventDialog = props => {
  const { classes, data, open, title, action, handleClose } = props;
  const [showErrors, setShowErrors] = useState(false);
  const [id, setId] = useState();
  const [testId, setTestId] = useState();
  const [startDate, setStateDate] = useState();
  const [endDate, setEndDate] = useState();
  const [duration, setDuration] = useState();
  const [isActive, setIsActive] = useState();

  console.log(data)

  useEffect(() => {
    if (open) {
      setId(data ? data.id : null);
      setTestId(data ? data.testId : null);
      setStateDate(data ? data.startDate : null);
      setEndDate(data ? data.endDate : null);
      setDuration(data ? data.duration : null);
      setIsActive(data ? data.isActive : false);
    }
  }, [open]);

  const handleStartDateChange = e => setStateDate(e.target.value);
  const handleEndDateChange = e => setEndDate(e.target.value);
  const handleDurationChange = e => setDuration(e.target.value);
  const handleActiveChange = e => setIsActive(e.target.checked);
  
  const isLoading = false;

  const handleActionButtonClick = e => {
    const { onHandleAddEvent, onHandleSaveEvent, updateEvents } = props;
    const event = {
      testId,
      startDate,
      endDate,
      duration,
      isActive
    }


    return (id
      ? onHandleSaveEvent(id, event)
      : onHandleAddEvent(event)
    ).then(updateEvents(event, id));
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          id="startDate"
          type="datetime-local"
          label="Test start"
          value={startDate?.replace(/\s/, 'T')}
          handleChange={handleStartDateChange}
          required
          isLoading={isLoading}
          error={showErrors && (!endDate || (endDate <= startDate))}
          helperText={(endDate <= startDate) ? lang.main.validation.invalidDates : lang.main.validation.empty}
        />

        <TextField
          id="endDate"
          type="datetime-local"
          label="Test end"
          value={endDate?.replace(/\s/, 'T')}
          handleChange={handleEndDateChange}
          required
          isLoading={isLoading}
          error={showErrors && (!endDate || (endDate <= startDate))}
          helperText={(endDate <= startDate) ? lang.main.validation.invalidDates : lang.main.validation.empty}
        />

        <TextField
          id="duration"
          type="number"
          label="Duration"
          value={duration}
          required
          handleChange={handleDurationChange}
          isLoading={isLoading}
        />

        <Checkbox
          id="isActive"
          label="Event active"
          checked={Boolean(isActive)}
          onChange={handleActiveChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleActionButtonClick}>{data ? 'save' : 'add'}</Button>
      </DialogActions>
    </Dialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onHandleGetEvents: id => dispatch(handleGetEvents(id)),
  onHandleAddEvent: data => dispatch(handleAddEvent(data)),
  onHandleSaveEvent: (id, data) => dispatch(handleSaveEvent(id, data)),
  onHandleDeleteEvent: id => dispatch(handleDeleteEvent(id)),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(EventDialog));