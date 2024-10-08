import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import CustomList from "./CustomList";

interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({ open, handleClose }: CustomModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-description" sx={{ mt: 2, color: "black" }}>
          Añadir a mis playlists
        </Typography>
        <CustomList />
        <Button onClick={handleClose}>Añadir</Button>{" "}
        {/*TODO: Manejar la logica para actualizar las canciones de una playlist*/}
      </Box>
    </Modal>
  );
};

export default CustomModal;
