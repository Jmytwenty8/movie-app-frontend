import axios from "axios";
import { baseUrl } from "../main";

export const signIn = async (emailId, emailPassword) => {
  const response = await axios.post("/api/user/login", {
    email: emailId,
    password: emailPassword,
  });
  return response;
};

export const getMovies = async () => {
  const response = await axios.get(baseUrl + "/api/movie");
  return response.data;
};

export const getTheaterById = async (theaterId) => {
  const response = await axios.post(
    baseUrl + "/api/theater/inquiry",
    {
      id: theaterId,
    },
    {
      withCredentials: true,
    }
  );
  return response.data.data;
};

export const getSeatDetails = async (id) => {
  const detail = await axios.post(
    baseUrl + "/api/seat/inquiry",
    { id: id },
    { withCredentials: true }
  );
  return detail;
};

export const fetchMovieDetails = async (movieId) => {
  const url = baseUrl + `/api/movie/${movieId}`;
  const response = await axios.get(url);
  return response.data.data;
};

export const getAllBookings = async () => {
  const url = baseUrl + "/api/booking/allbookings/";
  const response = await axios.get(url, { withCredentials: true });
  return response.data.data;
};

export const getAllBookingsByUser = async () => {
  const url = baseUrl + "/api/booking/booked";
  const response = await axios.get(url, { withCredentials: true });
  return response.data.data;
};

export const getAllTheaters = async () => {
  const url = baseUrl + "/api/theater/";
  const response = await axios.get(url, { withCredentials: true });
  return response.data.data;
};

export const getAllShows = async () => {
  const url = baseUrl + "/api/show/";
  const response = await axios.get(url, { withCredentials: true });
  return response.data.data;
};

export const getAllUsers = async () => {
  const url = baseUrl + "/api/user/";
  const response = await axios.get(url, { withCredentials: true });
  return response.data.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(baseUrl + `/api/user/getUserById/${id}`, {
    withCredentials: true,
  });
  return response.data.data;
};

export const getAllWishlistByUser = async () => {
  const response = await axios.get(baseUrl + "/api/wishlist/", {
    withCredentials: true,
  });
  return response.data.data;
};
