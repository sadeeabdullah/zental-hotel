
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
    

    

  useEffect(()=>{
    setLoading(true)
    fetch(`http://localhost:5000/api/v1/bookings?email=${user?.email}`,{credentials:"include"})
    .then(res =>res.json())
    .then(data => {
      setAllData(data)
      setLoading(false)
    })
    
  },[control,user])
  






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
          fetch(`http://localhost:5000/api/v1/delete-booking/${id}`,{
            method:"DELETE",
          })
          .then(res => res.json())
          .then(data => {
            if(data.deletedCount > 0){
              setControl(!control)
              axios.patch("http://localhost:5000/api/v1/delete",{
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
                    <p className=""><span className="text-semibold mt-2  font-semibold">Booking for : </span>{d.booking_duration} (single Day)</p>
                    
                  <p className="mb-4">{d.room_description.length > 92 ? d.room_description.slice(5,69) : d.room_description}</p>
                  <div className=" grid grid-cols-3 gap-2 pb-4 pr-4">
                    
                  
                  <button
                  onClick={()=>document.getElementById('my_modal_5').showModal()}
                   className=" text-lg text-white bg-[#074468] hover:bg-[#152a36] px-4 py-2 rounded-xl  relative">Review</button>
                  
                      <Link to={`/rooms/${d._id}`}>
                  <button href="#" className=" text-lg text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-xl  relative">Update</button>
                  </Link>
                      
                  <button onClick={()=>handleDelete(d._id,d.booking_duration,d.image1)} className=" text-lg ml-4 text-white bg-[#f16f6e] hover:bg-[#f16f6e] px-4 py-2 rounded-xl  relative">Delete</button>
                  
                  
                  
                  </div>
                </div>
              </div>




                  {/* for modal */}
<dialog id="my_modal_5" className="modal modal-bottom  sm:modal-middle">
  <div className="modal-box bg-gradient-to-br from-[#85c2e5] via-gray-200 to-[#f16f6e]">

    {/* for user name and time stamp */}
    <div>
      <label className="block mb-2 text-sm font-medium text-[#074468] dark:text-white" htmlFor="User Name">User Name</label>
      <input defaultValue={user?.displayName?  user.displayName : ""}
      className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
       type="text" name=""  placeholder="User Name" id="" />
      
          
          <label  className="block mb-2 text-sm font-medium text-[#074468] dark:text-white" htmlFor="Reservation Time">Reservation Time</label>
            <input defaultValue={d.booking_duration}
            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             type="text" name=""  placeholder="Reservation Time" id="" />
          
    </div>

          {/* for rating and comment */}

          <div className="mb-8">
      <label className="block mb-2 text-sm font-medium text-[#074468] dark:text-white" htmlFor="User Name">User Name</label>
      <input defaultValue={5}
      className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
       type="text" name=""  placeholder="Review us" id="" />
      
          
          <label  className="block mb-2 text-sm font-medium text-[#074468] dark:text-white" htmlFor="Comment">Comment</label>
            <input 
            className="bg-gray-50 mb-4 border  h-[100px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             type="text" name=""  placeholder="Write you comment here" id="" />
          
    </div>





    {/* for buttons */}
  <div className="">
      <form method="dialog"  className="flex justify-center gap-8">
        {/* if there is a button in form, it will close the modal */}
        <button
         className="btn  bg-[#eb5b5b] text-white border-0 hover:bg-[#ca3232]">Post Review</button>
        <button className="btn">Cancel</button>
      </form>
    </div>
  </div>
</dialog>







                    </div>
                    






                    
            ))
          }

          








        </div>
    );
};

export default MyBookings;