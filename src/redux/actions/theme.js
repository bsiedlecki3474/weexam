import { TOGGLE_THEME } from '../types/theme'

const handleToggleTheme = () => dispatch => {
  dispatch({ type: TOGGLE_THEME });
}

export {
  handleToggleTheme
}