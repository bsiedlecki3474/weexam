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

import { handleAddGroup } from '../../redux/actions/groups';
import { showSnackbar } from '../../redux/actions/snackbar'

import { Form, TextField, Select, Checkbox } from '../form'
import lang from '../../lang'

const styles = theme => ({

})

class AddGroup extends Component {
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

    const formSubmit = e => {
      const { onHandleAddGroup, showSnackbar, navigate } = this.props;
      this.setState({ showErrors: true }, () => {
        if (this.checkFormValidity()) {
          const { showErrors, isLoading } = this.state;
          // tbd check for duplicates
          onHandleAddGroup(data).then(res => {
            try {
              const id = res.data.id;
              showSnackbar({
                message: lang.groups.snackbar.groupAdded,
                severity: 'success'
              })
              // tbd block request spam
              setTimeout(() => navigate('/groups/' + id), 1000);
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
          title="Add group"
          fullHeight
          submitAction={formSubmit}
          submitButtonText='add'
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
  onHandleAddGroup: data => dispatch(handleAddGroup(data)),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(withStyles(styles)(AddGroup)));