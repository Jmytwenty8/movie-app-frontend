import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../helpers/apiHelpers";
import { Card, Typography, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const BookingSuccess = () => {
  const f = new Intl.ListFormat("en-us", { style: "short" });
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  const [movieData, setMovieData] = useState({});
  useEffect(() => {
    fetchMovieDetails(data.movieId).then((res) => {
      setMovieData(res);
    });
  }, []);
  return (
    <Card
      sx={{
        borderRadius: 8,
        width: `calc(1000px - (2 * 8px))`,
        height: `calc(250px - (2 * 8px))`,
        [`@media (max-width: 768px)`]: {
          width: "100%",
          height: "100vh",
        },
        margin: 60,
        marginTop: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <Typography
        variant='h6'
        marginTop={10}
        marginBottom={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          letterSpacing: 1,
        }}
      >
        <span style={{ whiteSpace: "nowrap" }}>
          Your booking for : [<b>{f.format(data?.seats)}</b>] of{" "}
          <b> {movieData?.name?.toUpperCase()} </b> is confirmed!
        </span>
      </Typography>
      <Box
        marginBottom={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CheckCircleIcon sx={{ color: "green" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Button
          variant='contained'
          onClick={() => {
            navigate("/");
          }}
          sx={{
            bgcolor: "#2b2d42",
            ":hover": {
              bgcolor: "#121217",
            },
            color: "white",
          }}
          size='large'
        >
          Home
        </Button>
      </Box>
    </Card>
  );
};

export default BookingSuccess;
