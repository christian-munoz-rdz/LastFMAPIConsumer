import { LockOutlined } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

const LoginScreen = () => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica para iniciar sesión
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2}}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
          Log In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            placeholder="Correo electrónico"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
          />
                    <TextField
            placeholder="Contraseña"
            fullWidth
            required
            sx={{ mb: 2 }}
            type="password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Log In
          </Button>
        </Box>
          <Grid container justifyContent="center" sx={{ mt: 1 }}>
            <Grid>
              <Button color="primary" >Sign Up</Button>
            </Grid>
          </Grid>
      </Paper>
    </Container>
  );
};

export default LoginScreen;