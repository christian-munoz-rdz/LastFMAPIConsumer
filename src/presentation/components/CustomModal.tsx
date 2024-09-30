import { Box, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';
import { useState } from "react";

const CustomModal = () => {

    const [modalOpen, setModalOpen] = useState(true);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return (
        <div>
          <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50%',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </div>
      );

}

export default CustomModal;