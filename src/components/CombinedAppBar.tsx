import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Menu from "@mui/material/Menu";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IUser from "../interfaces/User";
import { queryRequest } from "../services/axiosWrapper";
import ListUsers from "./ListUsers";
import storage from "../utility/storage";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// const pages = ["Products", "Pricing", "Blog"];

export default function CombinedAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [searchKey, setSearchKey] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
    console.log("key", searchKey);
  };

  const navigate = useNavigate();

  const { id } = useParams();
  const [user, setUser] = useState<IUser>();
  const token = storage.getToken();
  const object = JSON.parse(atob(token.split(".")[1]));
  // console.log(object);
  const role_id = object.role_id;
  // const curr_user_id = object.id;
  const navigateCreate = () => {
    navigate("/createEmployee");
  };

  const navigateUpdate=()=>{
    navigate("/updateEmployee");
  }

  const handleLogout = () => {
    storage.clearToken();
    navigate("/");
  };
  // const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      queryRequest(`/getEmployeeByID?id=${id}`)
        .then((data) => setUser(data.data))
        .catch((error) => alert(error));
    }
  }, [id]);

  const settingsArray = [
    user?.first_name,
    user?.middle_name,
    user?.last_name,
    user?.email,
    user?.designation,
    user?.date_of_birth,
    user?.date_of_joining,
    user?.hired_location,
    user?.residential_address,
    user?.salary,
    user?.work_status,
    user?.years_of_experience,
  ];

  const filteredSettingsArray = settingsArray.filter(
    (value) => value !== undefined && value !== null
  );

  const nameString = filteredSettingsArray.slice(0, 3).join(" ");
  const settings = [nameString, ...filteredSettingsArray.slice(3)];
  // const settings = [`${user?.first_name} `,`${user?.middle_name}`,` ${user?.last_name}` , `${user?.email}`,`${user?.designation}`, `${user?.date_of_birth}`,`${user?.date_of_joining}`, `${user?.hired_location}`, `${user?.residential_address}`, `${user?.salary}`,`${user?.work_status}`,`${user?.years_of_experience}`];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                ></Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ></Box>
              {role_id === 1 ? (
                <div>
                  <button
                    onClick={navigateCreate}
                    className="bg-transparent hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    Create Employee
                  </button>
                  <button
                    onClick={navigateUpdate}
                    className="bg-transparent hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    Update Employee
                  </button>
                </div>
              ) : (
                <></>
              )}
              <Search sx={{ flexGrow: 0, mr: 2 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search email"
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearch}
                />
              </Search>

              <Box>
                {" "}
                {/* Added margin to create space */}
                <Tooltip title="View Details ">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <div
                      key={setting}
                      className="pl-3 pr-3 flex justify-start items-start"
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </div>
                  ))}
                </Menu>
              </Box>

              <Box ml={2}>
                {" "}
                {/* Adds margin to the left */}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <ListUsers searchKey={searchKey} />
    </div>
  );
}
