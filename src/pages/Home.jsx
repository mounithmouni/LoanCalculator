import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext, useEffect } from "react";
import CurrencyFilter from "../components/CurrencyFilter";
import { CurrencyContext } from "../components/CurrencyContext";
import AmortizationScheduleTable from "../components/AmortizationScheduleTable";

export default function Home() {
  const [loanAmount, setLoanAmount] = useState("100000");
  const [interstRate, setInterestRate] = useState("8.5");
  const [tenure, setTenure] = useState("5");
  const [emi, setEmi] = useState(null);
  const { currencyType, currentExchange, handleChange, handleReset } =
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
    <div className="sm:mt-5 flex flex-col gap-5 justify-start sm:mx-60">
      <div>
        <h1 className="text-2xl  sm:w-full sm:text-4xl">
          Loan Calculator Dashboard
        </h1>
      </div>

      <div className="flex flex-col gap-4 w-1/2 sm:w-full sm:flex-row sm:gap-2">
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
            <h1 className="sm:text-xl">Monthly EMI:{emi}</h1>
          </div>
        )}
      </div>
      {emi && schedule && (
        <CurrencyFilter
          schedule={schedule}
          handleChange={handleChange}
          handleReset={handleReset}
          currencyType={currencyType}
        />
      )}
      {schedule && schedule.length !== 0 && (
        <div>
          <AmortizationScheduleTable
            schedule={schedule}
            conversionRate={currentExchange}
            currencyType={currencyType}
          />
        </div>
      )}
    </div>
  );
}
