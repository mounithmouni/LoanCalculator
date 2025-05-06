import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";

export default function AmortizationSchedule({
  schedule,
  conversionRate,
  currency,
}) {
  const columns = [
    { width: 80, label: "Month", dataKey: "month", numeric: true },
    {
      width: 140,
      label: "Principal Paid",
      dataKey: "principalPaid",
      numeric: true,
    },
    {
      width: 140,
      label: "Interest Paid",
      dataKey: "interstPaid",
      numeric: true,
    },
    { width: 140, label: "Balance", dataKey: "balance", numeric: true },
  ];
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    INR: "₹",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
  };

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead: React.forwardRef((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric ? "right" : "left"}
            style={{ width: column.width }}
            sx={{ backgroundColor: "background.paper" }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric ? "right" : "left"}
          >
            {column.dataKey !== "month"
              ? currencySymbols[currency] +
                " " +
                (row[column.dataKey] * conversionRate).toFixed(2)
              : row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }
  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <h1 className="ml-2 p-2 text-xl">
        Amortization schedule{`(${currency})`}
      </h1>
      <TableVirtuoso
        data={schedule}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
      {/* {console.log(schedule)} */}
    </Paper>
  );
}
