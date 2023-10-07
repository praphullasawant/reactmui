import * as React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  useTheme,
  TextField,
} from "@mui/material";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import { DataGrid } from "@mui/x-data-grid";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { retriveAllBanks } from "../../../../api/BankApiService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  bankCode: "",
  bankName: "",
  bankAddress: "",
  active: true,
};

const bankSchema = yup.object().shape({
  bankCode: yup.string().required("required"),
  bankName: yup.string().required("required"),
});

const Bank = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [banks, setBanks] = useState([]);

  const navigate = useNavigate()

  useEffect(() => refreshBanks(), []);

  function refreshBanks() {
    retriveAllBanks()
      .then((response) => setBanks(response.data))
      .catch((error) => console.log(error));
  }

  function updateBank(id) {
    console.log("clicked " + id);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "bankCode",
      headerName: "Bank Code",
      flex: 1,
    },
    {
      field: "bankName",
      headerName: "Bank Name",
      flex: 1,
    },
    {
      field: "checkIfActive",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => updateBank(params.id)} // You can define your own edit button click handler here
        >
          <EditCalendarOutlinedIcon />
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Header title="Bank" />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button variant="contained" onClick={handleClickOpen}>
          Add New Record
        </Button>

        <Dialog onClose={handleClose} open={open} fullWidth>
          <DialogTitle id="cashbook-form-dialog">Add/Update Record</DialogTitle>
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
              // onSubmit={handleFormSubmit}
              initialValues={initialValues}
              // validationSchema={userSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
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
                      type="text"
                      label="Bank Code"
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bankCode}
                      name="bankCode"
                      error={!!touched.bankCode && !!errors.bankCode}
                      helperText={touched.bankCode && errors.bankCode}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Bank Name"
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bankName}
                      name="bankName"
                      error={!!touched.bankName && !!errors.bankName}
                      helperText={touched.bankName && errors.bankName}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Bank Address"
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bankAddress}
                      name="bankAddress"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <FormGroup sx={{ gridColumn: "span 3" }}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Check If Active"
                      />
                    </FormGroup>
                  </Box>
                </form>
              )}
            </Formik>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              startIcon={<PublishOutlinedIcon />}
              autoFocus
              // onClick={handleFormSubmit}
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
        </Dialog>
      </Box>
      <Box
        m="10px 0 0 0"
        height="70vh"
        sx={{
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
        <DataGrid rows={banks} columns={columns} />
      </Box>
    </Box>
  );
};

export default Bank;
