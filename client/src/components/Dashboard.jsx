import { useState, useEffect } from "react";

import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button
} from "@mui/material"


import { getUserTestEvents } from "../api/users";

const Dashboard = props => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    console.log(props)
    getUserTestEvents().then(res => setEvents(res));
  }, []);

  return <div>
    <Typography variant="h5" mb={2}>My tests</Typography>

    <Grid container spacing={3}  >
      {[...events, ...events, ...events, ...events, ...events].map(event => 
        <Grid item xs={12} sm={6} md={4} lg={3} spacing={3}>
          <Card elevation={3}>
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
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Start
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )}
    </Grid>

  </div>

}

export default Dashboard;