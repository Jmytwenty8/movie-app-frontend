/* eslint-disable no-unused-vars */
import { Card, Typography, Box, Stack, Rating, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllReviews, fetchMovieDetails } from "../helpers/apiHelpers";
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
import { getUserById } from "../helpers/apiHelpers";

const ListReviewsForAdmin = () => {
  const [reviewData, setReviewData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

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

  const columns = [
    { id: "movie", label: "Movie", minWidth: 100, align: "center" },
    {
      id: "reservationDate",
      label: "Reservation Date",
      minWidth: 100,
      align: "center",
    },
    {
      id: "user",
      label: "User",
      minWidth: 100,
      align: "center",
    },
    { id: "email", label: "Email", minWidth: 100, align: "center" },
    {
      id: "isPending",
      label: "Review Pending",
      minWidth: 100,
      align: "center",
    },
    { id: "rating", label: "Rating", minWidth: 100, align: "center" },
    { id: "description", label: "Description", minWidth: 100, align: "center" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      let reviews = await getAllReviews();
      const resolvedData = await Promise.all(
        reviews.map(async (review) => {
          const data = {
            ...review,
          };
          data.reservationDate = dayjs(review.reservationDate).format(
            "DD-MM-YYYY"
          );
          data.user = await getUserById(review.userId);
          const movieDetails = await fetchMovieDetails(review.movieId);
          data.movie = movieDetails.name;
          return data;
        })
      );
      setReviewData(resolvedData);
    };
    fetchData();
  }, []);

  return (
    <>
      <Box
        direction={"column"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Stack>
          <Typography
            variant='h3'
            align='center'
            marginBottom={1}
            marginTop={10}
            marginLeft={50}
            marginRight={50}
          >
            REVIEWS
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          id='search'
          label='Search Reviews'
          variant='outlined'
          margin='normal'
          fullWidth
          sx={{ width: "100%", maxWidth: "800px" }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>
      {reviewData.length > 0 ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 600, marginTop: 2 }}>
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
                {reviewData
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
                        default:
                          return row[column.id]
                            ?.toString()
                            ?.toLowerCase()
                            ?.includes(searchQuery.toLowerCase());
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
                          } else if (column.id === "isPending") {
                            if (
                              row.isPending.toString().toLowerCase() === "true"
                            ) {
                              value = "true";
                            } else {
                              value = "false";
                            }
                          } else if (column.id === "description") {
                            if (!row.description) {
                              value = "";
                            } else {
                              value = row.description;
                            }
                          } else if (column.id === "rating") {
                            if (!row.rating) {
                              value = (
                                <Rating
                                  value={0}
                                  precision={0.5}
                                  sx={{ pointerEvents: "none" }}
                                />
                              );
                            } else {
                              value = (
                                <Rating
                                  value={row.rating}
                                  precision={0.5}
                                  sx={{ pointerEvents: "none" }}
                                />
                              );
                            }
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
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={reviewData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
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
              No Movies Found For Review
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

export default ListReviewsForAdmin;
