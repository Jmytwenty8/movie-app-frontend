import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  </Provider>
);
