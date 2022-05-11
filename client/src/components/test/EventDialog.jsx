import { connect } from "react-redux"

import {
  Grid,
  Divider,
  Stack,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,

  List,
  // ListItem,
  Box,
  Typography,
  Autocomplete,
  TextField as MdlTextField
} from '@mui/material'

import ListItem from '../ListItem'

import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeleteIcon from '@mui/icons-material/Delete';

import withParams from "../../hoc/withParams";

import { withStyles } from '@mui/styles';
import { useRef, useState, useEffect } from 'react';
import { Form, TextField, Select, Checkbox } from '../form'

import { format } from 'date-fns'

import lang from '../../lang'

import {
  handleAddEvent,
  handleSaveEvent,
  handleDeleteEvent,
  handleGetAssignedGroups,
  handleAddGroup,
  handleRemoveGroup
} from '../../redux/actions/events';

import {
  handleSaveTest,
  handleGetSingleTest,
  handleGetEvents
} from '../../redux/actions/tests';

// import { handleGetEvents } from '../../redux/actions/tests';

import { showSnackbar } from '../../redux/actions/snackbar'

const styles = theme => ({
  // root: {
  //   minWidth: 400
  // }
})

const EventDialog = props => {
  const { classes, data, open, title, action, groups, handleClose } = props;
  const [showErrors, setShowErrors] = useState(false);
  const [id, setId] = useState();
  const [testId, setTestId] = useState();
  const [startDate, setStateDate] = useState();
  const [endDate, setEndDate] = useState();
  const [duration, setDuration] = useState();
  const [isActive, setIsActive] = useState();

  // const [groups, setGroups] = useState(null);
  const [addGroup, setAddGroup] = useState(null);
  const [assignedGroups, setAssignedGroups] = useState([]);
  const [addGroupVisible, setAddGroupVisible] = useState(false);

  console.log(data)

  useEffect(() => {
    if (open) {
      const { onHandleGetAssignedGroups } = props;

      setId(data?.id);
      setTestId(data?.testId);
      setStateDate(data?.startDate);
      setEndDate(data?.endDate);
      setDuration(data?.duration);
      setIsActive(data?.isActive ?? false);

      onHandleGetAssignedGroups(data?.id).then(res => setAssignedGroups(res?.data ?? []));
    }
  }, [open]);


  // useEffect(() => {
  //   const { id, onHandleGetAssignedGroups } = props;
  //   onHandleGetAssignedGroups(id).then(res => { console.log(res); return setAssignedGroups(res); });
  // }, [])

  const handleChangeAddGroup = option => {
    setAddGroup(option)
  }

  const handleStartDateChange = e => setStateDate(e.target.value);
  const handleEndDateChange = e => setEndDate(e.target.value);
  const handleDurationChange = e => setDuration(e.target.value);
  const handleActiveChange = e => setIsActive(e.target.checked);

  const groupComparator = (a, b) => b.name < a.name;
  const updateGroups = (group) => {
    setAssignedGroups([...assignedGroups.filter(el => el.id !== group?.id), group].sort(groupComparator))
  }

  const toggleGroupVisible = () => setAddGroupVisible(!addGroupVisible);


  const handleAddGroupClick = e => {
    const { params, showSnackbar, onHandleAddGroup } = props;

    onHandleAddGroup(id, addGroup?.id).then(res => {
      setAddGroup(null);
      setAddGroupVisible(false);
      updateGroups(addGroup)

      showSnackbar({
        message: lang.tests.snackbar.groupAdded,
        severity: 'success'
      })
    })
  }

  const handleRemoveGroupClick = groupId => e => {
    if (window.confirm(lang.tests.snackbar.confirmRemoveGroup)) {
      const { params, showSnackbar, onHandleRemoveGroup } = props;
      onHandleRemoveGroup(id, groupId).then(res => {
        setAssignedGroups(assignedGroups.filter(el => el.id !== groupId))
        showSnackbar({
          message: lang.tests.snackbar.groupRemoved,
          severity: 'success'
        })
      })
    }
  }

  const handleActionButtonClick = e => {
    const { onHandleAddEvent, onHandleSaveEvent, updateEvents } = props;
    const event = {
      testId,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      duration,
      isActive
    }

    return (id
      ? onHandleSaveEvent(id, event)
      : onHandleAddEvent(event)
    ).then(updateEvents(event, id));
  }

  const isLoading = false;

  const assignedGroupIds = assignedGroups.map(el => el.id);

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root} maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack
          direction={{ xs: 'column', sm: 'row', }}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ '& > div': { width: '100%' } }}
          justifyContent="center"
        >
          <Box>
            <TextField
              id="startDate"
              type="datetime-local"
              label="Test start"
              value={startDate ? format(new Date(startDate), 'yyyy-MM-dd\'T\'HH:mm') : null}
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
              value={endDate ? format(new Date(endDate), 'yyyy-MM-dd\'T\'HH:mm') : null}
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
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Groups</Typography>
              <Button variant="outlined" size="small" onClick={toggleGroupVisible}>add</Button>
            </Box>

            {addGroupVisible && <Box className={classes.addContainer}>
              <Autocomplete
                options={groups?.filter(el => !assignedGroupIds.includes(el.id)) ?? []}
                getOptionLabel={option => option.name}
                onChange={(e, value) => handleChangeAddGroup(value)}
                value={addGroup}
                fullWidth
                renderInput={(params) =>
                  <MdlTextField
                    {...params}
                    fullWidth
                    variant="standard"
                    label="Add group"
                  // value={addUser?.id}

                  />
                }
              />
              <IconButton
                className={classes.addButton}
                onClick={handleAddGroupClick}
                disabled={addGroup === null}
              >
                <GroupAddIcon />
              </IconButton>
              {/* <Button variant="outlined" size="small" onClick={this.handleAddUserClick}>add</Button> */}
            </Box>}

            <List dense>
              {(assignedGroups ?? []).map(group => 
                 <ListItem
                   key={group.id}
                   primary={group.name}
                   icon={<GroupsIcon />}
                   action={
                    <IconButton edge="end" size="small" onClick={handleRemoveGroupClick(group.id)}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                   }
                 />
               )}
            </List>
          </Box>
        </Stack>
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
  onHandleGetAssignedGroups: id => dispatch(handleGetAssignedGroups(id)),
  onHandleAddGroup: (id, groupId) => dispatch(handleAddGroup(id, groupId)),
  onHandleRemoveGroup: (id, groupId) => dispatch(handleRemoveGroup(id, groupId)),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(null, mapDispatchToProps)(withParams(withStyles(styles)(EventDialog)));