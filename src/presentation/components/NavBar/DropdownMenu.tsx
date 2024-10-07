import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Logout from "@mui/icons-material/Logout";

import { Menu, MenuItem, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import { AuthContext } from "../../../context/auth-context";

// * Props
interface DropdownMenuProps {
  anchorEl: HTMLElement | null;
  menuId: string;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  routes: { name: string; route: string }[];
}

//* Estilos del menu ----------------------------
const menuStyles = {
  paper: {
    elevation: 0,
    sx: {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: 1.5,
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
  },
};

const DropdownMenu = ({
  anchorEl,
  menuId,
  isMenuOpen,
  handleMenuClose,
  routes,
}: DropdownMenuProps) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  return (
    <Menu
      id={menuId}
      anchorEl={anchorEl}
      open={isMenuOpen}
      keepMounted
      onClose={handleMenuClose}
      slotProps={menuStyles}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      
      {/* Perfil Icono ---------------------------------------- */}
      <MenuItem onClick={() => navigate(routes[0].route)}>
        <Avatar /> Perfil
      </MenuItem>{" "}
      {/* ------------------------------------ */}
      
      <Divider />

      <MenuItem onClick={auth.logout}>
        <Logout fontSize="small" />
        Salir
      </MenuItem>

    </Menu>
  );
};

export default DropdownMenu;
