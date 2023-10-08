import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../helpers/apiHelpers";
import { Card, Stack, Typography, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const BookingSuccess = () => {
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
      <Stack margin={5} marginLeft={40}>
        <Typography variant='h6' marginBottom={2}>
          Your seats : [<b>{data?.seats?.join(",")}</b>] for{" "}
          <b>{movieData?.name?.toUpperCase()}</b> is confirmed
        </Typography>
        <Box marginLeft={20}>
          <CheckCircleIcon />
        </Box>
      </Stack>
      <Box marginLeft={57}>
        <Button
          variant='contained'
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
      </Box>
    </Card>
  );
};

export default BookingSuccess;
