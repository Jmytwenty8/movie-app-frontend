import MovieCard from "./MovieCard";
import { Box, Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchSharp from "@mui/icons-material/SearchSharp";
import { useState, useEffect } from "react";
import { getMovies } from "../helpers/apiHelpers";

function filterData(searchText, Movies) {
  return Movies.filter((movie) =>
    movie?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
  );
}

const Homepage = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredMovie, setFilteredMovie] = useState([]);
  useEffect(() => {
    const data = async () => {
      const response = await getMovies();
      setMovieList(response.data);
    };
    data();
  }, []);

  useEffect(() => {
    const filteredData = filterData(searchText, movieList);
    setFilteredMovie(filteredData);
  }, [searchText, movieList]);
  return (
    <Box width={"100%"} margin={"auto"} marginTop={5} height={"100%"}>
      <Box width={"50%"} margin={"auto"} height={"30%"}>
        <Autocomplete
          id='free-solo-2-demo'
          disableClearable
          freeSolo
          forcePopupIcon
          options={movieList && movieList.map((movie) => movie.name)}
          renderInput={(params) => (
            <TextField
              variant='standard'
              sx={{ input: { color: "#2b2d42" } }}
              {...params}
              placeholder='Search Movies'
              onChange={(e) => {
                setSearchText(e.target.value);
                const filteredData = filterData(searchText, movieList);
                setFilteredMovie(filteredData);
              }}
              onSelect={(e) => {
                setSearchText(e.target.value);
                const filteredData = filterData(searchText, movieList);
                setFilteredMovie(filteredData);
              }}
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchSharp sx={{ color: "#2b2d42", marginLeft: "8px" }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>
      <Box
        margin={"auto"}
        marginTop={8}
        display='flex'
        width='80%'
        justifyContent={"center"}
        alignItems='center'
        flexWrap='wrap'
      >
        {(!filteredMovie ? movieList : filteredMovie).map((movie) => {
          return <MovieCard {...movie} key={movie._id} />;
        })}
      </Box>
      ;
    </Box>
  );
};

export default Homepage;
