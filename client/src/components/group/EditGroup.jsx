import { Component, createRef } from "react";
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";
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
  handleGetSingleGroup,
  handleGetAssignedUsers,
  handleRemoveUserFromGroup
} from '../../redux/actions/groups/group';
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
    onHandleGetSingleGroup(id).then(res => this.setState(state => ({...state, ...res.data})))
    onHandleGetAssignedUsers(id).then(res => this.setState(state => ({...state, assignedUsers: res.data})))
    // onHandleGetUsersInGroup(id).then(res => this.setState(state => ({...state, usersInGroup: res.data})))
    // onHandleGetUsersNotInGroup(id).then(res => this.setState(state => ({...state, usersNotInGroup: res.data})))
  }

  checkFormValidity = () => this.formRef.current.checkValidity();

  handleInputChange = (e, key) => {
    const value = e.target.value;
    this.setState({ [key]: value });
  }

  handleSelectChange = (key, val) => {
    const value = val?.id;
    this.setState({ [key]: value });
  }

  handleSelectMultipleChange = (key, vals) => {
    const values = vals ? vals.map(el => el.id) : [];
    this.setState({ [key]: values });
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
    const { showErrors, isLoading, addUser, assignedUsers } = this.state;
    const { classes, users } = this.props;
    const assignedUsersIds = assignedUsers ? assignedUsers.map(el => el.id) : [];

    const formSubmit = e => {
      const { onHandleAddGroup, showSnackbar, navigate } = this.props;
      this.setState({ showErrors: true }, () => {
        if (this.checkFormValidity()) {
          const { showErrors, isLoading, ...data } = this.state;
          // tbd check for duplicates
          onHandleAddGroup(data).then(res => {
            showSnackbar({
              message: lang.groups.snackbar.groupAdded,
              severity: 'success'
            })
            // tbd block request spam
            setTimeout(() => navigate('/groups/' + res.data.id), 1000);
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
          title="Edit group"
          fullHeight
          submitButton={
            <Button variant="outlined" size="small" onClick={formSubmit}>save</Button>
          }
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="name"
              label="Group name"
              value={this.state.name}
              handleChange={this.handleInputChange}
              required
              value={this.state.name}
              isLoading={isLoading || this.isDataLoading()}
              error={showErrors && !this.state.name}
              helperText={lang.main.validation.empty}
            />

            <Checkbox
              id="isActive"
              label="Group active"
              checked={Boolean(this.state.isActive)}
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

const mapDispatchToProps = dispatch => ({
  onHandleGetSingleGroup: id => dispatch(handleGetSingleGroup(id)),
  onHandleGetAssignedUsers: id => dispatch(handleGetAssignedUsers(id)),
  onHandleRemoveUserFromGroup: (userId, groupId) => dispatch(handleRemoveUserFromGroup(userId, groupId)),
  onHandleGetUserList: () => dispatch(handleGetUserList()),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(null, mapDispatchToProps)(withParams(withStyles(styles)(EditGroup)));