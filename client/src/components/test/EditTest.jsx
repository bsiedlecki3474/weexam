import { Component, createRef } from "react";
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";
import ListItem from '../ListItem'

import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DeleteIcon from '@mui/icons-material/Delete';

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
  handleGetAssignedGroups
} from '../../redux/actions/tests';
import { handleGetGroupList } from '../../redux/actions/groups';
import { showSnackbar } from '../../redux/actions/snackbar'

import { Form, TextField, Select, Checkbox } from '../form'
import lang from '../../lang'

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
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& > div:not(:first-child)': {
      marginTop: 0
    }
  }
})

class EditTest extends Component {
  constructor(props) {
    super(props)

    this.formRef = createRef();
  }

  state = {
    showErrors: false,
    isLoading: false,
    data: {},
    addGroup: null
  }

  componentDidMount() {
    console.log(this.props)
    const {
      params,
      onHandleGetGroupList,
      onHandleGetSingleTest,
      onHandleGetAssignedGroups
    } = this.props;
    const { id } = params;
    onHandleGetGroupList()
    onHandleGetSingleTest(id).then(res => this.setState(state => ({...state, data: res.data})))
    onHandleGetAssignedGroups(id).then(res => this.setState(state => ({...state, assignedGroups: res.data})))
  }

  checkFormValidity = () => this.formRef.current.checkValidity();

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

  handleChangeAddUser = option => this.setState({ addUser: option });

  handleAddUserClick = e => {
    // const { addUser } = this.state;
    // const { params, showSnackbar, onHandleAddUserToGroup } = this.props;
    // const { id } = params;

    // onHandleAddUserToGroup(addUser?.id, id).then(res => {
    //   this.setState({
    //     usersInGroup: [...this.state.usersInGroup, addUser],
    //     usersNotInGroup: this.state.usersNotInGroup.filter(el => el.id !== addUser.id),
    //     addUser: null
    //   })

    //   showSnackbar({
    //     message: lang.groups.snackbar.userAdded,
    //     severity: 'success'
    //   })
    // })
  }

  handleRemoveUserClick = userId => e => {
    // if (window.confirm(lang.groups.snackbar.confirmRemoveGroupUser)) {
    //   const { params, showSnackbar, onHandleRemoveUserFromGroup } = this.props;
    //   const { id } = params;
    //   onHandleRemoveUserFromGroup(userId, id).then(res => {
    //     const user = this.state.usersNotInGroup.find(el => el.id == userId)

    //     this.setState({
    //       usersInGroup: this.state.usersInGroup.filter(el => el.id !== userId),
    //       usersNotInGroup: [...this.state.usersNotInGroup, user]
    //     })

    //     showSnackbar({
    //       message: lang.groups.snackbar.userRemoved,
    //       severity: 'success'
    //     })
    //   })
    // }
  }

  render() {
    const { showErrors, isLoading, data, addGroup, assignedGroups } = this.state;
    const { classes, params, groups } = this.props;
    const { id } = params;
    const assignedGroupIds = assignedGroups ? assignedGroups.map(el => el.id) : [];

    const formSubmit = e => {
      const { onHandleSaveTest, showSnackbar } = this.props;
      this.setState({ showErrors: true }, () => {
        if (this.checkFormValidity()) {
          // tbd check for duplicates
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
      })
    }

    return (
      <Box sx={{ height: 'calc(100vh - 112px)' }}>
        <Form
          formRef={this.formRef}
          title="Edit test"
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
              handleChange={this.handleInputChange}
              required
              isLoading={isLoading || this.isDataLoading()}
              error={showErrors && !data.name}
              helperText={lang.main.validation.empty}
            />

            <Box display="flex" gap={2}>
              <TextField
                id="startDate"
                type="datetime-local"
                label="Test start"
                value={data.startDate?.replace(/\s/, 'T')}
                handleChange={this.handleInputChange}
                required
                isLoading={isLoading || this.isDataLoading()}
                error={showErrors && (!data.endDate || (data.endDate <= data.startDate))}
                helperText={(data.endDate <= data.startDate) ? lang.main.validation.invalidDates : lang.main.validation.empty}
              />
              
              <TextField
                id="endDate"
                type="datetime-local"
                label="Test end"
                value={data.endDate?.replace(/\s/, 'T')}
                handleChange={this.handleInputChange}
                required
                isLoading={isLoading || this.isDataLoading()}
                error={showErrors && (!data.endDate || (data.endDate <= data.startDate))}
                helperText={(data.endDate <= data.startDate) ? lang.main.validation.invalidDates : lang.main.validation.empty}
              />
            </Box>
            

            <TextField
              id="duration"
              type="number"
              label="Duration"
              value={data.duration}
              required
              handleChange={this.handleInputChange}
              isLoading={isLoading || this.isDataLoading()}
            />

            <Box className={classes.checkboxContainer}>
              <Checkbox
                id="isActive"
                label="Test active"
                checked={Boolean(data.isActive)}
              />

              <Checkbox
                id="showScores"
                label="Show score after completion"
                checked={Boolean(data.showScores)}
              />
            </Box>

          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>

            <Box className={classes.addContainer}>
              <Autocomplete
                options={groups?.filter(el => !assignedGroupIds.includes(el.id)) ?? []}
                getOptionLabel={option => option.name}
                onChange={(e, value) => this.handleChangeAddUser(value)}
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
                onClick={this.handleAddUserClick}
                disabled={addGroup === null}
              >
                <PersonAddAlt1Icon />
              </IconButton>
              {/* <Button variant="outlined" size="small" onClick={this.handleAddUserClick}>add</Button> */}
            </Box>
           

            <List dense>
              {assignedGroups && assignedGroups.map(group => 
                <ListItem 
                  key={group.id}
                  primary={group.name}
                  icon={<GroupsIcon />}
                  action={
                    <IconButton edge="end" size="small" onClick={this.handleRemoveUserClick(group.id)}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  }
                />  
              )}
              
            </List>
          </Grid>
        </Form>
      </Box>
    )
  }
}

const mapStateToProps = state => ({
  // id: state.addEntry?.data?.id,
  groups: state.groups.data
})

const mapDispatchToProps = dispatch => ({
  onHandleSaveTest: (id, data) => dispatch(handleSaveTest(id, data)),
  onHandleGetSingleTest: id => dispatch(handleGetSingleTest(id)),
  onHandleGetAssignedGroups: id => dispatch(handleGetAssignedGroups(id)),
  onHandleGetGroupList: () => dispatch(handleGetGroupList()),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withParams(withStyles(styles)(EditTest)));