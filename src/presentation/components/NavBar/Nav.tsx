import { useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";

import SearchBar from "./SearchBar";
import DropdownMenu from "./DropdownMenu";

const pages = [
  { name: "Música", route: "/" },
  { name: "Reviews", route: "/reviews" },
  { name: "Listas", route: "/lists" },
];

const Nav = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

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

  return (
    <Box sx={{ flexGrow: 1, margin: 3}}>
      <Container maxWidth="lg">
        <AppBar position="sticky" sx={{ borderRadius: 5, padding: 2 }}>
          <Toolbar>
            <SearchBar />

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => navigate(page.route)}
                  sx={{
                    my: 1,
                    color: "white",
                    display: "block",
                    ":hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                    margin: 1,
                    borderColor: "Transparent",
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <IconButton
              size="large"
              edge="start"
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
      {
        <DropdownMenu
          anchorEl={anchorEl}
          menuId={menuId}
          isMenuOpen={isMenuOpen}
          handleMenuClose={handleMenuClose}
          routes={[{ name: "Perfil", route: "/profile" }]}
        />
      }
    </Box>
  );
};

export default Nav;
