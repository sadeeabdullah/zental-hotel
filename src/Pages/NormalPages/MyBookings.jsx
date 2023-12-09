/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const MyBookings = () => {
    const {user,parseDate} =useContext(AuthContext)
    const [allData, setAllData] = useState()
    const [control,setControl] = useState(true)
    const [loading, setLoading] = useState(false)
console.log(user)
    

  useEffect(()=>{
    setLoading(true)
    fetch(`https://zenhotel-server.vercel.app/api/v1/bookings?email=${user?.email}`,{credentials:"include"})
    .then(res =>res.json())
    .then(data => {
      setAllData(data)
      setLoading(false)
    })
    
  },[control])
  

  console.log(allData)

// handleReview



  const handleDelete = (id, date,image1) => {
    const duration = parseDate(date);
    const today = new Date();
    console.log(today, 'today');
    const originalDate = new Date(duration);
  
    // Subtract one day
    originalDate.setDate(originalDate.getDate() - 1);
  
    // Convert resultDateString back to a Date object
    const resultDate = new Date(originalDate);
  
    console.log(resultDate, 'resultDate');
  
    if (today > resultDate) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sorry, you can't cancel the booking as it's less than 1 day before the booked date.",
      });
    }
    if (today < resultDate) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
       
        if (result.isConfirmed) {
          fetch(`https://zenhotel-server.vercel.app/api/v1/delete-booking/${id}`,{
            method:"DELETE",
          })
          .then(res => res.json())
          .then(data => {
            if(data.deletedCount > 0){
              setControl(!control)
              axios.patch("https://zenhotel-server.vercel.app/api/v1/delete",{
        availiblity : "available",
        image: image1,
      })
      .then(res => console.log(res))
      
      .then(err =>console.log(err))
            }})
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    }
  }
  
  


  if(allData?.length === 0){
    return <div className="h-[80vh] flex flex-col w-[89vw] mx-auto gap-12 justify-center items-center">
      <h1 className="text-[#f16f6e] font-bold text-4xl ">You have not booked any rooms yet</h1>
      <Link to='/rooms'>
      <button  className="btn btn-success">Book a room</button></Link>
    </div>
  }


  if(loading){
    return <Loading></Loading>
  }

  // 


    return (
      
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 w-[89vw] mx-auto gap-4 py-4 mb-8" >
          {
           Array.isArray(allData) && allData.map(d=>( <div key={d._id} className=" mt-8 mx-auto">
  
  
  
              <div className="card bg-base-100 shadow-xl">
                <figure className="h-48"><img src={d.image1} alt="Shoes" /></figure>
                <div className="p-6  ">
                  <h2 className="text-[#08476b] text-2xl font-semibold">{d.room_title}</h2>
                  {
                    d.special_offers?
                    <p className="text-[#f16f6e]  text-lg font-medium">{d.special_offers}</p>
                    :
                    <p className="text-[#706ef1]  text-lg font-medium">No special offer available</p>
                  }
                  
                    <p className="text-semibold mt-2  font-semibold">charges: <span className="font-bold text-xl text-red-600">{d.price_per_night} $ </span></p>
                    <p className=""><span className="text-semibold mt-2  font-semibold">Booking for : </span>{d.booking_duration} (single Day)</p>
                    
                  <p className="mb-8">{d.room_description.length > 92 ? d.room_description.slice(5,69) : d.room_description}</p>
                  <div className=" flex justify-evenly">
                    
                  
                 
                   <Link to={`/addReview/${d._id}`}>
                  <button  className=" text-lg text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-xl  relative">Review</button>
                  </Link>
                  
                    
                  <Link to={`/update-booking-date/${d._id}`}>
                  <button  className=" text-lg text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-xl  relative">Update Date</button>
                  </Link>
                  
                      
                  <button
                   
                  onClick={()=>handleDelete(d._id,d.booking_duration,d.image1)} className=" text-lg ml-4 text-white bg-[#f77570] hover:bg-[#f16f6e] px-4 py-2 rounded-xl  relative">Delete</button>
                  
                  
                  
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