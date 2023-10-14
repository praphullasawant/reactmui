import * as React from "react";
import { Box, useTheme, TextField, MenuItem, Select } from "@mui/material";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";
import {
  retrieveReceiptBook,
  retrieveFeeheadForCashbook,
  retriveAllBank,
  retrieveAccountForBank,
} from "../../../../api/FeeHeadAccountLinkApiService";

const initialValues = {
  receiptBookName: "",
  headName: "",
  shortName: "",
  bankName: "",
  accountNumber: "",
  status: "",
};

const feeheadAccountLinkSchema = yup.object().shape({});

const FeeheadAccountLink = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [feeheadData, setFeeheadData] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(
    initialValues.receiptBookName
  );
  const [selectedReceiptName, setSelectedReceiptName] = useState(
    initialValues.receiptBookName
  );
  const [formValues, setFormValues] = useState(initialValues);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [banks, setBanks] = useState([]);
  useEffect(() => refreshReceipts(), []);
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [selectedBank, setSelectedBank] = useState(initialValues.selectedBank);
  useEffect(() => refreshBanks(), []);
  const [selectedBankId, setSelectedBankId] = useState(null);
console.log(selectedBankId)

  function refreshReceipts() {
    retrieveReceiptBook()
      .then((response) => setReceipts(response.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (selectedReceipt) {
      retrieveFeeheadForCashbook(selectedReceipt)
        .then((response) => setFeeheadData(response.data))
        .catch((error) => console.log(error));
    }
  }, [selectedReceipt]);

  function refreshBanks() {
    retriveAllBank()
      .then((response) => {
        const bankNames = response.data.map((bank) => bank.bankName); 
        const bankIds = response.data.map((bank) => bank.id);
        
        // console.log(bankNames)
        // console.log(bankIds)
        setBanks(bankNames);
        setSelectedBankId(bankIds)
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (selectedBank) {
      // Check if there's a selected bank
      retrieveAccountForBank(selectedBank) // Pass the selected bank to the function 
      .then((response) => {
            console.log("API Response:", response.data);
          // Update the fetched account numbers in the state
          setAccountNumbers(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedBank]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "headDescription",
      headerName: "Head Name",
      width: 350,
    },
    {
      field: "shortName",
      headerName: "Short Name",
      width: 150,
    },
    {
      field: "bankName",
      headerName: "Bank Name",
      width: 250,
      renderCell: (params) => (
        <TextField
          select
          fullWidth
          variant="filled"
          size="small"
          name="bankName"
          value={params.value}
          //   sx={{width:"100%"}}
          onChange={(e) => {
            setSelectedBank(e.target.value); // Log and update selectedBank
            console.log("Selected Bank:", e.target.value);
            // handleChange(e);
          }}
        >
          {banks.map((bankName) => (
            <MenuItem key={bankName} value={bankName}>
              {bankName}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      field: "accountNumber",
      headerName: "Bank Account",
      width: 250,
      renderCell: (params) => (
        <TextField
          select
          fullWidth
          variant="filled"
          size="small"
          name="bankAcNumber"
          value={params.value}
          onChange={(e) => {
            // Handle the selection of a bank account here
            params.api.setEditCellValue({
              id: params.id, // Row ID
              field: "accountNumber", // Field name
              value: e.target.value, // Updated value
            });
          }}
        >
          {accountNumbers.map((accountNumber) => (
            <MenuItem key={accountNumber} value={accountNumber}>
              {accountNumber}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];
  return (
    <Box>
      <Header title="Feehead Account Link" />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb="5vh"
        mt="9vh"
      >
        <Formik
          initialValues={formValues}
          validationSchema={feeheadAccountLinkSchema}
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
                display="flex"
                flexWrap="wrap"
                gap={2}
                sx={{
                  "& > div": {
                    flexBasis: "50%",
                    flexGrow: 1,
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  select
                  label="Receipt Book"
                  size="small"
                  name="receiptBookName"
                  value={selectedReceipt} // Bind the value to Formik's form values
                  onChange={(e) => {
                    setSelectedReceipt(e.target.value); // Update selectedBank with the selected bank name
                    handleChange(e);
                  }}
                  onBlur={handleBlur} // Bind the blur event to Formik's handleBlu
                  sx={{ gridColumn: "span 2", width: "100%" }}
                >
                  {receipts.map((receipt) => (
                    <MenuItem
                      key={receipt.id}
                      value={receipt.id}
                      onClick={() => {
                        setSelectedReceiptId(receipt.id);
                        setSelectedReceiptName(receipt.receiptBookName);
                      }}
                    >
                      {receipt.receiptBookName}
                    </MenuItem>
                  ))}
                </TextField>
                <Box
                  display="flex"
                  justifyContent="center"
                  width="100%"
                  mt={2}
                >
                  <Button
                    variant="contained"
                    startIcon={<PublishOutlinedIcon />}
                  >
                    Submit
                  </Button>
                  <Button variant="contained" startIcon={<BlockOutlinedIcon />}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<PublishOutlinedIcon />}
                  >
                    Lock
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
      <Box
        m="20px 20px 20px 20px"
        height="55vh"
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
          "& .MuiDataGrid-columnHeaderTitle": {
            // fontWeight:"bold",
            textTransform: "uppercase",
            fontSize: "1vw",
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
          columns={columns}
          rows={feeheadData}
          disableColumnSelector
          disableDensitySelector
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

export default FeeheadAccountLink;
