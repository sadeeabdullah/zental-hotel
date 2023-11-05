
import { NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const Sidebar = () => {
  
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-col gap-2">
      {/* Navbar menu content here */}
      <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'btn bg-gradient-to-tr from-[rgb(231,159,159)] to-[rgb(238,123,123)] btn-sm' : 'btn btn-ghost btn-sm'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              isActive ? 'btn bg-gradient-to-tr from-[rgb(231,159,159)] to-[rgb(238,123,123)] btn-sm' : 'btn btn-ghost btn-sm'
            }
          >
            Rooms
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'btn bg-gradient-to-tr from-[rgb(231,159,159)] to-[rgb(238,123,123)] btn-sm' : 'btn btn-ghost btn-sm'
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/mybookings"
            className={({ isActive }) =>
              isActive ? 'btn bg-gradient-to-tr from-[rgb(231,159,159)] to-[rgb(238,123,123)] btn-sm' : 'btn btn-ghost btn-sm'
            }
          >
            My Bookings
          </NavLink>
          {user?.email ?
          <NavLink
          to="/"
          onClick={logout}
          className={({ isActive }) =>
            isActive ? 'btn bg-gradient-to-tr from-[rgb(231,159,159)] to-[rgb(238,123,123)] btn-sm' : 'btn btn-ghost btn-sm'
          }
        >
          Logout
        </NavLink>
          : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'btn bg-gradient-to-tr from-[rgb(231,159,159)] to-[rgb(238,123,123)] btn-sm' : 'btn btn-ghost btn-sm'
              }
            >
              Login
            </NavLink>
          )}
    </div>
  );
};

export default Sidebar;
