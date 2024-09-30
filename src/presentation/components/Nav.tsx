import { useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";

import SearchBar from "./SearchBar";

const pages = [
  { name: "Música", route: "/" },
  { name: "Reviews", route: "/reviews" },
  { name: "Listas", route: "/lists" },
];

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const ProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate("/profile")}>Perfil</MenuItem>
      <Divider />
      <MenuItem onClick={() => {}}>Salir</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <SearchBar />

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => navigate(page.route)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Container>
      {ProfileMenu}
    </Box>
  );
};

export default Nav;
