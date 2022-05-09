import { Provider } from 'react-redux';
import store from './redux/store.js'
import ThemeWrapper from './ThemeWrapper.js';

window.DASH = '—';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeWrapper />
    </Provider>
  )
}

export default App;
