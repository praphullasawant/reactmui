import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom"
import Topbar from './scenes/global/Topbar.jsx'
import Dashboard from "./scenes/dashboard"
import Sidebar from "./scenes/global/Sidebar"
import Cashbook from "./pages/academic/preadmission/course/Cashbook";
import Bank from "./pages/academic/master/bankDetails/Bank";
import BankAccount from "./pages/academic/master/bankDetails/BankAccount";
function App() {
  const [theme, colorMode] = useMode(); 
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar/>
          <main className="content">
            <Topbar />
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cashbook" element={<Cashbook />} />
            <Route path="/bank" element={<Bank />} />
            <Route path="/bankaccount" element={<BankAccount/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
