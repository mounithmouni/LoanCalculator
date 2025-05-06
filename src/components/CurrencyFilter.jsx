import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

export default function CurrencyFilter({
  schedule,
  handleChange,
  handleReset,
}) {
  return (
    <div>
      {schedule.length !== 0 && (
        <div className="flex justify-between  items-center">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel sx={{ fontSize: "12px", textAlign: "center" }}>
              Currency
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"USD"}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              <MenuItem value="JPY">JPY</MenuItem>
              <MenuItem value="AUD">AUD</MenuItem>
              <MenuItem value="CAD">CAD</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" className="h-12" onClick={handleReset}>
            Reset Table
          </Button>
        </div>
      )}
    </div>
  );
}
