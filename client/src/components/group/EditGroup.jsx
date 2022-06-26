import { Component, createRef } from "react";
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";
import withNavigation from "../../hoc/withNavigation";
import ListItem from '../ListItem'

import PersonIcon from '@mui/icons-material/Person';
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
  handleSaveGroup,
  handleDeleteGroup,
  handleGetSingleGroup,
  handleGetAssignedUsers,
  handleAddUserToGroup,
  handleRemoveUserFromGroup,
} from '../../redux/actions/groups';
import { handleGetUserList } from '../../redux/actions/users';

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
  }
})

class EditGroup extends Component {
  constructor(props) {
    super(props)

    this.formRef = createRef();
  }

  state = {
    showErrors: false,
    isLoading: false,
    data: {},
    addUser: null
  }

  componentDidMount() {
    console.log(this.props)
    const {
      params,
      onHandleGetUserList,
      onHandleGetSingleGroup,
      onHandleGetAssignedUsers
    } = this.props;
    const { id } = params;
    onHandleGetUserList();
    onHandleGetSingleGroup(id).then(res => this.setState(state => ({...state, data: res.data})))
    onHandleGetAssignedUsers(id).then(res => this.setState(state => ({...state, assignedUsers: res.data})))
    // onHandleGetUsersInGroup(id).then(res => this.setState(state => ({...state, usersInGroup: res.data})))
    // onHandleGetUsersNotInGroup(id).then(res => this.setState(state => ({...state, usersNotInGroup: res.data})))
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

  handleChangeAddUser = option => this.setState({ addUser: option });

  handleAddUserClick = e => {
    const { addUser } = this.state;
    const { params, showSnackbar, onHandleAddUserToGroup } = this.props;
    const { id } = params;

    onHandleAddUserToGroup(addUser?.id, id).then(res => {
      this.setState({
        assignedUsers: [...this.state.assignedUsers, addUser],
        addUser: null
      })

      showSnackbar({
        message: lang.groups.snackbar.userAdded,
        severity: 'success'
      })
    })
  }

  handleRemoveUserClick = userId => e => {
    if (window.confirm(lang.groups.confirm.removeGroupUser)) {
      const { assignedUsers } = this.state;
      const { users, params, showSnackbar, onHandleRemoveUserFromGroup } = this.props;
      const { id } = params;
      onHandleRemoveUserFromGroup(userId, id).then(res => {
        // const user = users.find(el => el.id == userId)

        this.setState({
          assignedUsers: assignedUsers.filter(el => el.id !== userId),
        })

        showSnackbar({
          message: lang.groups.snackbar.userRemoved,
          severity: 'success'
        })
      })
    }
  }

  render() {
    const { showErrors, isLoading, data, addUser, assignedUsers } = this.state;
    const { classes, params, users, showSnackbar } = this.props;
    const { id } = params;
    const assignedUsersIds = assignedUsers ? assignedUsers.map(el => el.id) : [];

    const formSubmit = e => {
      const { onHandleSaveGroup } = this.props;
      this.setState({ showErrors: true }, () => {
        if (this.checkFormValidity()) {
          // tbd check for duplicates
          onHandleSaveGroup(id, data).then(res => {
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

    const handleDelete = () => {
      const { params, isRoot, navigate, onHandleDeleteGroup } = this.props;
      const { id } = params;
      if (window.confirm(lang.groups.confirm.deleteGroup)) {
        isRoot && onHandleDeleteGroup(id).then(() => {
          showSnackbar({
            message: lang.groups.snackbar.groupDeleted,
            severity: 'success'
          });
          navigate('/groups');
        });
      }
     
    }

    return (
      <Box sx={{ height: 'calc(100vh - 112px)' }}>
        <Form
          formRef={this.formRef}
          title="Edit group"
          fullHeight
          submitAction={formSubmit}
          submitButtonText='save'
          deleteAction={handleDelete}
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="name"
              label="Group name"
              value={data.name}
              handleChange={this.handleInputChange}
              required
              isLoading={isLoading || this.isDataLoading()}
              error={showErrors && !data.name}
              helperText={lang.main.validation.empty}
            />

            <Checkbox
              id="isActive"
              label="Group active"
              checked={Boolean(data.isActive)}
              onChange={this.handleCheckboxChange('isActive')}
            />

          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box className={classes.addContainer}>
              <Autocomplete
                options={users?.filter(el => !assignedUsersIds.includes(el.id)) ?? []}
                getOptionLabel={option => `${option.firstName} ${option.lastName}`}
                onChange={(e, value) => this.handleChangeAddUser(value)}
                value={addUser}
                fullWidth
                renderInput={(params) => 
                  <MdlTextField 
                    {...params}
                    fullWidth
                    variant="standard"
                    label="Add member"
                    // value={addUser?.id}
                    
                  />
                }
              />
              <IconButton
                className={classes.addButton}
                onClick={this.handleAddUserClick}
                disabled={addUser === null}
              >
                <PersonAddAlt1Icon />
              </IconButton>
              {/* <Button variant="outlined" size="small" onClick={this.handleAddUserClick}>add</Button> */}
            </Box>
           

            <List dense>
              {assignedUsers && assignedUsers.map(user => 
                <ListItem 
                  key={user.id}
                  primary={`${user.firstName} ${user.lastName}`}
                  icon={<PersonIcon />}
                  action={
                    <IconButton edge="end" size="small" onClick={this.handleRemoveUserClick(user.id)}>
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
  users: state.users.data,
  isRoot: state?.auth?.data?.role === 'root'
})

const mapDispatchToProps = dispatch => ({
  onHandleGetUserList: () => dispatch(handleGetUserList()),
  onHandleSaveGroup: (id, data) => dispatch(handleSaveGroup(id, data)),
  onHandleDeleteGroup: id => dispatch(handleDeleteGroup(id)),
  onHandleGetSingleGroup: id => dispatch(handleGetSingleGroup(id)),
  onHandleGetAssignedUsers: id => dispatch(handleGetAssignedUsers(id)),
  onHandleAddUserToGroup: (userId, groupId) => dispatch(handleAddUserToGroup(userId, groupId)),
  onHandleRemoveUserFromGroup: (userId, groupId) => dispatch(handleRemoveUserFromGroup(userId, groupId)),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withParams(
    withNavigation(
      withStyles(styles)(EditGroup)
    )
  )
);