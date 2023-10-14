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
};

const cashbookSchema = yup.object().shape({
  bankName: yup.string().required("required"),
  accountNumber: yup.string().required("required"),
});

const FeeheadGroups = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "receiptBook",
      headerName: "Receipt Book",
      flex: 1,
    },
    {
      field: "feeHeads",
      headerName: "Fee Heads",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (
        <Button variant="contained">
          <EditCalendarOutlinedIcon />
        </Button>
      ),
    },
  ];
  return (
    <Box>
      <Header title="Fee Head Groups" />
      <Box display="flex" alignItems="center" justifyContent="center" mb="5vh" mt="9vh">
        <Formik>
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
                  name="bankName"
                  // Bind the blur event to Formik's handleBlu
                  sx={{ gridColumn: "span 2", width: "100%" }}
                >
                  <MenuItem>A</MenuItem>
                  <MenuItem>B</MenuItem>
                  <MenuItem>C</MenuItem>
                </TextField>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  width="100%"
                  mt={2}
                >
                  <Button
                    variant="contained"
                    startIcon={<PublishOutlinedIcon />}
                    autoFocus
                    type="submit"
                  >
                    Add New Record
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<BlockOutlinedIcon />}
                    autoFocus
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
          rows=""
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

export default FeeheadGroups;
