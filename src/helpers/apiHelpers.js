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
