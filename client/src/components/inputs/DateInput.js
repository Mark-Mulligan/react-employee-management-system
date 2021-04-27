import React from "react";
import {
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  dateInput: {
    marginTop: 0
  }
}));

const DateInput = (props) => {
  const classes = useStyles();

  return (
      <KeyboardDatePicker
        inputVariant="outlined"
        className={classes.dateInput}
        fullWidth
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id={props.id}
        label="Date Hired"
        value={props.value}
        onChange={props.onDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
  );
};

export default DateInput;