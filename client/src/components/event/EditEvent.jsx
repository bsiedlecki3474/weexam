import { Component, createRef } from "react";
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";
import withNavigation from "../../hoc/withNavigation";
import {
  Box,
  IconButton,
  Button,
  Grid,
  TextField as MdlTextField
} from "@mui/material"

import {
  handleGetSingleEvent,
  handleSaveEvent
} from '../../redux/actions/events';

import { showSnackbar } from '../../redux/actions/snackbar'

import { Form, TextField, StaticField, Checkbox } from '../form'
import lang from '../../lang'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { format } from 'date-fns'

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
    data: {}
  }

  componentDidMount() {
    console.log(this.props)
    const {
      params,
      onHandleGetSingleEvent,
    } = this.props;
    const { eventId } = params;
    onHandleGetSingleEvent(eventId).then(res => this.setState(state => ({...state, data: res.data})))
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
    const { showErrors, isLoading, data } = this.state;
    const { classes, navigate, params } = this.props;
    const { testId, eventId } = params;

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

          </Grid>
        </Form>
      </Box>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onHandleSaveEvent: (id, data) => dispatch(handleSaveEvent(id, data)),
  onHandleGetSingleEvent: id => dispatch(handleGetSingleEvent(id)),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(null, mapDispatchToProps)(
  withParams(
    withNavigation(
      withStyles(styles)(EditEvent)
    )
  )
);