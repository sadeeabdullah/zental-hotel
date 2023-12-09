import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { DatePicker } from "antd";
import moment from "moment";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const UpdateDate = () => {
    const params = useParams();
    // load the bookings
    const [allData, setAllData]= useState()
    const [loading, setLoading] = useState(true)
    const {user} = useContext(AuthContext)
    
    
    const [selectedDate, setSelectedDate] = useState(null);


    
    
    const handleDateChange = (date, dateString) => {
      setSelectedDate(dateString);
  }
    useEffect(()=>{
        setLoading(true)
        fetch(`https://zenhotel-server.vercel.app/api/v1/bookings?email=${user?.email}`,{credentials:"include"})
        .then(res =>res.json())
        .then(data => {
          setAllData(data)
          setLoading(false)
        })
        
      },[])
      if(loading){
        return <Loading></Loading>
    
      }
      console.log(loading)

    //   check find the id
    console.log(allData)
   
const findOne = allData?.find(f=> f?._id === params.id);

const {_id,room_title} = findOne

    //   update date in database
    
const handleUpate = () =>{
    axios.patch("https://zenhotel-server.vercel.app/api/v1/update-booking-date",{
        id : _id,
        selectedDate :selectedDate
      })
      .then(res => {
        if(res.data.modifiedCount>0){
           return toast.success('Review Added Successfully')
        }
        toast.error('please change the date')
      })
      
      .then(err =>console.log(err))

}
    
      




if(loading){
    return <Loading></Loading>

  }
    return (
        
            
            
          <div className="h-[80vh] p-8 mb-16 w-[89vw] flex flex-col justify-center items-center ">
          <h1 className="font-bold text-3xl mb-6">Updating the Booking date of {room_title}</h1>
          <div>
          <p className="inline-block w-full mb-4">
          <span className="font-bold">Booking date : </span>
          <DatePicker
      onChange={handleDateChange}
      value={selectedDate ? moment(selectedDate, 'DD-MM-YYYY') : null}
      format="DD-MM-YYYY"
    />
        </p>
        <button
        onClick={handleUpate}
         className=" text-white bg-[#f16f6e] hover:bg-[#f16f6e] px-4 py-2 rounded-xl  relative">Confirm Date</button>

          </div>
          </div>
       
    );
    }


export default UpdateDate;