import { TOGGLE_THEME } from '../types/theme'

const theme = (state = null, action) => {
  switch (action.type) {
		case TOGGLE_THEME:
      return state === 'light' ? 'dark' : 'light'

		default:
			return state
	}
}

export default theme;