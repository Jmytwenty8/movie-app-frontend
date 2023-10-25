import { Card, Typography, Button, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllBookings,
  fetchMovieDetails,
  getTheaterById,
  getSeatDetails,
  getUserById,
} from "../helpers/apiHelpers";
import { baseUrl } from "../main";
import axios from "axios";
import dayjs from "dayjs";

const AllBookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const f = new Intl.ListFormat("en-us", { style: "short" });

  const handleCancellation = async (id) => {
    try {
      const response = await axios.post(
        baseUrl + "/api/booking/cancel",
        {
          id: id,
        },
        { withCredentials: true }
      );
      if (response.status === 200 || response.status === 201) {
        navigate("/success", { state: { data: response.data } });
      }
    } catch (err) {
      navigate("/error", {
        state: { error: err?.response?.data?.message },
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const allBookings = await getAllBookings();
      const resolvedData = await Promise.all(
        allBookings.map(async (booking) => {
          const data = {
            seats: [],
          };
          data.reservationDate = dayjs(booking.reservationDate).format(
            "DD-MM-YYYY"
          );
          data._id = booking._id;
          data.showtime = booking.showtime;
          const user = await getUserById(booking.userId);
          data.user = user;
          const movieDetails = await fetchMovieDetails(booking.movieId);
          data.movie = movieDetails.name;
          const theaterDetails = await getTheaterById(booking.theaterId);
          data.theater = theaterDetails.name;
          if (booking.seats) {
            const seatNumbers = await Promise.all(
              booking.seats.map(async (seat) => {
                const seatDetails = await getSeatDetails(seat);
                let seatNumber = "";
                seatNumber += seatDetails.data.data.row;
                seatNumber += seatDetails.data.data.column;
                return seatNumber;
              })
            );
            data.seats = seatNumbers;
          }
          return data;
        })
      );
      setBookingData(resolvedData);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {bookingData.length > 0 ? (
        <Box
          direction={"column"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Typography
            variant='h3'
            align='center'
            marginBottom={0}
            marginTop={10}
            marginLeft={50}
            marginRight={50}
          >
            BOOKINGS
          </Typography>
          {bookingData.length > 0 &&
            bookingData.map((booking) => {
              return (
                <Stack direction={"row"} key={booking._id}>
                  <Card
                    key={booking._id}
                    sx={{
                      borderRadius: 8,
                      width: `calc(1000px - (2 * 8px))`,
                      height: `calc(350px - (2 * 8px))`,
                      [`@media (max-width: 768px)`]: {
                        width: "100%",
                        height: "100vh",
                      },
                      marginTop: 5,
                      ":hover": {
                        boxShadow: "10px 10px 20px #ccc",
                      },
                    }}
                  >
                    <Typography
                      variant='h6'
                      marginTop={2}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Movie: <b>{booking.movie}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={1}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Theater: <b>{booking.theater}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={1}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Reservation Date: <b>{booking.reservationDate}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={1}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Booked By: <b>{booking?.user?.name}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={1}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Email: <b>{booking?.user?.email}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={1}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Seats: <b>{f.format(booking.seats)}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={0}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Showtime: <b>{booking.showtime}</b>
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <Button
                        variant='contained'
                        onClick={() => handleCancellation(booking._id)}
                        sx={{
                          bgcolor: "#2b2d42",
                          ":hover": {
                            bgcolor: "#121217",
                          },
                          color: "white",
                        }}
                        size='large'
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Card>
                </Stack>
              );
            })}
        </Box>
      ) : (
        <Box
          direction={"column"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Card
            sx={{
              borderRadius: 8,
              width: `calc(1000px - (2 * 8px))`,
              height: `calc(250px - (2 * 8px))`,
              [`@media (max-width: 768px)`]: {
                width: "100%",
                height: "100vh",
              },
              marginTop: 5,
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}
          >
            <Typography
              variant='h6'
              marginTop={10}
              marginBottom={0}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                letterSpacing: 1,
              }}
            >
              {" "}
              No Bookings Found
            </Typography>
          </Card>
        </Box>
      )}
    </>
  );
};

export default AllBookings;
