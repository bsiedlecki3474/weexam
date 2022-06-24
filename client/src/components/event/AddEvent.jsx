import { Component, createRef } from "react";
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';

import withNavigation from "../../hoc/withNavigation";
import withParams from "../../hoc/withParams";

import {
  Box,
  IconButton,
  Button,
  Typography,
  Grid,
  Collapse
} from "@mui/material"

import { handleAddEvent } from '../../redux/actions/events';
import { showSnackbar } from '../../redux/actions/snackbar'

import { Form, TextField, Select, Checkbox } from '../form'
import lang from '../../lang'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { format } from 'date-fns'

const styles = theme => ({

})

class AddEvent extends Component {
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
    const { classes, navigate, params } = this.props;
    const { testId } = params;

    const formSubmit = e => {
      const { onHandleAddEvent, showSnackbar, navigate, params } = this.props;
      const { testId } = params;
      this.setState({ showErrors: true }, () => {
        if (this.checkFormValidity()) {
          onHandleAddEvent(testId, data).then(res => {
            showSnackbar({
              message: lang.events.snackbar.eventAdded,
              severity: 'success'
            })
            // tbd block request spam
            setTimeout(() => navigate(`/tests/${testId}/event/${res.data.id}`), 1000);
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
          title={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton edge="end" size="small" onClick={e => navigate(`/tests/${testId}`)}>
                <ArrowBackIcon fontSize="inherit" />
              </IconButton>
              Add event
            </Box>
          }
          fullHeight
          submitButton={
            <Button variant="outlined" size="small" onClick={formSubmit}>add</Button>
          }
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="startDate"
              type="datetime-local"
              label="Test start"
              value={data.startDate ? format(new Date(data.startDate), 'yyyy-MM-dd\'T\'HH:mm') : null}
              handleChange={this.handleInputChange}
              required
              isLoading={isLoading}
              error={showErrors && (!data.endDate || (data.endDate <= data.startDate))}
              helperText={(data.endDate <= data.startDate)
                ? lang.main.validation.invalidDates
                : lang.main.validation.empty
              }
            />

            <TextField
              id="endDate"
              type="datetime-local"
              label="Test end"
              value={data.endDate ? format(new Date(data.endDate), 'yyyy-MM-dd\'T\'HH:mm') : null}
              handleChange={this.handleInputChange}
              required
              isLoading={isLoading}
              error={showErrors && (!data.endDate || (data.endDate <= data.startDate))}
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
  onHandleAddEvent: (testId, data) => dispatch(handleAddEvent(testId, data)),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withParams(
    withNavigation(
      withStyles(styles)(AddEvent)
    )
  )
);