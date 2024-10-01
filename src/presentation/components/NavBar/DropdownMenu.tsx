import { Menu, MenuItem, Divider } from "@mui/material";
import Avatar from '@mui/material/Avatar';

import { useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";


interface DropdownMenuProps {
  anchorEl: HTMLElement | null;
  menuId: string;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  routes: { name: string; route: string }[];
}

const DropdownMenu = ({
  anchorEl,
  menuId,
  isMenuOpen,
  handleMenuClose,
  routes,
}: DropdownMenuProps) => {
  const navigate = useNavigate();
  return (
    <Menu
    id={menuId}
      anchorEl={anchorEl}
      open={isMenuOpen}
      keepMounted
      onClose={handleMenuClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={() => navigate(routes[0].route)}>
      <Avatar /> Perfil
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => {}}>
      <Logout fontSize="small" />Salir
      </MenuItem>
    </Menu>
  );
};

export default DropdownMenu;
