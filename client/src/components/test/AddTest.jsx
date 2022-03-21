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
    isLoading: false,
    data: {}
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
      const { onHandleAddTest, showSnackbar, navigate } = this.props;
      this.setState({ showErrors: true }, () => {
        if (this.checkFormValidity()) {
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
              value={data.name}
              handleChange={this.handleInputChange}
              required
              isLoading={isLoading || this.isDataLoading()}
              error={showErrors && !data.name}
              helperText={lang.main.validation.empty}
            />

            <Box className={classes.checkboxContainer}>
              <Checkbox
                id="isActive"
                label="Test active"
                value={Boolean(data.isActive)}
                defaultChecked
              />

              <Checkbox
                id="showScores"
                label="Show score after completion"
                value={data.showScores}
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