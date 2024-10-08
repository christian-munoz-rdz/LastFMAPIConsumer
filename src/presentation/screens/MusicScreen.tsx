import { useEffect, useState, useCallback } from "react";
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
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handleOpen = (track: Track) => {
    setSelectedTrack(track);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const navigation = useNavigate();
  const numberOfItems = 20; 

  const fetchData = async (pageNumber: number) => {
    try {
      if (pageNumber === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
  
      const data = await getTopTracks(numberOfItems, pageNumber);
      const tracks = data.tracks.track;
      const attr = data.tracks["@attr"];
      setTotalPages(parseInt(attr.totalPages));
  
      // Obtener imágenes de álbum para cada track
      const tracksWithImages = await Promise.all(
        tracks.map(async (track) => {
          const trackInfo = await getTrackInfo(track.name, track.artist.name);
          track.image = trackInfo.album?.image || track.image;
          return track;
        })
      );
  
      setMusicList((prevMusicList) => [...prevMusicList, ...tracksWithImages]);
    } catch (error) {
      console.error(error);
      setError("Error al cargar la información");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loadingMore &&
      page < totalPages
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loadingMore, page, totalPages]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (loading && page === 1) {
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
        Top canciones
      </Typography>
      <Box sx={{ flexGrow: 1, marginLeft: 3, marginRight: 3, marginBottom: 3 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3, xl: 4 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {musicList.map((track, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4, xl: 2 }}>
              <Grow in={true}>
                <Card sx={{ width: "100%" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={track.image[3]["#text"] || "/placeholder.jpg"}
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
                  <CardActions>
                    <Button size="medium" onClick={() => handleOpen(track)}>
                      Añadir a Lista
                    </Button>
                    <Button
                      size="medium"
                      onClick={() =>
                        navigation(`/${track.artist.name}/${track.name}`)
                      }
                    >
                      Reseñar
                    </Button>
                  </CardActions>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
        {loadingMore && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <CustomModal handleClose={handleClose} open={open} track={selectedTrack} />
      </Box>
    </>
  );
};

export default MusicScreen;


