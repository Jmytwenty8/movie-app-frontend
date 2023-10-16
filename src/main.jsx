import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import App from "./App";
import Signup from "./components/Signup";
import Homepage from "./components/Homepage";
import { Provider } from "react-redux";
import { store } from "./Store";
import Movie from "./components/Movie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Booking from "./components/Booking";
import BookingSuccess from "./components/BookingSuccess";
import Error from "./components/Error";
import Success from "./components/Success";
import Profile from "./components/Profile";
import MyBooking from "./components/MyBooking";
import Password from "./components/Password";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddShows from "./components/AddShows";
import ListShows from "./components/ListShows";
import ListMovies from "./components/ListMovies";
import AddMovies from "./components/AddMovies";
import ListTheaters from "./components/ListTheaters";
import AddTheaters from "./components/AddTheaters";
import ListUsers from "./components/ListUsers";
import AllBookings from "./components/AllBookings";

export const baseUrl = "http://localhost:3000";

const queryClient = new QueryClient();

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signin",
        element: <Login />,
      },
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/create",
        element: <Signup />,
      },
      {
        path: "/movie/:id",
        element: <Movie />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/movieSuccess",
        element: <BookingSuccess />,
      },
      {
        path: "/error",
        element: <Error />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/booked",
        element: <MyBooking />,
      },
      {
        path: "/updatePassword",
        element: <Password />,
      },
      {
        path: "/addShows",
        element: <AddShows />,
      },
      {
        path: "/listShows",
        element: <ListShows />,
      },
      {
        path: "/listMovies",
        element: <ListMovies />,
      },
      {
        path: "/addMovies",
        element: <AddMovies />,
      },
      {
        path: "/listTheaters",
        element: <ListTheaters />,
      },
      {
        path: "/addTheaters",
        element: <AddTheaters />,
      },
      {
        path: "/listUsers",
        element: <ListUsers />,
      },
      {
        path: "/allbookings",
        element: <AllBookings />,
      },
      {
        path: "*",
        element: <Navigate to='/' replace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={appRouter} />
      </LocalizationProvider>
    </QueryClientProvider>
  </Provider>
);
