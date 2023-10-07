import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import BoyOutlinedIcon from '@mui/icons-material/BoyOutlined';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
            <StatBox
            title="12,045"
            subtitle="Boys Count "
            progress="0.75"
            increase="+14%"
            icon={<BoyOutlinedIcon sx={{color:colors.greenAccent[600], fontSize:"35px"}}/>}
            />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
