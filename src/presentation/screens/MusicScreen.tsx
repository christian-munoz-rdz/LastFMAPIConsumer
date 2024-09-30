import { useEffect, useState } from "react";
import { getTopTracks } from "../../services/charts/tracksChart";
import { getTopArtists } from "../../services/charts/artistsChart";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Artist } from "../../domain/entities/artistList";
import { Track } from "../../domain/entities/trackList";
import Modal from '@mui/material/Modal';

const MusicScreen = () => {
  const [musicList, setMusicList] = useState<Track[]>([]);
  const [artistsList, setArtistsList] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(true);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracks = await getTopTracks(20);
        const artists = await getTopArtists(20);
        setMusicList(tracks);
        setArtistsList(artists);
      } catch (error) {
        setError("Error al cargar la información");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Typography variant="h1" gutterBottom>
        Cargando...
      </Typography>
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
      <Typography variant="h1" gutterBottom>
        Top 20 canciones
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {musicList.slice(0, 16).map((track, index) => (
            <Grid key={index} size={{xs:2,sm:4, md:4}}>
              <Card 
                sx={{ width: "100%" }}
                onClick={() => setModalOpen(true)}
              >
                <CardActionArea>
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
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {Number(track.playcount).toLocaleString()} reproducciones
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Typography variant="h1" gutterBottom>
        Top 20 artistas
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {artistsList.slice(0, 16).map((artist, index) => (
            <Grid key={index} size={{xs:2,sm:4, md:4}}>
              <Card 
              sx={{ width: "100%" }}
              onClick={() => setModalOpen(true)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image= {artist.image[2]["#text"]}
                    alt="artist card"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {artist.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {Number(artist.listeners).toLocaleString()} oyentes
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <div>
          <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
          </Modal>
        </div>
    </>
  );
};

export default MusicScreen;
