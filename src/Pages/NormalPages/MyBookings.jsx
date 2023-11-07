import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import Error from "./Error";

const MyBookings = () => {
    const {user} =useContext(AuthContext)
    // console.log(user?.email)
    // axios.get(`http://localhost:5000/api/v1/bookings?email=${user?.email}`,{withCredentials:true})

    // .then(res =>{
    //     console.log(res.data)
    // })
    // .then(err =>{
    //     console.log(err)
    // })
    // for fetching the data of room 
  const getRoomsData =async () => {
      const res =  axios.get(`http://localhost:5000/api/v1/bookings?email=${user?.email}`,{withCredentials:true})
      return res ;
  }
  const query = useQuery({
      queryKey: ['roomsData'],
      queryFn: getRoomsData,
  })
  const { data, isLoading, isError } = query;
  if (isLoading) {
    return (
      <div
        className="flex
        justify-center items-center"
      >
        <Loading></Loading>
      </div>
    );
  }
  if (isError) {
    return <Error></Error>;
  }
  const allData = data.data;
    return (
        <div className="h-screen">
            this is my bookingsroom
        </div>
    );
};

export default MyBookings;