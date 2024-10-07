import { useContext, useState } from "react";

import Grid from "@mui/material/Grid2";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";

import { AuthContext } from "../../../context/auth-context";
import { loginApi, signup } from "../../../services/rest/users/usersApi";

const LoginScreen = () => {

  const [loginMode, SetLoginMode] = useState(true);

  const { currentUser, handleUser, login } = useContext(AuthContext);

  const changeMode = () => {
    SetLoginMode(!loginMode);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (loginMode) {
      loginApi(email, password)
        .then((response) => {
          // Handle successful login
          console.log("Login successful", response);
          handleUser(response.userId);
          console.log(currentUser);
          login();
        })
        .catch((error) => {
          // Handle login error
          alert("Error: " + error.message);
        });
    } else {
      signup(email, password)
        .then((response) => {
          // Handle successful signup
          console.log("Signup successful", response);
          handleUser(response.userId);
          console.log(currentUser);
          login();
        })
        .catch((error) => {
          // Handle signup error
          alert("Error: " + error.message);
        });
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutlined /> {/* Icono */}
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          {loginMode ? "Ingreso" : "Registro"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            placeholder="Correo electrónico"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            name="email"
          />
          <TextField
            placeholder="Contraseña"
            fullWidth
            required
            sx={{ mb: 2 }}
            type="password"
            name="password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            {loginMode ? "Ingresar" : "Registrarse"}
          </Button>
        </Box>

        {/*Cambiar modo de la pagina Auth*/}
        <Grid container justifyContent="center" sx={{ mt: 1 }}>
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            {loginMode && (
              <Typography variant="body1">¿ No tienes una cuenta?</Typography>
            )}
            <Button color="primary" onClick={changeMode}>
              {" "}
              {loginMode ? "Registrarse" : "Ingresar"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoginScreen;
