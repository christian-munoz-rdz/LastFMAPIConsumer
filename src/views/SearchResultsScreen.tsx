import { useEffect, useState, useCallback } from "react";

import { useNavigate, useLocation } from "react-router-dom";
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
import Grow from "@mui/material/Grow";

import { Track } from "../domain/entities/track";
import { getSearchResults } from "../services/tracks/getSearchResults";
import { getTrackInfo } from "../services/tracks/getTrackInfo";
import CustomModal from "../components/SelectListModal/CustomModal";

const SearchResultsScreen = () => {

  const [searchResults, setSearchResults] = useState<Track[]>([]);
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const numberOfItems = 20; // Número de resultados por página

  const fetchData = async (pageNumber: number) => {
    try {
      if (pageNumber === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await getSearchResults(query, pageNumber, numberOfItems);
      const tracks = data.trackmatches.track;
      const totalResults = parseInt(data["opensearch:totalResults"], 10);
      const itemsPerPage = parseInt(data["opensearch:itemsPerPage"], 10);
      const newTotalPages = Math.ceil(totalResults / itemsPerPage);
      setTotalPages(newTotalPages);

      // Obtener imágenes de álbum para cada track
      const tracksWithImages = await Promise.all(
        tracks.map(async (track) => {
          const artistName =
            typeof track.artist === "string"
              ? track.artist
              : track.artist.name;
          const trackInfo = await getTrackInfo(track.name, artistName);
          track.image = trackInfo.album?.image || track.image;
          return track;
        })
      );

      setSearchResults((prevResults) => [
        ...prevResults,
        ...tracksWithImages,
      ]);
    } catch (error) {
      console.error(error);
      setError("Error al cargar los resultados de búsqueda");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Reiniciar estado cuando la consulta cambia
  useEffect(() => {
    setPage(1);
    setSearchResults([]);
    setTotalPages(Number.MAX_SAFE_INTEGER);
  }, [query]);

  // Cargar datos cuando la página o la consulta cambian
  useEffect(() => {
    if (query) {
      fetchData(page);
    }
  }, [query, page]);

  // Manejar scroll infinito
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500 &&
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
  }

  return (
    <>
      <Typography variant="h1" gutterBottom align="center">
        Resultados de búsqueda para "{query}"
      </Typography>
      <Box
        sx={{ flexGrow: 1, marginLeft: 3, marginRight: 3, marginBottom: 3 }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3, xl: 4 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {searchResults.map((track, index) => {
            const artistName =
              typeof track.artist === "string"
                ? track.artist
                : track.artist.name;
            return (
              <Grid key={index} size={{ xs: 2, sm: 4, md: 4, xl: 2 }}>
                <Grow in={true}>
                  <Card sx={{ width: "100%" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        track.image?.[3]?.["#text"] || "/placeholder.jpg"
                      }
                      alt="music card"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {track.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "text.secondary" }}
                      >
                        {artistName}
                      </Typography>
                      {track.listeners && (
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {Number(track.listeners).toLocaleString()} oyentes
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        size="medium"
                        onClick={() => handleOpen(track)}
                      >
                        Añadir a Lista
                      </Button>
                      <Button
                        size="medium"
                        onClick={() =>
                          navigation(
                            `/${encodeURIComponent(
                              artistName
                            )}/${encodeURIComponent(track.name)}`
                          )
                        }
                      >
                        Reseñar
                      </Button>
                    </CardActions>
                  </Card>
                </Grow>
              </Grid>
            );
          })}
        </Grid>
        {loadingMore && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <CustomModal
          handleClose={handleClose}
          open={open}
          track={selectedTrack}
        />
      </Box>
    </>
  );
};

export default SearchResultsScreen;