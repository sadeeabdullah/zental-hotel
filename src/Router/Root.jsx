import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/NormalPages/Home";
import MyBookings from "../Pages/NormalPages/MyBookings";
import Register from "../Pages/AuthRelated/Register";
import Login from "../Pages/AuthRelated/Login";
import Rooms from "../Pages/NormalPages/Rooms";
import RoomDetailsPage from "../Pages/NormalPages/RoomDetailsPage";
import Error from "../Pages/NormalPages/Error";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error></Error>,
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
            path:'rooms/:id',
            element: <RoomDetailsPage></RoomDetailsPage>
          },
          {
            path: 'mybookings',
            element: <PrivateRoute><MyBookings /></PrivateRoute>,
          },
          {
            path: 'services',
            // element: <Services />,
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