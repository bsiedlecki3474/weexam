import { FormGroup, FormControlLabel, Checkbox as MaterialCheckbox } from '@mui/material'

const Checkbox = props => {
  return (
    <FormGroup sx={{ mt: 2 }}>
      <FormControlLabel control={
        <MaterialCheckbox {...props} />
      } label={props.label} />
    </FormGroup>
  )
}

export default Checkbox;