import {
	Snackbar as MdlSnackbar,
	Alert,
	Slide
} from '@mui/material'
import { connect } from 'react-redux';
import { hideSnackbar } from '../redux/actions/snackbar';

const Transition = props => {
	const timeout = props.snackbarTransitionTimeout;
	return <Slide
		{...props}
		timeout={timeout}
		direction="up"
	/>
}

const Snackbar = props => {
	const { snackbar, hideSnackbar } = props;
	const {
		snackbarOpen,
		snackbarMessage,
		snackbarDuration,
		snackbarAction,
		snackbarSeverity
	} = snackbar;

	return snackbarMessage ? (
		<MdlSnackbar
			open={snackbarOpen}
			TransitionComponent={Transition}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			autoHideDuration={snackbarDuration}
			onClose={hideSnackbar}>
			<Alert
				sx={{ width: '100%' }}
				onClose={hideSnackbar}
				severity={snackbarSeverity}
				action={snackbarAction}>
				{snackbarMessage}
			</Alert>
		</MdlSnackbar>     
	) : null
}

const mapStateToProps = state => {
  return {
    snackbar: state.snackbar
  }
}

const mapDispatchToProps = dispatch => ({
	hideSnackbar: () => dispatch(hideSnackbar())
})

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar)