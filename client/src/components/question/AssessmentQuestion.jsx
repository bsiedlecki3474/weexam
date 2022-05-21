import {
  Typography,
  Box,
  Paper,
  FormControl,
  RadioGroup
} from "@mui/material"

import { withStyles } from '@mui/styles';
import QuestionControl from "./QuestionControl";

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: theme.spacing(8)
  },
  question: {
    height: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
})

const AssessmentQuestion = props => {
  const { classes, index, question } = props
  // const { content, answers } = question;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h4" component="h1">Question #{index + 1}</Typography>
        {/* <Typography variant="small">sub headline</Typography> */}
        
      </Box>
      <Paper elevation={3} className={classes.question}>
        <Typography variant="h6" component="p" mb={4}>{question?.content}</Typography>
        {console.log(question?.answers)}
        <FormControl fullWidth>
          <RadioGroup>
            {(question?.answers ?? []).map(a => <QuestionControl
              // checked={a?.checked}
              value={a.value}
              answerTypeId={question?.answerTypeId}
              // handleChange={toggleQuestionAnswer(index, ai, data?.answerTypeId)}
            />)}
          </RadioGroup>
        </FormControl>
        
      </Paper>
    </Box>

  )

}

export default withStyles(styles)(AssessmentQuestion);