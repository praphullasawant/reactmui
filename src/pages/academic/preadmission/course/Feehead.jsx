import * as React from "react";
import * as yup from "yup";
import { tokens } from "../../../../theme";
import {
  Box,
  MenuItem,
  useTheme,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import Header from "../../../../components/Header";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import { useState, useEffect } from "react";
import {
  retrievefhCashbook,
  retrieveFeeheadForCashbook,
  createFeeheadForCashbook,
  updateFeehead,
} from "../../../../api/FeeHeadApiService";
import { updateCashbook } from "../../../../api/CashbookApiService";

const initialValues = {
  receiptBookName: "",
  headDescription: "",
  shortName: "",
  otherFeeHead: "",
  installmentHead: "",
  excessFee: "",
  gOIScholarship: "",
  serialNo: "",
  gstApplicable: "",
  active: false,
};

const feeheadSchema = yup.object().shape({});

const Feehead = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(
    initialValues.receiptBookName
  );
  const [selectedReceiptName, setSelectedReceiptName] = useState(
    initialValues.receiptBookName
  );
  const [feeheadData, setFeeheadData] = useState([]);
  const [selectedFeehead, setSelectedFeehead] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [formValues, setFormValues] = useState(initialValues);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => refreshReceipts(), []);

  function refreshReceipts() {
    retrievefhCashbook()
      .then((response) => setReceipts(response.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    retrievefhCashbook()
      .then((response) => setReceipts(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedReceipt) {
      retrieveFeeheadForCashbook(selectedReceipt)
        .then((response) => setFeeheadData(response.data))
        .catch((error) => console.log(error));
    }
  }, [selectedReceipt]);

  const updateDataInDatabase = (id, values) => {
    updateFeehead(id, values)
      .then((response) => {
        console.log("Updated data in the database", response);
        refreshReceipts(); // Refresh the list after updating
      })
      .catch((error) => {
        console.error("Error updating data in the database", error.response);
      });
  };
  
  function handleEditClick(id) {
    if (selectedReceiptId) {
      // const id = selectedReceiptId; // Get the ID of the selected receipt
      retrieveFeeheadForCashbook(id)
        .then((response) => {
          setFormValues(response.data);
          setSelectedFeehead(response.data);
        })
        .catch((error) => console.log(error));
    }
  }

  const handleSubmit = (values, { setSubmitting }) => {
    values.receiptBookName = selectedReceiptName;
    if (selectedFeehead.id) {
      updateDataInDatabase(values);
    } else {
      createFeeheadForCashbook(selectedReceiptId, values)
        .then((response) => {
          console.log("success", response);
          refreshReceipts();
        })
        .catch((error) => {
          console.error("error", error);
        });
    }
    setFormValues(initialValues);
    setSubmitting(false);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "serialNo",
      headerName: "Serial No.",
      flex: 1,
    },
    {
      field: "shortName",
      headerName: "Short Name",
      flex: 1,
    },
    {
      field: "headDescription",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <Button variant="contained" onClick={() => updateDataInDatabase(params.id)}>
          <EditCalendarOutlinedIcon />
        </Button>
      ),
    },
  ];
  return (
    <Box>
      <Header title="Fee Head" />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Formik
          initialValues={formValues}
          validationSchema={feeheadSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form>
              <Box
                display="grid"
                gap="30px"
                m="1vw"
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
                  sx={{ gridColumn: "span 3" }}
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Head Description"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="headDescription"
                  sx={{ gridColumn: "span 3" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Short Name"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shortName"
                  sx={{ gridColumn: "span 3" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Serial Number"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="serialNo"
                  sx={{ gridColumn: "span 3" }}
                />
                <FormGroup sx={{ gridColumn: "span 3" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Other Fee Head"
                    name="otherFeeHead" // Updated field name
                    value={values.otherFeeHead} // Updated field name
                    checked={values.otherFeeHead} // Updated field name
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup sx={{ gridColumn: "span 3" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Installment Head"
                    name="installmentHead" // Updated field name
                    value={values.installmentHead} // Updated field name
                    checked={values.installmentHead} // Updated field name
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup sx={{ gridColumn: "span 3" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Excess Fee"
                    name="excessFee" // Updated field name
                    value={values.excessFee} // Updated field name
                    checked={values.excessFee} // Updated field name
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup sx={{ gridColumn: "span 3" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="GOI Scholarship"
                    name="gOIScholarship" // Updated field name
                    value={values.gOIScholarship} // Updated field name
                    checked={values.gOIScholarship} // Updated field name
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup sx={{ gridColumn: "span 3" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="GST Applicable"
                    name="gstApplicable" // Updated field name
                    value={values.gstApplicable} // Updated field name
                    checked={values.gstApplicable} // Updated field name
                    onChange={handleChange}
                  />
                </FormGroup>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{ gridColumn: "span 2" }}
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
                    type="reset"
                    onClick={() => {
                      // Clear the form and reset it to the initial values
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
      <Box
        m="20px 20px 20px 20px"
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
          disableDensitySelector
          disableColumnFilter
          rows={feeheadData}
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

export default Feehead;
