import { Component, createRef } from "react";
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import {
  Box,
  Button,
  Typography,
  Grid,
  Collapse
} from "@mui/material"

import { Form, TextField, Select, Checkbox } from './Form'
import { handleAddUser } from '../redux/actions/users';
import lang from '../lang'

const styles = theme => ({

})

class AddUser extends Component {
  constructor(props) {
    super(props)

    this.formRef = createRef();
  }

  state = {
    showErrors: false,
    isLoading: false
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

  render() {
    const { showErrors, isLoading } = this.state;
    const { classes } = this.props;

    const roles = [
      { id: 'admin', name: 'admin' },
      { id: 'user', name: 'user' }
    ]

    const formSubmit = e => {
      const { onHandleAddUser } = this.props;
      console.log(e)
      this.setState({ showErrors: true }, () => {
        if (this.checkFormValidity()) {
          const { showErrors, isLoading, ...data } = this.state;
          console.log(data)
          onHandleAddUser(data).then(
            alert('user added')
          )
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
              value={this.state.username}
              handleChange={this.handleInputChange}
              required
              isLoading={isLoading || this.isDataLoading()}
              error={showErrors && !this.state.username}
              helperText={lang.main.validation.empty}
            />

            <TextField
              id="firstName"
              label="First name"
              value={this.state.firstName}
              handleChange={this.handleInputChange}
              required
              isLoading={isLoading || this.isDataLoading()}
              error={showErrors && !this.state.firstName}
              helperText={lang.main.validation.empty}
            />

            <TextField
              id="lastName"
              label="Last name"
              value={this.state.lastName}
              handleChange={this.handleInputChange}
              isLoading={isLoading || this.isDataLoading()}
            />

            <TextField
              id="password"
              autocomplete="new-password"
              type="password"
              label="Password"
              value={this.state.password}
              handleChange={this.handleInputChange}
              isLoading={isLoading || this.isDataLoading()}
            // // error={(showErrors && !enquiry.registrationDate) || enquiry.registrationDate < currentDate}
            // helperText={enquiry.registrationDate < currentDate ? i18n.main?.validation?.incorrect : i18n.main?.validation?.empty}
            />

            <Select
              id="role"
              value={this.state.role}
              label="Role"
              options={roles}
              handleChange={this.handleInputChange}
              required
              error={showErrors && !this.state.role}
              helperText={lang.main.validation.empty}
              isLoading={isLoading || this.isDataLoading()}
            />


            <Checkbox
              label="Account active"
              value={this.state.isActive}
              defaultChecked
            />
          </Grid>
        </Form>
      </Box>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  onHandleAddUser: data => dispatch(handleAddUser(data))
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(AddUser));