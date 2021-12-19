import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

import { QueryClient, QueryClientProvider } from 'react-query';

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
  const queryClient = new QueryClient()

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {router}
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App;
