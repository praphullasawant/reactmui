import * as React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  useTheme,
  TextField,
  MenuItem,
} from "@mui/material";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import {
  retriveAllBanks,
  retrieveAccountForBank,
  createBankAccountforBank,
} from "../../../../api/BankApiService";
import { useEffect } from "react";

const initialValues = {
  bankName: "",
  accountNumber: "",
  checkIfActive: true,
};

const cashbookSchema = yup.object().shape({
  bankName: yup.string().required("required"),
  accountNumber: yup.string().required("required"),
});

const BankAccount = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [selectedBankId, setSelectedBankId] = useState("");
  const [selectedBank, setSelectedBank] = useState(initialValues.bankName);
  const [selectedBankName, setSelectedBankName] = useState(initialValues.bankName);

  const [bankAccountData, setBankAccountData] = useState([]);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [banks, setBanks] = useState([]);
  function handleEditClick() {}

  useEffect(() => refreshBanks(), []);

  function refreshBanks() {
    retriveAllBanks()
      .then((response) => setBanks(response.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    // Retrieve all banks when the component mounts
    retriveAllBanks()
      .then((response) => setBanks(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(selectedBank);
    if (selectedBank) {
      // Check if there's a selected bank
      retrieveAccountForBank(selectedBank) // Pass the selected bank to the function
        .then((response) => setBankAccountData(response.data))
        .catch((error) => console.log(error));
    }
  }, [selectedBank]);

  const handleSubmit = (values, { setSubmitting }) => {
    // Update the bankName value in the values object with the selectedBankName
    values.bankName = selectedBankName;
  
    // Call the createBankAccountforBank function with the updated values
    createBankAccountforBank(selectedBankId, values)
      .then((response) => {
        // Handle success, maybe show a success message or refresh the data
        console.log("Bank account created successfully", response);
  
        // You can also refresh the bank account data if needed
        retrieveAccountForBank(selectedBankId)
          .then((response) => setBankAccountData(response.data))
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        // Handle error, maybe show an error message
        console.error("Error creating bank account", error);
      })
      .finally(() => {
        // Reset the form and close the dialog
        setSubmitting(false);
        setOpen(false);
      });
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "accountNumber",
      headerName: "Account Number",
      flex: 1,
    },
    {
      field: "checkIfActive",
      headerName: "Status",
      flex: 1,
      valueGetter: (params) =>
        params.row.checkIfActive ? "Active" : "Inactive",
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <Button variant="contained" onClick={() => handleEditClick(params.id)}>
          <EditCalendarOutlinedIcon />
        </Button>
      ),
    },
  ];
  return (
    <Box>
      <Header title="Bank Account" />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Formik
          initialValues={selectedBank || initialValues}
          validationSchema={cashbookSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0,1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  select
                  label="Bank Name"
                  size="small"
                  name="bankName"
                  value={selectedBank} // Bind the value to Formik's form values
                  onChange={(e) => {
                    setSelectedBank(e.target.value); // Update selectedBank with the selected bank name
                    handleChange(e);
                  }}
                  onBlur={handleBlur} // Bind the blur event to Formik's handleBlu
                  sx={{ gridColumn: "span 4", width: "100%" }}
                >
                  {banks.map((bank) => (
                    <MenuItem key={bank.id} value={bank.id} onClick={() => {
                      setSelectedBankId(bank.id);
                      setSelectedBankName(bank.bankName);
                  }}>
                    {bank.bankName}
                  </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Account No."
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="accountNumber"
                  error={!!touched.accountNumber && !!errors.accountNumber}
                  helperText={touched.accountNumber && errors.accountNumber}
                  sx={{ gridColumn: "span 4" }}
                />
                <FormGroup sx={{ gridColumn: "span 4" }}>
                  <FormControlLabel
                    control={<Checkbox/>}
                    label="Check If Active"
                    name="checkIfActive" // Updated field name
                    value={values.checkIfActive} // Updated field name
                    checked={values.checkIfActive} // Updated field name
                    onChange={handleChange}
                  />
                </FormGroup>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "auto auto", // Adjust column layout
                    justifyContent: "flex-end", // Add some spacing between buttons
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<PublishOutlinedIcon />}
                    autoFocus
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<BlockOutlinedIcon />}
                    autoFocus
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
      <Box
        m="10px 100px 0 100px"
        height="40vh"
        sx={{
          "& .MuiDataGrid-toolbarContainer": {
            backgroundColor: colors.blueAccent[300],
          },
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={bankAccountData}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default BankAccount;
