import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext, useEffect } from "react";
import AmortizationSchedule from "../components/AmortizationSchedule";
import CurrencyFilter from "../components/CurrencyFilter";
import { CurrencyContext } from "../components/CurrencyContext";

export default function Home() {
  const [loanAmount, setLoanAmount] = useState("100000");
  const [interstRate, setInterestRate] = useState("8.5");
  const [tenure, setTenure] = useState("5");
  const [emi, setEmi] = useState(null);
  const { currency, conversionRate, handleChange, handleReset } =
    useContext(CurrencyContext);
  const [schedule, setSchedule] = useState([]);

  const calculateEmi = () => {
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
        {emi && schedule.length > 0 && (
          <div>
            <h1 className="text-xl">Monthly EMI:{emi}</h1>
          </div>
        )}
      </div>
      {emi && schedule && (
        <CurrencyFilter
          schedule={schedule}
          handleChange={handleChange}
          handleReset={handleReset}
        />
      )}
      {schedule && schedule.length !== 0 && (
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
