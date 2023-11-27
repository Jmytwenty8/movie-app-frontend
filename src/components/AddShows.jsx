import {
  Card,
  Stack,
  Button,
  FormControl,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies, getAllTheaters } from "../helpers/apiHelpers";
import { baseUrl } from "../main";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const AddShows = () => {
  const navigator = useNavigate();
  const [movieId, setMovieId] = useState();
  const [theaterId, setTheaterId] = useState();
  const [showtime, setShowtime] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [movieData, setMovieData] = useState([]);
  const [theaterData, setTheaterData] = useState([]);
  const [typedText, setTypedText] = useState({
    movie: "",
    theater: "",
    showtime: "",
  });
  const getMovieId = (movieNameToBeSearched, movieList) => {
    const movie = movieList.find((movie) => {
      const normalizedMovieName = movie.name.toLowerCase();
      const normalizedSearchTerm = movieNameToBeSearched.toLowerCase();
      return normalizedMovieName.includes(normalizedSearchTerm);
    });
    return movie ? movie._id : null;
  };

  const getTheaterId = (theaterNameToBeSearched, theaterList) => {
    const theater = theaterList.find((theater) => {
      const normalizedTheaterName = theater.name.toLowerCase();
      const normalizedSearchTerm = theaterNameToBeSearched.toLowerCase();
      return normalizedTheaterName.includes(normalizedSearchTerm);
    });
    return theater ? theater._id : null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = {
        movieId,
        theaterId,
        showtime,
        startDate,
        endDate,
      };
      const response = await axios.post(baseUrl + "/api/show/create", body, {
        withCredentials: true,
      });
      if (response.status === 200 || response.status === 201) {
        navigator("/success", { state: { data: response.data } });
      }
    } catch (err) {
      navigator("/error", {
        state: { error: err?.response?.data?.message },
      });
    }
  };

  useEffect(() => {
    getMovies().then((res) => {
      setMovieData(res.data);
    });
  }, []);

  useEffect(() => {
    getAllTheaters().then((res) => {
      setTheaterData(res);
    });
  }, []);

  return (
    <Card
      sx={{
        borderRadius: 10,
        width: `calc(800px - (2 * 16px))`,
        height: `calc(700px - (2 * 16px))`,
        display: "block",
        margin: "0 auto",
        marginTop: 10,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography
          variant='h4'
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {" "}
          Shows
        </Typography>
        <Stack direction={"column"}>
          <FormControl
            sx={{
              display: "flex",
              marginTop: 5,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <Autocomplete
              options={movieData && movieData.map((movie) => movie.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => {
                    const movieName = e.target.value;
                    setTypedText((prev) => ({ ...prev, movie: movieName }));
                    const id = getMovieId(movieName, movieData);
                    if (id) {
                      setMovieId(id);
                    }
                  }}
                  onSelect={(e) => {
                    const movieName = e.target.value;
                    setTypedText((prev) => ({ ...prev, movie: movieName }));
                    const id = getMovieId(movieName, movieData);
                    if (id) {
                      setMovieId(id);
                    }
                  }}
                  label='Movies'
                />
              )}
            />
          </FormControl>
          <FormControl
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <Autocomplete
              options={
                theaterData && theaterData.map((theater) => theater.name)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => {
                    setTypedText({ ...typedText, theater: e.target.value });
                    const id = getTheaterId(e.target.value, theaterData);
                    setTheaterId(id);
                  }}
                  onSelect={(e) => {
                    setTypedText({ ...typedText, theater: e.target.value });
                    const id = getTheaterId(e.target.value, theaterData);
                    setTheaterId(id);
                  }}
                  label='Theater'
                />
              )}
            />
          </FormControl>
          <FormControl
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <Autocomplete
              options={["morning", "afternoon", "evening", "night"].map(
                (showtime) => showtime.toUpperCase()
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => {
                    setTypedText({ ...typedText, showtime: e.target.value });
                    setShowtime(e.target.value.toLowerCase());
                  }}
                  onSelect={(e) => {
                    setTypedText({ ...typedText, showtime: e.target.value });
                    setShowtime(e.target.value.toLowerCase());
                  }}
                  label='Showtime'
                />
              )}
            />
          </FormControl>
          <DatePicker
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
            disablePast
            label='Start Date'
            value={startDate || null}
            onChange={(val) => {
              const date = dayjs(val).format();
              setStartDate(date);
            }}
          />
          <DatePicker
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
            label='End Date'
            disablePast
            value={endDate || null}
            onChange={(val) => {
              const date = dayjs(val).format();
              setEndDate(date);
            }}
            shouldDisableDate={(date) => {
              return startDate
                ? dayjs(date).isBefore(dayjs(startDate), "day")
                : false;
            }}
          />
          <Button
            type='submit'
            variant='contained'
            sx={{
              marginTop: 5,
              marginLeft: 10,
              marginRight: 10,
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
              color: "white",
            }}
            size='large'
          >
            CREATE
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default AddShows;
