import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

const theme = createTheme({
  palette: {
    primary: {
      main: green[600],
    },
  }
});

function App() {
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const isLoggedIn = false;
  const router = useRoutes(routes(isLoggedIn));

  return <ThemeProvider theme={theme}>
    {router}
  </ThemeProvider>;
}

export default App;
