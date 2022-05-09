import { Component, createRef } from "react";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";
import ListItem from '../ListItem'
import { EventDialog } from './'

import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';

import { format } from 'date-fns'

import {
  Box,
  Button,
  Typography,
  IconButton,
  Grid,
  Collapse,
  List,
  Autocomplete,
  TextField as MdlTextField
} from "@mui/material"

import {
  handleSaveTest,
  handleGetSingleTest,
  handleGetAssignedGroups,
  handleAddGroupToTest,
  handleRemoveGroupFromTest,
  handleGetEvents
} from '../../redux/actions/tests';

// import { handleGetGroupList } from '../../redux/actions/groups';
import { showSnackbar } from '../../redux/actions/snackbar'

import {  } from "../../api/tests";
import { getEvents, getSingleTest, getAssignedGroups } from "../../api/tests";
import { getGroupList } from "../../api/groups";

import { Form, TextField, Select, Checkbox } from '../form'
import lang from '../../lang'

const styles = theme => ({
  root: {
    height: '100%'
  },
  addContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  addButton: {
    marginLeft: theme.spacing(1),
    marginBottom: `-${theme.spacing(1)}`,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& > div:not(:first-child)': {
      marginTop: 0
    }
  }
})

const EditTestDetails = props => {
  const formRef = useRef();
  const [groups, setGroups] = useState(null);
  const [events, setEvents] = useState(null);
  const [assignedGroups, setAssignedGroups] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [addGroup, setAddGroup] = useState(null);
  const [addGroupVisible, setAddGroupVisible] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [eventDialogData, setEventDialogData] = useState(null);

  useEffect(() => {
    getGroupList(id).then(res => setGroups(res));
    getEvents(id).then(res => setEvents(res));
    getSingleTest(id).then(res => setData(res));
    getAssignedGroups(id).then(res => setAssignedGroups(res));
  }, [])

  const checkFormValidity = () => formRef.current.checkValidity();

  const handleInputChange = (e, key) => {
    const value = e.target.value;
    setData({...data, [key]: value });
  }

  const handleCheckboxChange = key => (e, value) => {
    setData({...data, [key]: value });
  }

  const handleSelectChange = (key, val) => {
    const value = val?.id;
    setData({...data, [key]: value });
  }

  const handleSelectMultipleChange = (key, vals) => {
    const values = vals ? vals.map(el => el.id) : [];
    setData({...data, [key]: values });
  }

  const isDataLoading = () => false

  const handleChangeAddGroup = option => {
    setAddGroup(option)
  }

  const handleAddGroupClick = e => {
    const { params, showSnackbar, onHandleAddGroupToTest } = props;
    const { id } = params;

    onHandleAddGroupToTest(addGroup?.id, id).then(res => {
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
    if (window.confirm(lang.tests.snackbar.confirmRemoveTestGroup)) {
      const { params, showSnackbar, onHandleRemoveGroupFromTest } = props;
      const { id } = params;
      onHandleRemoveGroupFromTest(groupId, id).then(res => {
        setAssignedGroups(assignedGroups.filter(el => el.id !== groupId))
        showSnackbar({
          message: lang.tests.snackbar.groupRemoved,
          severity: 'success'
        })
      })
    }
  }

  const toggleGroupVisible = () => setAddGroupVisible(!addGroupVisible);
  const handleEventDialogOpen = (data = null) => { setEventDialogOpen(true); setEventDialogData(data) }
  const handleEventDialogClose = (data = null) => { setEventDialogOpen(false); setEventDialogData(null) }

  const { classes, params, onHandleSaveTest, showSnackbar } = props;
  const { id } = params;
  const assignedGroupIds = assignedGroups ? assignedGroups.map(el => el.id) : [];

  const formSubmit = e => {
    setShowErrors(true);
    if (checkFormValidity()) {
      onHandleSaveTest(id, data).then(res => {
        showSnackbar({
          message: lang.main.snackbar.changesSaved,
          severity: 'success'
        })
        // tbd block request spam
      })
    } else {
      showSnackbar({
        message: lang.main.validation.fillAllRequired,
        severity: 'error'
      })
    }
  }

    const testDateComparator = (a, b) => {
      return a.startDate === b.startDate
        ? (b.endDate - a.endDate)
        : (b.startDate - a.startDate);
    }

    const groupComparator = (a, b) => b.name < a.name;

    const updateGroups = (group) => {
      setAssignedGroups([...assignedGroups.filter(el => el.id !== group?.id), group].sort(groupComparator))
    }

    const updateEvents = (event, id = null) => {
      setEvents([...events.filter(el => el.id !== id), event].sort(testDateComparator))
    }

    const formatEvent = (startDate, endDate, duration) => {
      const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd HH:mm');
      const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd HH:mm');
      return `${formattedStartDate} - ${formattedEndDate} (${duration} mins)`;
    }

    return (
      <Box className={classes.root}>
        <Form
          formRef={formRef}
          title="Edit test details"
          fullHeight
          submitButton={
            <Button variant="outlined" size="small" onClick={formSubmit}>save</Button>
          }
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="name"
              label="Test name"
              value={data.name}
              handleChange={handleInputChange}
              required
              isLoading={isLoading || isDataLoading()}
              error={showErrors && !data.name}
              helperText={lang.main.validation.empty}
            />

            <Box className={classes.checkboxContainer}>
              <Checkbox
                id="isActive"
                label="Test active"
                checked={Boolean(data.isActive)}
                onChange={handleCheckboxChange('isActive')}
              />

              <Checkbox
                id="showScores"
                label="Show score after completion"
                checked={Boolean(data.showScores)}
                onChange={handleCheckboxChange('showScores')}
              />
            </Box>

          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box mb={2}>

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
                {assignedGroups && assignedGroups.map(group => 
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

            <Box mb={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">Events</Typography>
                <Button variant="outlined" size="small" onClick={e => handleEventDialogOpen({ testId: props?.params?.id })}>add</Button>
              </Box>

              <List dense>
                {events && events.map(event => 
                  <ListItem 
                    key={event.id}
                    primary={formatEvent(event.startDate, event.endDate, event.duration)}
                    icon={<CalendarTodayIcon />}
                    action={
                      <IconButton edge="end" size="small" onClick={e => handleEventDialogOpen(event)}>
                        <SettingsIcon fontSize="inherit" />
                      </IconButton>
                    }
                  />  
                )}
              </List>

              <EventDialog
                open={eventDialogOpen}
                data={eventDialogData}
                title='Event'
                handleClose={handleEventDialogClose}
                updateEvents={updateEvents}
              />
            </Box>
          </Grid>
        </Form>
      </Box>
    )
  // }
}

const mapDispatchToProps = dispatch => ({
  onHandleSaveTest: (id, data) => dispatch(handleSaveTest(id, data)),
  onHandleGetSingleTest: id => dispatch(handleGetSingleTest(id)),
  onHandleAddGroupToTest: (groupId, testId) => dispatch(handleAddGroupToTest(groupId, testId)),
  onHandleRemoveGroupFromTest: (groupId, testId) => dispatch(handleRemoveGroupFromTest(groupId, testId)),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(null, mapDispatchToProps)(withParams(withStyles(styles)(EditTestDetails)));