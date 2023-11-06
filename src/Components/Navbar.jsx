import { NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const Navbar = () => {
//   const { user, logout } = useAuth();
const { user, logout } = useAuth();
return (
    
      <div className=" w-full max-w-[1250px] px-[25px] mx-auto ">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1 text-xl ">
        <img src="src/assets/image/logo-20230222101241.svg" alt="" />
      </div>
      <div className="flex-none hidden lg:block">
        <div className="flex items-center gap-2">
          {/* Navbar menu content here */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'btn bg-gradient-to-tr from-[rgb(231,159,159)] to-[rgb(238,123,123)] text-[#08476b] btn-sm' : 'btn btn-ghost btn-sm'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              isActive ? 'btn bg-gradient-to-tr from-[rgb(231,159,159)] to-[rgb(238,123,123)] text-[#08476b] btn-sm' : 'btn btn-ghost btn-sm'
            }
          >
            Rooms
          </NavLink>
          
          <NavLink
            to="/mybookings"
            className={({ isActive }) =>
              isActive ? 'btn bg-gradient-to-tr from-[#f16f6e] to-[rgb(238,123,123)] text-[#08476b] btn-sm' : 'btn btn-ghost btn-sm'
            }
          >
            My Bookings
          </NavLink>
          {user?.email ? (
            <div className="dropdown dropdown-end ">
              <label tabIndex={0} className="cursor-pointer">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                  </div>
                </div>
              </label>
              <div
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <NavLink
                  to="/user"
                  className="px-4 py-2 hover:bg-base-300 rounded-lg"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/user/orders"
                  className="px-4 py-2 hover:bg-base-300 rounded-lg"
                >
                  Orders
                </NavLink>

                <div
                  onClick={logout}
                  className="cursor-pointer text-red-500 px-4 py-2 hover:bg-base-300 rounded-lg"
                >
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'btn bg-gradient-to-tr from-[rgb(231,159,159)] to-[rgb(238,123,123)] text-[#08476b] btn-sm' : 'btn btn-ghost btn-sm'
              }
            >
              Login
            </NavLink>
          )}
          

        </div>
      </div>
    </div>
  );
};

export default Navbar;
