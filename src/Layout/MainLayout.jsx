import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="drawer ">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300 backdrop-blur-sm sticky top-0 z-50 ">
          <Navbar />
        </div>
        {/* Page content here */}
        {children}
        <Footer />
      </div>
      <div className="drawer-side z-50 ">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay "
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
