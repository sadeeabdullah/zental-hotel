
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import Error from "./Error";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";

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
    const axios = useAxios();
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
  console.log(allData)
  if(!isError && !isLoading && allData.length === 0){
    return <div className="h-[80vh] flex flex-col w-[89vw] mx-auto gap-12 justify-center items-center">
      <h1 className="text-[#f16f6e] font-bold text-4xl ">You have not booked any rooms yet</h1>
      <button className="btn btn-success">Book a room</button>
    </div>
  }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-[89vw] mx-auto gap-4 py-4 mb-8" >
          {
            allData?.map(d=>( <div key={d._id} className=" mt-8 mx-auto">
  
  
  
              <div className="card bg-base-100 shadow-xl">
                <figure className="h-48"><img src={d.image1} alt="Shoes" /></figure>
                <div className="p-4  ">
                  <h2 className="text-[#08476b] text-2xl font-semibold">{d.room_title}</h2>
                  {
                    d.special_offers?
                    <p className="text-[#f16f6e]  text-lg font-medium">{d.special_offers}</p>
                    :
                    <p className="text-[#706ef1]  text-lg font-medium">No special offer available</p>
                  }
                  
                    <p className="text-semibold mt-2  font-semibold">charges: <span className="font-bold text-xl text-red-600">{d.price_per_night} $ </span></p>
                    
                  <p className="mb-4">{d.room_description.length > 92 ? d.room_description.slice(5,69) : d.room_description}</p>
                  <div className=" flex justify-end pb-4 pr-4">
                    
                      <Link to={`/rooms/${d._id}`}>
                  <button href="#" className=" text-lg text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-xl  relative">Update</button>
                  </Link>
                      <Link to={`/rooms/${d._id}`} className="ml-4">
                  <button href="#" className=" text-lg text-white bg-[#f16f6e] hover:bg-[#f16f6e] px-4 py-2 rounded-xl  relative">Delete</button>
                  </Link>
                  
                  
                  </div>
                </div>
              </div>
                    </div>
            ))
          }
        </div>
    );
};

export default MyBookings;