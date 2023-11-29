import { Card, Typography, Button, Box, TextField } from "@mui/material";
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
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";

const AllBookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

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

  const columns = [
    { id: "movie", label: "Movie", minWidth: 100, align: "left" },
    { id: "theater", label: "Theater", minWidth: 100, align: "center" },
    {
      id: "reservationDate",
      label: "Reservation Date",
      minWidth: 100,
      align: "center",
    },
    { id: "user", label: "User", minWidth: 100, align: "center" },
    { id: "email", label: "Email", minWidth: 100, align: "center" },
    { id: "showtime", label: "Showtime", minWidth: 100, align: "center" },
    { id: "seats", label: "Seats", minWidth: 100, align: "left" },
  ];

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

  return (
    <>
      {bookingData.length > 0 ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id='search'
              label='Search Bookings'
              variant='outlined'
              margin='normal'
              fullWidth
              sx={{ width: "100%", maxWidth: "800px" }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 800, marginTop: 5 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          padding: "10px",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {bookingData
                    .filter((row) =>
                      columns.some((column) => {
                        switch (column.id) {
                          case "user":
                            return (
                              row.user.name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                              row.user.email
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                            );
                          case "email":
                            return row.user.email
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase());
                          case "seats":
                            return row.seats.some((seat) =>
                              seat
                                .toString()
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                            );
                          default:
                            return row[column.id]
                              .toString()
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase());
                        }
                      })
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <StyledTableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={row._id}
                        >
                          {columns.map((column) => {
                            let value;
                            if (column.id === "user") {
                              value = row.user.name;
                            } else if (column.id === "email") {
                              value = row.user.email;
                            } else if (column.id === "seats") {
                              value = row.seats.join(",");
                            } else {
                              value = row[column.id];
                            }

                            return (
                              <StyledTableCell
                                key={column.id}
                                align={column.align}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </StyledTableCell>
                            );
                          })}
                          <StyledTableCell>
                            <Button
                              variant='contained'
                              color='error'
                              onClick={() => handleCancellation(row._id)}
                            >
                              Cancel
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={bookingData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default AllBookings;
