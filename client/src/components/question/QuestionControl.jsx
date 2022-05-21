import {
  FormControlLabel,
  Radio,
  Checkbox
} from "@mui/material"

const answerTypeControls = {
  1: <Radio />,
  2: <Checkbox />
}

const QuestionControl = props => {
  const { checked, edit, editTextfield, value, answerTypeId, handleChange } = props;

  return <FormControlLabel
    // sx={{ width: '100%' }}
    checked={checked ?? false}
    onChange={handleChange}
    disabled={!value}
    control={answerTypeControls[answerTypeId ?? 1]}
    // value={el.value}
    label={
      (edit ?? false)
        ? editTextfield
        : (value ?? 'Edit answer...')
    }
  />
}

export default QuestionControl;