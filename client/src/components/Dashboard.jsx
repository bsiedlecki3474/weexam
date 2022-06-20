import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { withStyles } from '@mui/styles';

import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
  Button
} from "@mui/material"


import { getUserTestEvents } from "../api/users";

const styles = theme => ({
  card: {
    position: 'relative'
  },
  score: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(3)
  }
})

const Dashboard = ({ classes }) => {
  const [events, setEvents] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getUserTestEvents().then(res => setEvents(res));
  }, []);

  return <Box>
    <Typography variant="h5" mb={2}>My tests</Typography>

    <Grid container spacing={3}>
      {events.map(event => 
        <Grid item xs={12} sm={6} md={4} lg={3} spacing={3}>
          <Card elevation={3} className={classes.card}>
            <CardContent>
              <Typography variant="h6" component="div">
                {event.name}
              </Typography>
              <Typography gutterBottom variant="p" color="text.secondary">
                {event.administrator}
              </Typography>
              <Typography variant="body2">
                {event.startDate}
              </Typography>
              <Typography variant="body2">
                {event.endDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.duration} min
              </Typography>
              <div className={classes.score}>
                {event.totalScore && event.userScore != null && <>
                  <Typography variant="body2">
                    {event.userScore} / {event.totalScore}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.totalScore && (event.userScore / event.totalScore * 100).toFixed(2)}%
                  </Typography>
                </>}
                
              </div>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                disabled={new Date(event.endDate).getTime() < new Date().getTime()}
                onClick={e => navigate('/events/' + event.id)}
              >
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )}
    </Grid>
  </Box>

}

export default withStyles(styles)(Dashboard);