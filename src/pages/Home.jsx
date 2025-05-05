import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import AmortizationSchedule from "../components/AmortizationSchedule";
import axios from "axios";

export default function Home() {
  const [loanAmount, setLoanAmount] = useState("100000");
  const [interstRate, setInterestRate] = useState("8.5");
  const [tenure, setTenure] = useState("5");
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1);
  const fetchData = async (val) => {
    const res = await axios.get(
      `https://v6.exchangerate-api.com/v6/4df3bade102da003b9e67388/latest/USD`
    );
    const datas = res.data.conversion_rates[val];
    setConversionRate(datas);
    console.log(datas);
  };

  const handleChange = (e) => {
    setCurrency(e.target.value);
    fetchData(e.target.value);
  };

  const calculateEmi = () => {
    console.log(currency);
    const principal = parseFloat(loanAmount);
    const iRate = parseFloat(interstRate) / 12 / 100;
    const months = parseInt(tenure) * 12;

    if (!principal || !iRate || !months) {
      setEmi(null);
      setSchedule([]);
      return;
    }

    const emiCalc =
      (principal * iRate * Math.pow(1 + iRate, months)) /
      (Math.pow(1 + iRate, months) - 1);

    setEmi(emiCalc.toFixed(2));
    let balance = principal;
    let newSchedule = [];

    for (let i = 1; i <= months; i++) {
      const interest = balance * iRate;
      const principalPaid = emiCalc - interest;
      balance -= principalPaid;

      newSchedule.push({
        month: i,
        principalPaid: principalPaid.toFixed(2),
        interstPaid: interest.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : "0.00",
      });
    }
    setSchedule(newSchedule);
    console.log(schedule);
  };
  const handleReset = () => {
    setSchedule([]);
    setConversionRate(1);
  };

  return (
    <div className="my-20 flex flex-col gap-5 justify-start mx-60">
      <div>
        <h1 className="text-4xl">Loan Calculator Dashboard</h1>
      </div>

      <div className="flex gap-2">
        <TextField
          required
          id="outlined-required"
          label="Required"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Interest Rate(%)"
          variant="outlined"
          value={interstRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Term (years)"
          variant="outlined"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        />
      </div>
      <div>
        <Button variant="contained" onClick={calculateEmi}>
          Calculate
        </Button>
      </div>
      <div>
        {emi && schedule.length !== 0 && (
          <div>
            <h1 className="text-xl">Monthly EMI:{emi}</h1>
          </div>
        )}
      </div>
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
      {schedule.length !== 0 && (
        <div>
          <AmortizationSchedule
            schedule={schedule}
            conversionRate={conversionRate}
            currency={currency}
          />
        </div>
      )}
    </div>
  );
}
