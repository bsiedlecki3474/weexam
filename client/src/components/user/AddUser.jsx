import { Component, createRef } from "react";
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withNavigation from "../../hoc/withNavigation";

import {
  Box,
  Button,
  Typography,
  Grid,
  Collapse
} from "@mui/material"

import { handleAddUser } from '../../redux/actions/users';
import { showSnackbar } from '../../redux/actions/snackbar'

import { Form, TextField, Select, Checkbox } from '../form'
import lang from '../../lang'

const styles = theme => ({

})

class AddUser extends Component {
  constructor(props) {
    super(props)

    this.formRef = createRef();
  }

  state = {
    showErrors: false,
    isLoading: false,
    data: { isActive: true }
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

  render() {
    const { showErrors, isLoading, data } = this.state;
    const { classes } = this.props;

    const roles = [
      { id: 'admin', name: 'admin' },
      { id: 'user', name: 'user' }
    ]

    const formSubmit = e => {
      const { onHandleAddUser, showSnackbar, navigate } = this.props;
      this.setState({ showErrors: true }, () => {
        if (this.checkFormValidity()) {
          const { showErrors, isLoading } = this.state;
          // tbd check for duplicates
          onHandleAddUser(data).then(res => {
            try {
              const id = res.data.id;
              showSnackbar({
                message: lang.users.snackbar.userAdded,
                severity: 'success'
              })
              // tbd block request spam
              setTimeout(() => navigate('/users/' + id), 1000);
            } catch (e) {
              console.error(e)
              console.log(res)

              showSnackbar({
                message: lang.main.validation.genericError,
                severity: 'error'
              })
            }
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
          title="Add user"
          fullHeight
          submitButton={
            <Button variant="outlined" size="small" onClick={formSubmit}>add</Button>
          }
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="username"
              label="Username"
              value={data.username}
              handleChange={this.handleInputChange}
              required
              isLoading={isLoading || this.isDataLoading()}
              error={showErrors && !data.username}
              helperText={lang.main.validation.empty}
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
              error={showErrors && !data.lastName}
              helperText={lang.main.validation.empty}
            />

            <TextField
              id="password"
              autoComplete="new-password"
              type="password"
              label="Password"
              value={data.password}
              required
              handleChange={this.handleInputChange}
              isLoading={isLoading || this.isDataLoading()}
              error={showErrors && !data.password}
              helperText={lang.main.validation.empty}
            />

            <Select
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

            <Checkbox
              id="isActive"
              label="Account active"
              checked={data.isActive}
            />
          </Grid>
        </Form>
      </Box>
    )
  }
}

const mapStateToProps = state => ({
  id: state.addEntry?.data?.id
})

const mapDispatchToProps = dispatch => ({
  onHandleAddUser: data => dispatch(handleAddUser(data)),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(withStyles(styles)(AddUser)));