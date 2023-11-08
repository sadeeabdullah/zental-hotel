
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyBookings = () => {
    const {user,parseDate,yesterDate} =useContext(AuthContext)
    const [allData, setAllData] = useState()
    const [control,setControl] = useState(true)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState()



  useEffect(()=>{
    setLoading(true)
    fetch(`http://localhost:5000/api/v1/bookings?email=${user?.email}`,{credentials:"include"})
    .then(res =>res.json())
    .then(data => {
      setAllData(data)
      setLoading(false)
    })
    
  },[control,user])
  






  const handleDelete = (id, date) => {
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
          fetch(`http://localhost:5000/api/v1/delete-booking/${id}`,{
            method:"DELETE",
          })
          .then(res => res.json())
          .then(data => {
            if(data.deletedCount > 0){
              setControl(!control)
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
  console.log(allData)
  


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
      
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-[89vw] mx-auto gap-4 py-4 mb-8" >
          {
           Array.isArray(allData) && allData.map(d=>( <div key={d._id} className=" mt-8 mx-auto">
  
  
  
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
                  <div className=" grid grid-cols-3 gap-2 pb-4 pr-4">
                    
                      <Link to={`/rooms/${d._id}`}>
                  <button href="#" className=" text-lg text-white bg-[#074468] hover:bg-[#152a36] px-4 py-2 rounded-xl  relative">Review</button>
                  </Link>
                      <Link to={`/rooms/${d._id}`}>
                  <button href="#" className=" text-lg text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-xl  relative">Update</button>
                  </Link>
                      
                  <button onClick={()=>handleDelete(d._id,d.booking_duration)} className=" text-lg ml-4 text-white bg-[#f16f6e] hover:bg-[#f16f6e] px-4 py-2 rounded-xl  relative">Delete</button>
                  
                  
                  
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