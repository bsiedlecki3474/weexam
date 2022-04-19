import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import {
  Box,
  Typography
} from '@mui/material';

import { withStyles } from '@mui/styles';

const styles = theme => ({
  root: {
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1)
  },
  radio: {
    paddingRight: theme.spacing(1),
    marginLeft: "-2px"
  },
})

const AddNewQuestion = props => {
  const { classes, answerTypeId, text, onClick } = props;

  const icons = {
    1: <AddCircleOutlineOutlinedIcon />,
    2: <AddBoxOutlinedIcon />
  }

  return (
    <Box display="flex" className={classes.root} onClick={onClick}>
      <span className={classes.radio} >
        {icons[answerTypeId]}
      </span>
      
      <Typography variant="body1">
        {text ?? 'Add new answer...'}
      </Typography>
    </Box>
  )
}

export default withStyles(styles)(AddNewQuestion);