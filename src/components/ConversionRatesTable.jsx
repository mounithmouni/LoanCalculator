import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import getExchangeRate from "../api/apiClient";
import { useEffect, useState } from "react";

export default function ConversionRatesTable({ currencyType }) {
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    getExchangeRate(currencyType)
      .then((value) => {
        if (value && value.data && value.data.conversion_rates) {
          setExchangeRates(value.data.conversion_rates);
        }
      })
      .catch(console.error);
  }, [currencyType]);

  const columns = [
    { id: "currency", label: "Currency", minWidth: 100 },
    {
      id: "rate",
      label: "Rate",
      minWidth: 100,
      align: "right",
      format: (value) => value.toFixed(4),
    },
  ];

  function getRows() {
    const rows =
      Object.entries(exchangeRates).map(([currency, rate]) => ({
        currency,
        rate,
      })) ?? [];
    return rows;
  }

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "20px" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="currency rates table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getRows()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        style={{
          marginRight: "-10px",
          marginLeft: "-10px",
          padding: "0px 5px 0px 5px",
        }}
        component="div"
        count={getRows().length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
