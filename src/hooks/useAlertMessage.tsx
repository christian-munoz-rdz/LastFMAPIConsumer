import { useState } from "react";

import AlertDialog from "../components/AlerMessage/AlertMessage";


export const useAlertMessage = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState({
      title: "",
      message: ""
    })

    const changeAlertMessage = (title: string, message: string) => {
        const newMessage = {
            title: title,
            message: message
          }
        setAlertMessage(newMessage)
    }
  
    const openAlert = () => {
      setIsAlertOpen(true);
    }
  
    const closeAlert = () => {
      setIsAlertOpen(false);
    };

    const AlertMessage = ( ) => (<AlertDialog title={alertMessage.title} message={alertMessage.message} open={isAlertOpen} handleClose={closeAlert} />);

    return {
        isAlertOpen,
        alertMessage, 
        changeAlertMessage,
        openAlert,
        closeAlert,
        AlertMessage
    }
}