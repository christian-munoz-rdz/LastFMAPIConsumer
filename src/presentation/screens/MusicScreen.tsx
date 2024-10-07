import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import Grow from "@mui/material/Grow";
import { Track } from "../../domain/entities/trackList";
import { getTrackInfo } from "../../services/tracks/getTrackInfo";
import { getTopTracks } from "../../services/charts/tracksChart";
import CustomModal from "../components/SelectListModal/CustomModal";

const MusicScreen = () => {

  const [musicList, setMusicList] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigation = useNavigate();

  const numberOfItems = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracks = await getTopTracks(numberOfItems);

        tracks.forEach(async (track) => {
          const trackInfo = await getTrackInfo(track.name, track.artist.name);
          track.image = trackInfo.album.image;
        });

        setMusicList(tracks);
      } catch (error) {
        console.error(error);
        setError("Error al cargar la información");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  } else if (error) {
    return (
      <Typography variant="h1" gutterBottom>
        {error}
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h1" gutterBottom align="center">
        Top {numberOfItems} canciones
      </Typography>
      <Box sx={{ flexGrow: 1, marginLeft: 3, marginRight: 3, marginBottom: 3 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3, xl: 4 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {musicList.map((track, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4, xl:2 }}>
              <Grow in={true}>
                <Card
                
                  sx={{ width: "100%" }}
                >
                    <CardMedia
                      component="img"
                      height="140"
                      image={track.image[3]["#text"]}
                      alt="music card"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {track.name}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "text.secondary" }}>
                        {track.artist.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {Number(track.playcount).toLocaleString()}{" "}
                        reproducciones
                      </Typography>
                    </CardContent>
                  <CardActions>
                    <Button size="medium" onClick={handleOpen}>Añadir a Lista</Button>
                    <Button size="medium" onClick={() =>navigation(`/${track.artist.name}/${track.name}`)
                  }>Reseñar</Button>
                  </CardActions>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
        <CustomModal handleClose={handleClose} open={open}/>
      </Box>
    </>
  );
};

export default MusicScreen;
