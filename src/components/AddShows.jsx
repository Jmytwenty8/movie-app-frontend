import {
  Card,
  Stack,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
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
            <InputLabel>Movies</InputLabel>
            <Select
              onChange={(e) => {
                setMovieId(e.target.value);
              }}
              label='Movies'
              margin={10}
            >
              {movieData?.map((movie) => {
                return (
                  <MenuItem key={movie._id} value={movie._id}>
                    {movie.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <InputLabel>Theaters</InputLabel>
            <Select
              onChange={(e) => {
                setTheaterId(e.target.value);
              }}
              label='Theaters'
            >
              {theaterData?.map((theater) => {
                return (
                  <MenuItem key={theater._id} value={theater._id}>
                    {theater.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <InputLabel>Showtime</InputLabel>
            <Select
              onChange={(e) => {
                setShowtime(e.target.value);
              }}
              label='Showtime'
            >
              {["morning", "afternoon", "evening", "night"].map((show) => {
                return (
                  <MenuItem key={show} value={show}>
                    {show.toUpperCase()}
                  </MenuItem>
                );
              })}
            </Select>
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
            value={startDate}
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
            value={endDate}
            onChange={(val) => {
              const date = dayjs(val).format();
              setEndDate(date);
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
