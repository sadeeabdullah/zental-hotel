import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/NormalPages/Home";
import Rooms from "../Pages/NormalPages/Rooms";
import MyBookings from "../Pages/NormalPages/MyBookings";
import Register from "../Pages/AuthRelated/Register";
import Login from "../Pages/AuthRelated/Login";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'rooms',
            element: <Rooms />,
          },
          {
            path: 'mybookings',
            element: <MyBookings />,
          },
          {
            path: 'services',
            // element: <Services />,
          },
          {
            path: 'booking',
            // element: <Booking />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
])

export default routes;