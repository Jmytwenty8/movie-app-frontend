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
