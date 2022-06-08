import { Component, createRef } from "react";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";
import ListItem from '../ListItem'

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';

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
  handleGetEvents
} from '../../redux/actions/tests';

// import { handleGetGroupList } from '../../redux/actions/groups';
import { showSnackbar } from '../../redux/actions/snackbar'

import {  } from "../../api/tests";
import { getEvents, getSingleTest } from "../../api/tests";
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

  const navigate = useNavigate();

  useEffect(() => {
    getGroupList(id).then(res => setGroups(res));
    getEvents(id).then(res => setEvents(res));
    getSingleTest(id).then(res => setData(res));
    // getAssignedGroups(id).then(res => setAssignedGroups(res));
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

  const { classes, params, onHandleSaveTest, showSnackbar } = props;
  const { id } = params;
  // const assignedGroupIds = assignedGroups ? assignedGroups.map(el => el.id) : [];

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

  const formatEvent = event => {
    const { startDate, endDate, duration } = event;
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
              <Typography variant="subtitle1">Events</Typography>
              <Button variant="outlined" size="small" onClick={e => navigate(`/tests/${props?.params?.id}/event/add`)}>add</Button>
            </Box>

            <List dense>
              {events && events.map(event => 
                <ListItem 
                  key={event.id}
                  primary={
                    <Typography variant="body2" color={event.isActive ? 'text.primary' : 'text.secondary'}>
                      {formatEvent(event)}
                    </Typography>
                  }
                  icon={<CalendarTodayIcon />}
                  action={
                    <IconButton
                      edge="end"
                      size="small"
                      disabled={new Date().getTime() >= new Date(event.startDate).getTime()}
                      onClick={e => navigate(`/tests/${props?.params?.id}/event/${event.id}`)}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  }
                />  
              )}
            </List>
          </Box>
        </Grid>
      </Form>
    </Box>
  )
}

const mapDispatchToProps = dispatch => ({
  onHandleSaveTest: (id, data) => dispatch(handleSaveTest(id, data)),
  onHandleGetSingleTest: id => dispatch(handleGetSingleTest(id)),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(null, mapDispatchToProps)(withParams(withStyles(styles)(EditTestDetails)));