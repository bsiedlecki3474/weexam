import { Component, createRef } from "react";
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";
import ListItem from '../ListItem'

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
  handleSaveUser,
  handleGetSingleUser,
} from '../../redux/actions/users';
import { showSnackbar } from '../../redux/actions/snackbar'

import { Form, TextField, Select, Checkbox } from '../form'
import lang from '../../lang'
import { StaticField } from "../form";

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

class EditUser extends Component {
  constructor(props) {
    super(props)

    this.formRef = createRef();
  }

  state = {
    showErrors: false,
    isLoading: false,
    data: {}
  }

  componentDidMount() {
    console.log(this.props)
    const {
      params,
      onHandleGetSingleUser
    } = this.props;
    const { id } = params;
    onHandleGetSingleUser(id).then(res => this.setState(state => ({...state, data: res.data})))
  }

  checkFormValidity = () => this.formRef.current.checkValidity();

  handleInputChange = (e, key) => {
    const value = e.target.value;
    this.setState({ data: {...this.state.data, [key]: value }});
  }

  handleCheckboxChange = key => (e, value) => {
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
    const { showErrors, isLoading, data } = this.state;
    const { classes, params } = this.props;
    const { id } = params;

    const roles = [
      { id: 'admin', name: 'admin' },
      { id: 'user', name: 'user' }
    ]

    const formSubmit = e => {
      const { onHandleSaveUser, showSnackbar } = this.props;
      this.setState({ showErrors: true }, () => {
        if (this.checkFormValidity()) {
          // tbd check for duplicates
          onHandleSaveUser(id, data).then(res => {
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
          title="Edit user"
          fullHeight
          submitButton={
            <Button variant="outlined" size="small" onClick={formSubmit}>save</Button>
          }
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <StaticField
              label="Username"
              value={data.username}
            />

            <TextField
              id="firstName"
              label="First name"
              value={data.firstName}
              handleChange={this.handleInputChange}
              required
              isLoading={isLoading || this.isDataLoading()}
              error={showErrors && !data.firstName}
              helperText={lang.main.validation.empty}
            />

            <TextField
              id="lastName"
              label="Last name"
              value={data.lastName}
              required
              handleChange={this.handleInputChange}
              isLoading={isLoading || this.isDataLoading()}
            />

            {data.role === "root"
              ? <StaticField
                  label="Role"
                  value={data.role}
                />
              : <Select
                  id="role"
                  value={data.role}
                  label="Role"
                  options={roles}
                  handleChange={this.handleInputChange}
                  required
                  error={showErrors && !data.role}
                  helperText={lang.main.validation.empty}
                  isLoading={isLoading || this.isDataLoading()}
                />
            }

            <Checkbox
              id="isActive"
              label="Account active"
              checked={Boolean(data.isActive)}
              onChange={this.handleCheckboxChange('isActive')}
            />

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
  onHandleSaveUser: (id, data) => dispatch(handleSaveUser(id, data)),
  onHandleGetSingleUser: id => dispatch(handleGetSingleUser(id)),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withParams(withStyles(styles)(EditUser)));