import { Formik } from "formik";
import {
  Box,
  Checkbox,
  useTheme,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/icons-material";
import { tokens } from "../theme";
import useMediaQuery from "@mui/material/useMediaQuery";

const initialValues = {
  bankCode: "",
  bankName: "",
  bankAddress: "",
  active: true,
};

const BankForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
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
        <Formik initialValues={initialValues}>
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
  );
};

export default BankForm;
