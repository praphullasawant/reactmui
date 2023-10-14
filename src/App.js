import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom"
import Dashboard from "./scenes/dashboard"
import Sidebar from "./scenes/global/Sidebar"
import Cashbook from "./pages/academic/preadmission/course/Receiptbook";
import Bank from "./pages/academic/master/bankDetails/Bank";
import BankAccount from "./pages/academic/master/bankDetails/BankAccount";
import FeeheadGroups from "./pages/academic/preadmission/course/FeeheadGroups";
import Receiptbook from "./pages/academic/preadmission/course/Receiptbook";
import Feehead from "./pages/academic/preadmission/course/Feehead";
import FeeheadAccountLink from "./pages/academic/preadmission/course/FeeheadAccountLink";
import AcademicSession from "./pages/academic/master/bankDetails/academicData/AcademicSession";
function App() {
  const [theme, colorMode] = useMode(); 
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar/>
          <main className="content">
            {/* <Topbar /> */}
            {/* <Header/> */}
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/academicsession" element={<AcademicSession />} />
            <Route path="/cashbook" element={<Cashbook />} />
            <Route path="/bank" element={<Bank />} />
            <Route path="/bankaccount" element={<BankAccount/>} />
            <Route path="/receiptbook" element={<Receiptbook/>} />
            <Route path="/feeheadgroups" element={<FeeheadGroups/>} />
            <Route path="/feehead" element={<Feehead/>} />
            <Route path="/feeheadaccountlink" element={<FeeheadAccountLink/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
