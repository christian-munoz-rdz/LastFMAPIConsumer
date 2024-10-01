import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import Grow from '@mui/material/Grow';

import { Artist } from "../../domain/entities/artistList";
import { Track } from "../../domain/entities/trackList";
import { getTrackInfo } from "../../services/tracks/getTrackInfo";
// import { getArtistInfo } from "../../services/tracks/getArtistInfo";
import { getTopTracks } from "../../services/charts/tracksChart";
// import { getTopArtists } from "../../services/charts/artistsChart";

const MusicScreen = () => {
  const [musicList, setMusicList] = useState<Track[]>([]);
  // const [artistsList, setArtistsList] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const numberOfItems = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracks = await getTopTracks(numberOfItems);

        tracks.forEach(async (track) => {
          const trackInfo = await getTrackInfo(track.name, track.artist.name);
          track.image = trackInfo.album.image;
        });

        // const artists = await getTopArtists(numberOfItems);

        // artists.forEach(async (artist) => {
        //   const artistInfo = await getArtistInfo(artist.name);
        //   artist.image = artistInfo.image;
        // });

        setMusicList(tracks);
        // setArtistsList(artists);
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
      <Box sx={{ flexGrow: 1, marginLeft: 3, marginRight: 3, marginBottom: 3}}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {musicList.map((track, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <Grow in={true}>
              <Card sx={{ width: "100%" }} onClick={() => navigate(`/${track.artist.name}/${track.name}`)}>
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
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {Number(track.playcount).toLocaleString()} reproducciones
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* <Typography
        variant="h1"
        gutterBottom
        align="center"
        marginTop={10}
        marginBottom={6}
      >
        Top {numberOfItems} artistas
      </Typography>
      <Box sx={{ flexGrow: 1, marginLeft: 3, marginRight: 3 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {artistsList.map((artist, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <Card sx={{ width: "100%" }} onClick={() => {}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={artist.image[3]["#text"]}
                    alt="artist card"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {artist.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {Number(artist.listeners).toLocaleString()} oyentes
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box> */}
      
    </>
  );
};

export default MusicScreen;
