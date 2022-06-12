import { Component, createRef } from "react";
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";
import withNavigation from "../../hoc/withNavigation";

import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  Box,
  IconButton,
  Button,
  Grid,
  List,
  TextField as MdlTextField,
  Typography,
  Autocomplete
} from "@mui/material"

import {
  handleAddEvent,
  handleSaveEvent,
  handleDeleteEvent,
  handleGetSingleEvent,
  handleGetAssignedGroups,
  handleAddGroup,
  handleRemoveGroup
} from '../../redux/actions/events';

import { handleGetEvents } from '../../redux/actions/tests';
import { handleGetGroupList } from '../../redux/actions/groups';

import { showSnackbar } from '../../redux/actions/snackbar'

import ListItem from '../ListItem'
import { Form, TextField, StaticField, Checkbox } from '../form'
import lang from '../../lang'

import { format } from 'date-fns'
import EventReport from "./EventReport";

const styles = theme => ({
  addContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  addButton: {
    marginLeft: theme.spacing(1),
    marginBottom: `-${theme.spacing(1)}`,
  }
})

class EditEvent extends Component {
  constructor(props) {
    super(props)

    this.formRef = createRef();
  }

  state = {
    showErrors: false,
    isLoading: false,
    data: {},
    addGroup: null,
    assignedGroups: [],
    addGroupVisible: false
  }

  componentDidMount() {
    console.log(this.props)
    const {
      params,
      onHandleGetGroupList,
      onHandleGetSingleEvent,
      onHandleGetAssignedGroups
    } = this.props;
    const { eventId } = params;
    onHandleGetGroupList();
    onHandleGetSingleEvent(eventId)
      .then(res => this.setState(state => ({...state, data: res.data })))
    onHandleGetAssignedGroups(eventId)
      .then(res => this.setState(state => ({...state, assignedGroups: res.data})))
  }

  handleChangeAddGroup = option => this.setState({ addGroup: option });

  toggleGroupVisible = () => this.setState({ addGroupVisible: !this.state.addGroupVisible })

  handleAddGroupClick = e => {
    const { addGroup } = this.state;
    const { params, showSnackbar, onHandleAddGroup } = this.props;
    const { id } = params;

    onHandleAddGroup(id, addGroup?.id).then(res => {
      this.setState({
        assignedGroups: [...this.state.assignedGroups, addGroup],
        addGroup: null
      })

      showSnackbar({
        message: lang.tests.snackbar.groupAdded,
        severity: 'success'
      })
    })
  }

  handleRemoveGroupClick = groupId => e => {
    if (window.confirm(lang.tests.snackbar.confirmRemoveGroup)) {
      const { assignedGroups } = this.state;
      const { params, showSnackbar, onHandleRemoveGroup } = this.props;
      const { id } = params;

      onHandleRemoveGroup(id, groupId).then(res => {
        this.setState({
          assignedGroups: assignedGroups.filter(el => el.id !== groupId),
        })

        showSnackbar({
          message: lang.tests.snackbar.groupRemoved,
          severity: 'success'
        })
      })
    }
  }

  checkFormValidity = () => this.formRef.current.checkValidity();

  handleCheckboxChange = key => (e, value) => {
    this.setState({ data: {...this.state.data, [key]: value }});
  }

  handleInputChange = (e, key) => {
    const value = e.target.value;
    this.setState({ data: {...this.state.data, [key]: value }});
  }

  handleSelectChange = (key, val) => {
    const value = val?.id;
    this.setState({ data: {...this.state.data, [key]: value }});
  }

  handleSelectMultipleChange = (key, vals) => {
    const values = vals ? vals.map(el => el.id) : [];
    this.setState({ data: {...this.state.data, [key]: values }});
  }

  isDataLoading = () => false

  render() {
    const { showErrors, isLoading, data, addGroup, addGroupVisible, assignedGroups } = this.state;
    const { classes, groups, navigate, params } = this.props;
    const { testId, eventId } = params;
    const assignedGroupsIds = assignedGroups ? assignedGroups.map(el => el.id) : [];

    const formSubmit = e => {
      const { onHandleSaveEvent, showSnackbar } = this.props;
      this.setState({ showErrors: true }, () => {
        if (this.checkFormValidity()) {
          // tbd check for duplicates
          onHandleSaveEvent(eventId, data).then(res => {
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
      })
    }

    return (
      <Box sx={{ height: 'calc(100vh - 112px)' }}>
        <Form
          formRef={this.formRef}
          // title="Edit event"
          title={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton edge="end" size="small" onClick={e => navigate(`/tests/${testId}`)}>
                <ArrowBackIcon fontSize="inherit" />
              </IconButton>
              Edit event
            </Box>
          }
          fullHeight
          submitButton={
            <Button variant="outlined" size="small" onClick={formSubmit}>save</Button>
          }
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <StaticField
              label="Test name"
              value={data.testName}
            />

            <TextField
              id="startDate"
              sx={{ mb: 2 }}
              type="datetime-local"
              label="Test start"
              value={data.startDate ? format(new Date(data.startDate), 'yyyy-MM-dd\'T\'HH:mm') : null}
              handleChange={this.handleInputChange}
              required
              isLoading={isLoading}
              error={showErrors && !data.endDate || (data.endDate <= data.startDate)}
              helperText={(data.endDate <= data.startDate)
                ? lang.main.validation.invalidDates
                : lang.main.validation.empty
              }
            />

            <TextField
              id="endDate"
              sx={{ mb: 2 }}
              type="datetime-local"
              label="Test end"
              value={data.endDate ? format(new Date(data.endDate), 'yyyy-MM-dd\'T\'HH:mm') : null}
              handleChange={this.handleInputChange}
              required
              isLoading={isLoading}
              error={showErrors && !data.endDate || (data.endDate <= data.startDate)}
              helperText={(data.endDate <= data.startDate)
                ? lang.main.validation.invalidDates
                : lang.main.validation.empty
              }
            />

            <TextField
              id="duration"
              type="number"
              label="Duration"
              value={data.duration}
              required
              handleChange={this.handleInputChange}
              isLoading={isLoading}
            />

            <Checkbox
              id="isActive"
              label="Event active"
              checked={Boolean(data.isActive)}
              onChange={this.handleCheckboxChange('isActive')}
            />

          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>

            {/* <Typography variant="h6" sx={{ mb: 2 }}>Stats</Typography>
            <EventReport /> */}

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">Groups</Typography>
                <Button variant="outlined" size="small" onClick={this.toggleGroupVisible}>add</Button>
              </Box>

              {addGroupVisible && <Box className={classes.addContainer}>
                <Autocomplete
                  options={groups?.filter(el => !assignedGroupsIds.includes(el.id)) ?? []}
                  getOptionLabel={option => option.name}
                  onChange={(e, value) => this.handleChangeAddGroup(value)}
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
                  onClick={this.handleAddGroupClick}
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
                      <IconButton edge="end" size="small" onClick={this.handleRemoveGroupClick(group.id)}>
                        <DeleteIcon fontSize="inherit" />
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
}

const mapStateToProps = state => ({
  groups: state.groups.data
})

const mapDispatchToProps = dispatch => ({
  onHandleGetSingleEvent: id => dispatch(handleGetSingleEvent(id)),
  onHandleGetEvents: id => dispatch(handleGetEvents(id)),
  onHandleAddEvent: data => dispatch(handleAddEvent(data)),
  onHandleSaveEvent: (id, data) => dispatch(handleSaveEvent(id, data)),
  onHandleDeleteEvent: id => dispatch(handleDeleteEvent(id)),
  onHandleGetGroupList: () => dispatch(handleGetGroupList()),
  onHandleGetAssignedGroups: id => dispatch(handleGetAssignedGroups(id)),
  onHandleAddGroup: (id, groupId) => dispatch(handleAddGroup(id, groupId)),
  onHandleRemoveGroup: (id, groupId) => dispatch(handleRemoveGroup(id, groupId)),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withParams(
    withNavigation(
      withStyles(styles)(EditEvent)
    )
  )
);