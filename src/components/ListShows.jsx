import { Card, Typography, Button, Box, TextField, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchMovieDetails,
  getTheaterById,
  getAllShows,
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

const ListShows = () => {
  const [showData, setShowData] = useState([]);
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
        baseUrl + "/api/show/delete",
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
    { id: "movie", label: "Movie", minWidth: 100, align: "center" },
    { id: "theater", label: "Theater", minWidth: 100, align: "center" },
    {
      id: "showtime",
      label: "Showtime",
      minWidth: 100,
      align: "center",
    },
    { id: "startDate", label: "Start Date", minWidth: 100, align: "center" },
    { id: "endDate", label: "End Date", minWidth: 100, align: "center" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const allShows = await getAllShows();
      const resolvedData = await Promise.all(
        allShows.map(async (show) => {
          const data = {};
          data._id = show._id;
          data.showtime = show.showtime;
          const movieDetails = await fetchMovieDetails(show.movieId);
          data.movie = movieDetails.name;
          const theaterDetails = await getTheaterById(show.theaterId);
          data.theater = theaterDetails.name;
          data.startDate = dayjs(show.startDate).format("DD-MM-YYYY");
          data.endDate = dayjs(show.endDate).format("DD-MM-YYYY");
          return data;
        })
      );
      setShowData(resolvedData);
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
            SHOWS
          </Typography>
          <Button
            variant='contained'
            onClick={() => {
              navigate("/addShows");
            }}
            sx={{
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
              color: "white",
              marginLeft: 40,
              marginRight: 40,
            }}
            size='large'
          >
            Add Show
          </Button>
          <TextField
            id='search'
            label='Search Shows'
            variant='outlined'
            margin='normal'
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Stack>
      </Box>
      {showData.length > 0 ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440, marginTop: 2 }}>
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
                {showData
                  .filter((row) =>
                    columns.some((column) => {
                      return row[column.id]
                        .toString()
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
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
                          let value = row[column.id];

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
            count={showData.length}
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
              No Shows Found
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

export default ListShows;
