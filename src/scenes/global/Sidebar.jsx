import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 20px 5px 10px !important",
          
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
          backgroundColor: "#453953 !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  GEMSERP
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* USER  */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ curser: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box>
                <Typography
                  varient="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 60px" }}
                >
                  Hello, Shweta Katore
                </Typography>
                <Typography
                  varient="h5"
                  color={colors.greenAccent[500]}
                  sx={{ m: "0 0 0 60px" }}
                >
                  Sinhgad College Pune
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}

          <Box paddingLeft={isCollapsed ? undefined : "1%"}>
            <SubMenu title="AUTHORIZATION" icon={<PersonAddOutlinedIcon />}>
              <SubMenu 
                title="Dashboard"
                to="/"
                selected={selected}
                setSelected={setSelected}
              >
                <SubMenu title="academic data" icon={<PersonAddOutlinedIcon />}>
                  <Item
                    title="Master"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  ></Item>
                </SubMenu>
              </SubMenu>
            </SubMenu>
          </Box>


          <Box paddingLeft={isCollapsed ? undefined : "1%"}>
            <SubMenu title="ACADEMIC" icon={<SchoolOutlinedIcon />}>
              <SubMenu title="Master">
                <SubMenu title="Academic Data">
                  <Item
                    title="Academic Session"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Payment Type"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Concession"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Medium"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                    
                  />
                  <Item
                    title="Section"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Certificate"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Occupation"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
                <SubMenu title="Common Master">
                  <Item
                    title="Caste Category"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Subcaste"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Title"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Gender"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Religion"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Marital Status"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Handicap"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Blood Group"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="University And Board"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Nationality"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Mother Tongue"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
                <SubMenu title="Bank Details">
                  <Item
                    title="Bank"
                    to="/bank"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Bank Account"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
              </SubMenu>

              <SubMenu title="Pre Admission">
                <SubMenu title="Course">
                  <Item
                    title="Year"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Semester"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Degree"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Faculty"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Fee Pattern"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Course Pattern"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Cashbook"
                    to="/cashbook"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Feehead"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Feehead Grouping"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Feehead Account Mapping"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Cashbook Rights"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Copy Cashbook Rights"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Course Certificate"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="User Mapping"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
                <SubMenu title="Fees">
                  <Item
                    title="Basic Course"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Course Creation"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Course Updation"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Course Section"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Standard Fee"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Copy Standard Fee"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
                <SubMenu title="Other Fees Defination">
                  <Item
                    title="General Fine"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Installment Fees"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Studentwise Installment Fees"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Certificate Fee"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Studentwise Installment clear"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
                <SubMenu title="Subject">
                  <Item
                    title="Subject Type"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Subject Part"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Subject Defination"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Subject Grouping"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Subject Fee"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Subject Mapping"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Subject Mapping Jr"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Subject Group Mapping"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Regular/Backlog Exam Registration Fee Config"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
              </SubMenu>
              

              
            </SubMenu>
          </Box>


          <Box paddingLeft={isCollapsed ? undefined : "1%"}>
            <SubMenu
              title="ATTENDANCE"
              icon={<AssignmentTurnedInOutlinedIcon />}
            >
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
          <Box paddingLeft={isCollapsed ? undefined : "1%"}>
            <SubMenu title="EXAMINATION" icon={<LibraryBooksOutlinedIcon />}>
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
          <Box paddingLeft={isCollapsed ? undefined : "1%"}>
            <SubMenu title="PAYROLL" icon={<PriceChangeOutlinedIcon />}>
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
          <Box paddingLeft={isCollapsed ? undefined : "1%"}>
            <SubMenu
              title="ESTABLISHMENT"
              icon={<AccountBalanceOutlinedIcon />}
            >
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
          <Box paddingLeft={isCollapsed ? undefined : "1%"}>
            <SubMenu title="ITLE" icon={<SchoolOutlinedIcon />}>
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
          <Box paddingLeft={isCollapsed ? undefined : "1%"}>
            <SubMenu title="PASSWORD RESET" icon={<KeyOutlinedIcon />}>
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
          <Box paddingLeft={isCollapsed ? undefined : "1%"}>
            <SubMenu title="LIBRARY" icon={<LibraryBooksOutlinedIcon />}>
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
