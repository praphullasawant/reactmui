import { Typography, Box, useTheme, IconButton } from "@mui/material";
import { tokens, ColorModeContext } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useState, useContext } from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [query, setQuery] = useState("");
  console.log(query);
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" m="10px 10px 10px 10px">
      <Box>
        <Typography
          fontSize="40px"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{
            mb: "5px",
            ml: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
