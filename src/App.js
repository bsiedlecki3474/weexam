import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useRoutes } from 'react-router-dom';
// import routes from './routes';
import store from './redux/store.js'

import { saveState } from './helpers/localStorage';

import { Provider, useSelector } from 'react-redux';

import Router from './router/Router.js'

// window.onbeforeunload = () => {
//   alert(1)
//   saveState(store.getState());
// }

const theme = createTheme({
  palette: {
    primary: {
      main: green[600],
    },
  }
});

const App = () => {
  // const { isLoggedIn } = useSelector((state) => state.auth);

  // console.log(useSelector((state) => state))
  // const queryClient = new QueryClient()

  // const state = store.getState();
  // const auth = state.auth;
  // const isAuthenticated = auth?.data?.token !== null;

  
  // const router = useRoutes(routes(isLoggedIn));
  
  // const isLoggedIn = false;
  // console.log(store.getState())
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* <QueryClientProvider client={queryClient}> */}
          {/* {router} */}
          <Router />
        {/* </QueryClientProvider> */}
      </ThemeProvider> 
    </Provider>
    
  )
}

export default App;
