import { Provider } from 'react-redux';
import store from './redux/store.js'
import ThemeWrapper from './ThemeWrapper.js';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeWrapper />
    </Provider>
  )
}

export default App;
