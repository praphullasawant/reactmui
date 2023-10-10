import * as React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
  TextField,
} from "@mui/material";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  retrieveBanks,
  retrieveCashbook,
} from "../../../../api/CashbookApiService";
import {
  retriveAllBanks,
  retrieveAccountForBank,
} from "../../../../api/BankApiService";

const initialValues = {
  receiptBookCode: "",
  receiptBookName: "",
  cashReceiptNo: "",
  bankReceiptNo: "",
  adjustmentReceiptNo: "",
  documentReceiptNo: "",
  hsnsacNumber: "",
  receiptBookType: "",
  bankName: "",
  bankAcNumber: "",
  srNo: "",
  tcNo: "",
  gstApplicable: false,
  active: true,
};

const userSchema = yup.object().shape({
  receiptBookCode: yup.string().required("required"),
  receiptBookName: yup.string().required("required"),
  receiptBookType: yup.string().required("required"),
});

const Cashbook = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedBank, setSelectedBank] = useState(initialValues.bankName);
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [cashbooks, setCashbooks] = useState([]);
  const [banks, setBanks] = useState([]);
  const [selectedCashbook, setSelectedCashbook] = useState([]);

  function handleEditClick() {
    setOpen(true);
  }

  function handleFormSubmit() {}

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Retrieve all banks when the component mounts
    retriveAllBanks()
      .then((response) => setBanks(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedBank) {
      // Check if there's a selected bank
      retrieveAccountForBank(selectedBank) // Pass the selected bank to the function
        .then((response) => {
          // Update the fetched account numbers in the state
          setAccountNumbers(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedBank]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "receiptBookCode",
      headerName: "Receipt Book Code",
      flex: 1,
    },
    {
      field: "receiptBookName",
      headerName: "Receipt Book Name",
      flex: 1,
    },
    {
      field: "receiptBookType",
      headerName: "Receipt Book Type",
      flex: 1,
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
      <Header title="Receipt Book" />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button variant="contained" onClick={handleClickOpen}>
          Add New Record
        </Button>

        <Dialog onClose={handleClose} open={open} fullWidth>
          <DialogTitle id="cashbook-form-dialog">
            {selectedCashbook ? "Update Record" : "Add Record"}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Formik
              initialValues={selectedCashbook || initialValues}
              onSubmit={handleFormSubmit}
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
                    gridTemplateColumns="repeat(6, minmax(0,1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Receipt Book Code"
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.receiptBookCode}
                      name="receiptBookCode"
                      error={
                        !!touched.receiptBookCode && !!errors.receiptBookCode
                      }
                      helperText={
                        touched.receiptBookCode && errors.receiptBookCode
                      }
                      sx={{ gridColumn: "span 3" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Receipt Book Name"
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.receiptBookName}
                      name="receiptBookName"
                      error={
                        !!touched.receiptBookName && !!errors.receiptBookName
                      }
                      helperText={
                        touched.receiptBookName && errors.receiptBookName
                      }
                      sx={{ gridColumn: "span 3" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Cash Receipt No."
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.cashReceiptNo}
                      name="cashReceiptNo"
                      sx={{ gridColumn: "span 3" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Bank Receipt No."
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bankReceiptNo}
                      name="bankReceiptNo"
                      sx={{ gridColumn: "span 3" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Adjustment Receipt No."
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.adjustmentReceiptNo}
                      name="adjustmentReceiptNo"
                      sx={{ gridColumn: "span 3" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Document Receipt No."
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.documentReceiptNo}
                      name="documentReceiptNo"
                      sx={{ gridColumn: "span 3" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="HSN/SAC Number"
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.hsnsacNumber}
                      name="hsnsacNumber"
                      sx={{ gridColumn: "span 3" }}
                    />
                    <FormControl
                      fullWidth
                      variant="filled"
                      size="small"
                      sx={{ gridColumn: "span 3" }}
                    >
                      <InputLabel>Receipt Book Type</InputLabel>
                      <Select
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.receiptBookType}
                        name="receiptBookType"
                      >
                        <MenuItem value="admission">Admission</MenuItem>
                        <MenuItem value="otherFees">Other Fees</MenuItem>
                        <MenuItem value="Examination">Examination</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl
                      fullWidth
                      variant="filled"
                      size="small"
                      sx={{ gridColumn: "span 3" }}
                    >
                      <InputLabel>Bank Name</InputLabel>
                      <Select
                        onBlur={handleBlur}
                        value={selectedBank}
                        name="bankName"
                        onChange={(e) => {
                          setSelectedBank(e.target.value); // Update selectedBank with the selected bank name
                          handleChange(e);
                        }}
                      >
                        {banks.map((bank) => (
                          <MenuItem key={bank.id} value={bank.id}>
                            {bank.bankName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      fullWidth
                      variant="filled"
                      size="small"
                      sx={{ gridColumn: "span 3" }}
                    >
                      <InputLabel>Bank A/c No</InputLabel>
                      <Select
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.bankAcNumber}
                        name="bankAcNumber"
                      >
                        {accountNumbers.map((accountNumber) => (
                          <MenuItem
                            key={accountNumber.id}
                            value={accountNumber.accountNumber}
                          >
                            {accountNumber.accountNumber}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Sr. No."
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.srNo}
                      name="srNo"
                      sx={{ gridColumn: "span 3" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="TC No."
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.tcNo}
                      name="tcNo"
                      sx={{ gridColumn: "span 3" }}
                    />
                    <FormGroup sx={{ gridColumn: "span 3" }}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Check If GST Applicable"
                      />
                    </FormGroup>
                    <FormGroup sx={{ gridColumn: "span 3" }}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Check If Active"
                      />
                    </FormGroup>
                  </Box>
                  <DialogActions>
                    <Button
                      variant="contained"
                      startIcon={<PublishOutlinedIcon />}
                      autoFocus
                      onClick={handleFormSubmit}
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
                  </DialogActions>
                </form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </Box>
      <Box
        m="10px 0 0 0"
        height="70vh"
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
          rows={cashbooks}
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

export default Cashbook;
