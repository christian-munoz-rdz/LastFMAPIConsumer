import { useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar";
import DropdownMenu from "./DropdownMenu";

//* Pages (Definidas por mí, podrían ser props)
const pages = [
  { name: "Música", route: "/music" },
  { name: "Reviews", route: "/reviews" },
  { name: "Listas", route: "/lists" },
];

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const navigate = useNavigate();

  // * Métodos para manejar el menu
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, margin: 3 }}>
      <Container maxWidth="lg">
        <AppBar position="sticky" sx={{ borderRadius: 5, padding: 2 }}>
          <Toolbar>
            {/* Componente de la Barra de Navegación 
            TODO: Manejar la lógica de las búsquedas */}
            <SearchBar />
            {/* Botones de Navegación------------------------------------  */}
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
            {/* Icono de perfil de usuario (Maneja despliegue del menu)------- */}
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
            {/* ------------------------------------------------------------ */}
          </Toolbar>
        </AppBar>
      </Container>
      {
        //* Componente del menú desplegable
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
