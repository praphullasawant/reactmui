import * as React from "react";
import * as yup from "yup";
import dayjs from "dayjs";
import { tokens } from "../../../../../theme";
import {
  Box,
  MenuItem,
  useTheme,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import Header from "../../../../../components/Header";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  retrieveAllSession,
  createSession,
  retrieveSession,
  updateSession
} from "../../../../../api/AcademicSessionApiService";

const initialValues = {
  sessionName: "",
  shortName: "",
  startDate: dayjs(),
  endDate: dayjs(),
  active: false,
  oldSession: false,
};

// const academicSessionSchema = yup.object.shape({
//     sessionName : yup.string().required('required'),
//     shortName: yup.string().required("required")
// });

const AcademicSession = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [session, setSession] = useState([]);
  const [selectedSession,setSelectedSession] = useState([]);
  const [selectedSessionName, setSelectedSessionName] = useState(
    initialValues.sessionName
  );

  useEffect(() => refreshSession(),[]);

  function refreshSession() {
    retrieveAllSession()
      .then((res) => setSession(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    retrieveAllSession()
      .then((res) => setSession(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleEditClick(id) {
    retrieveSession(id)
    .then((response) => {
        setSelectedSession(response.data);
        setOpen(true);
        // setFormData(response.data);
    })
    .catch((error) => console.log(error));
  }

  function onSubmit(values) {
    console.log(values)
    // createSession(values)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => console.log(error));
    // refreshSession();
    // handleClose();
    }
  

  const handleClickOpen = () => {
    setSelectedSession(null);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "sessionName",
      headerName: "Session Name",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
    },
    {
      field: "endDate",
      headerName: "End Date",
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
      <Header title="Academic Session" />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Formik
          initialValues={selectedSession || initialValues}
          onSubmit={onSubmit}
          // validationSchema={academicSessionSchema}
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
                  type="text"
                  label="Session Name"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="sessionName"
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
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    fullWidth
                    variant="filled"
                    label="Select Date"
                    size="small"
                    defaultValue={[values.startDate, values.endDate]}
                    onBlur={handleBlur}
                    onChange={(newDateRange) => {
                      handleChange({
                        target: { name: "startDate", value: newDateRange[0] },
                      });
                      handleChange({
                        target: { name: "endDate", value: newDateRange[1] },
                      });
                    }}
                    sx={{ gridColumn: "span 6" }}
                  />
                </LocalizationProvider> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    fullWidth
                    variant="filled"
                    label="Select Start Date"
                    size="small"
                    defaultValue={values.startDate}
                    onBlur={handleBlur}
                    onChange = {(newStartDate) => {
                        handleChange({
                            target: {name:"startDate", value : newStartDate}
                        })
                    }}
                    sx={{ gridColumn: "span 3" }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    fullWidth
                    variant="filled"
                    label="Select End Date"
                    size="small"
                    defaultValue={values.endDate}
                    onBlur={handleBlur}
                    onChange = {(newEndDate) => {
                        handleChange({
                            target: {name:"endDate", value : newEndDate}
                        })
                    }}
                    sx={{ gridColumn: "span 3" }}
                  />
                </LocalizationProvider>
                <FormGroup sx={{ gridColumn: "span 3" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="active"
                        defaultChecked={values.active}
                        onChange={handleChange}
                      />
                    }
                    label="Check If Active"
                  />
                </FormGroup>
                <FormGroup sx={{ gridColumn: "span 3" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="oldSession" // Add the 'name' attribute for this checkbox
                        defaultChecked={values.oldSession}
                        onChange={handleChange}
                      />
                    }
                    label="Check If Old Session"
                  />
                </FormGroup>
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ gridColumn: "span 6" }}
                >
                  <Button
                    variant="contained"
                    startIcon={<PublishOutlinedIcon />}
                    autoFocus
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
          rows={session}
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

export default AcademicSession;
