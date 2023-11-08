
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const { user, isLoading} = useAuth()
    const location =  useLocation();
    console.log(location)
    if(isLoading){
        return <Loading></Loading>
    }
    if(!isLoading && !user?.email){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;