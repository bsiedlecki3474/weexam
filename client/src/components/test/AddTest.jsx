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

import { handleAddTest } from '../../redux/actions/tests';
import { showSnackbar } from '../../redux/actions/snackbar'

import { Form, TextField, Select, Checkbox } from '../form'
import lang from '../../lang'

const styles = theme => ({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& > div:not(:first-child)': {
      marginTop: 0
    }
  }
})

class AddTest extends Component {
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

    const formSubmit = e => {
      const { onHandleAddTest, showSnackbar, navigate } = this.props;
      this.setState({ showErrors: true }, () => {
        if (this.checkFormValidity()) {
          const { showErrors, isLoading, ...data } = this.state;
          // tbd check for duplicates
          onHandleAddTest(data).then(res => {
            showSnackbar({
              message: lang.tests.snackbar.testAdded,
              severity: 'success'
            })
            // tbd block request spam
            setTimeout(() => navigate('/tests/' + res.data.id), 1000);
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
          title="Add test"
          fullHeight
          submitButton={
            <Button variant="outlined" size="small" onClick={formSubmit}>add</Button>
          }
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="name"
              label="Test name"
              value={this.state.name}
              handleChange={this.handleInputChange}
              required
              isLoading={isLoading || this.isDataLoading()}
              error={showErrors && !this.state.name}
              helperText={lang.main.validation.empty}
            />

            <Box display="flex" gap={2}>
              <TextField
                id="startDate"
                type="datetime-local"
                label="Test start"
                value={this.state.startDate}
                handleChange={this.handleInputChange}
                required
                isLoading={isLoading || this.isDataLoading()}
                error={showErrors && (!this.state.endDate || (this.state.endDate <= this.state.startDate))}
                helperText={(this.state.endDate <= this.state.startDate) ? lang.main.validation.invalidDates : lang.main.validation.empty}
              />
              
              <TextField
                id="endDate"
                type="datetime-local"
                label="Test end"
                value={this.state.endDate}
                handleChange={this.handleInputChange}
                required
                isLoading={isLoading || this.isDataLoading()}
                error={showErrors && (!this.state.endDate || (this.state.endDate <= this.state.startDate))}
                helperText={(this.state.endDate <= this.state.startDate) ? lang.main.validation.invalidDates : lang.main.validation.empty}
              />
            </Box>
            

            <TextField
              id="duration"
              type="number"
              label="Duration"
              value={this.state.duration}
              required
              handleChange={this.handleInputChange}
              isLoading={isLoading || this.isDataLoading()}
            />

            <Box className={classes.checkboxContainer}>
              <Checkbox
                id="isActive"
                label="Test active"
                value={this.state.isActive}
                defaultChecked
              />

              <Checkbox
                id="showScores"
                label="Show score after completion"
                value={this.state.showScores}
                defaultChecked
              />
            </Box>

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
  onHandleAddTest: data => dispatch(handleAddTest(data)),
  showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(withStyles(styles)(AddTest)));