import { Card, Typography, Button, Box, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../helpers/apiHelpers";
import { baseUrl } from "../main";
import axios from "axios";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";

const ListMovies = () => {
  const [movieData, setMovieData] = useState([]);
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

  const handleCancellation = async (id) => {
    try {
      const response = await axios.delete(baseUrl + `/api/movie/remove/${id}`, {
        withCredentials: true,
      });
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
    { id: "name", label: "Name", minWidth: 100, align: "center" },
    { id: "description", label: "Description", minWidth: 100, align: "center" },
    {
      id: "imdb",
      label: "IMDB",
      minWidth: 100,
      align: "center",
    },
    {
      id: "runtime",
      label: "Runtime (minutes)",
      minWidth: 100,
      align: "center",
    },
    { id: "actors", label: "Actors", minWidth: 100, align: "center" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMovies();
      setMovieData(response.data);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

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
            MOVIES
          </Typography>
          <Button
            variant='contained'
            onClick={() => {
              navigate("/addMovies");
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
            Add Movie
          </Button>
          <TextField
            id='search'
            label='Search Movies'
            variant='outlined'
            margin='normal'
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Stack>
      </Box>
      {movieData.length > 0 ? (
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
                {movieData
                  .filter((row) =>
                    columns.some((column) => {
                      switch (column.id) {
                        case "actors":
                          return row.actors.some((actor) =>
                            actor
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
                          if (column.id === "actors") {
                            value = row[column.id].join(", ");
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
                            Remove
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
            count={movieData.length}
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
              No Movies Found
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

export default ListMovies;
