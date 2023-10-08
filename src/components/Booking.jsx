import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../main";
import { useEffect, useState, useMemo } from "react";
import { Stack, Button, Box, Card, Grid } from "@mui/material";
import { getTheaterById, getSeatDetails } from "../helpers/apiHelpers";
import TheaterScreen from "./TheaterScreen";

const Booking = () => {
  const location = useLocation();
  const data = location.state;
  const [vacantSeats, setVacantSeats] = useState([]);
  const [theaterData, setTheaterData] = useState({});
  const [allSeats, setAllSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getVacantSeats = async () => {
    let seats = await axios.post(baseUrl + "/api/booking/vacantseats", data, {
      withCredentials: true,
    });
    seats = await seats.data.data;
    setVacantSeats(seats);
  };

  const getAllSeats = async () => {
    const seats = axios.get(baseUrl + "/api/seat");
    setAllSeats((await seats).data.data);
  };

  const sortedAllSeats = useMemo(() => {
    if (allSeats) {
      return (
        Array.isArray(allSeats) &&
        allSeats.sort((a, b) => {
          const rowComparison = b.row.localeCompare(a.row);
          if (rowComparison !== 0) return rowComparison;
          return b.column - a.column;
        })
      );
    }
    return allSeats;
  }, [allSeats]);

  const toggleSelectedSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const isSeatSelected = (seat) => {
    return selectedSeats.includes(seat);
  };

  useEffect(() => {
    getVacantSeats();
    getTheaterById(data.theaterId).then((res) => {
      setTheaterData(res);
    });
    getAllSeats();
  }, [data]);

  return (
    <Card
      sx={{
        borderRadius: 8,
        width: `calc(900px - (2 * 8px))`,
        height: `calc(500px - (2 * 8px))`,
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
      <Grid
        direction='column'
        justifyContent='space-between'
        sx={{
          height: "100%",
        }}
      >
        <Grid item>
          <Stack>
            <Stack
              direction={"row"}
              spacing={0}
              flexWrap='wrap'
              margin={20}
              marginTop={5}
              marginLeft={25}
            >
              {Array.isArray(sortedAllSeats) &&
                sortedAllSeats.map((seat) => {
                  const isIncluded = vacantSeats.some(
                    (vacantSeat) => vacantSeat._id === seat._id
                  );
                  if (isIncluded) {
                    return (
                      <Box
                        sx={{ width: "15%", display: "inline-block" }}
                        key={seat._id}
                        margin={1}
                      >
                        <Button
                          key={seat._id}
                          onClick={() => toggleSelectedSeat(seat)}
                          selected={isSeatSelected(seat)}
                          variant={
                            isSeatSelected(seat) ? "contained" : "outlined"
                          }
                          sx={{
                            minWidth: "100%",
                            height: "100%",
                          }}
                          fullWidth
                        >
                          {seat.row} {seat.column}
                        </Button>
                      </Box>
                    );
                  } else {
                    return (
                      <Box
                        sx={{ width: "15%", display: "inline-block" }}
                        key={seat._id}
                        margin={1}
                      >
                        <Button
                          key={seat._id}
                          variant='contained'
                          sx={{ minWidth: "100%", height: "100%" }}
                          fullWidth
                          disabled
                        >
                          {seat.row} {seat.column}
                        </Button>
                      </Box>
                    );
                  }
                })}
            </Stack>
            <Box
              margin={"auto"}
              marginTop={-60}
              marginLeft={6}
              display={"block"}
            >
              <TheaterScreen />
            </Box>
          </Stack>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: 100,
              marginTop: -30,
            }}
          >
            Book {selectedSeats.length > 0 ? selectedSeats.length : ""}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Booking;
