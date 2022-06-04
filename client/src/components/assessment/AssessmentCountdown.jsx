import { useState, useEffect } from 'react'
import { formatDuration, intervalToDuration } from 'date-fns'
import { withStyles } from '@mui/styles';
import { Typography } from "@mui/material"

const styles = theme => ({
  root: {
    position: 'absolute',
    right: 0
  }
})

const AssessmentCountdown = ({ endDate, classes }) => {
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const [time, setTime] = useState(Date.now());

  const countdown = formatDuration(intervalToDuration({
    start: time,
    end: new Date(endDate)
  }), {
    format: ['hours', 'minutes', 'seconds']
  })

  return endDate && <Typography variant="p" className={classes.root}>{countdown}</Typography>
}

export default withStyles(styles)(AssessmentCountdown);