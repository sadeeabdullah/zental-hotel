import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../Components/Loading/Loading";
import { useParams } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Error from "./Error";
import { DatePicker } from "antd";
import moment from "moment";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const RoomDetailsPage = () => {
  // const axios = useAxios();
  const params = useParams();
  const {  user } = useContext(AuthContext);
  // for fetching the data of room 
  const axios = useAxios();
  const getRoomsData =async () => {
      const res =  axios.get(`rooms/${params.id}`)
      return res ;
  }
  const query = useQuery({
      queryKey: ['roomsData'],
      queryFn: getRoomsData,
  })
  const { data, isLoading, isError } = query;
  const [selectedDate, setSelectedDate] = useState(null);
  
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
  const allData = data?.data;
  console.log(allData)
  const{_id,room_title,room_description,price_per_night,room_size,image1,image2,special_offers,seat_count,booking_status,reviews} = allData

  

    const handleDateChange = (date, dateString) => {
      setSelectedDate(dateString);
  }

  const handleBook = async () => {
    if(selectedDate !== null ){
      await axios.post("http://localhost:5000/api/v1/create-bookings", {
        room_title : room_title,
        room_description : room_description,
        price_per_night : price_per_night,
        room_size : room_size,
        image1 : image1,
        image2 : image2,
        booking_duration : selectedDate,
        special_offers : special_offers,
        user_email : user.email,
      })
      .then(res => {if(res.status === 200){
        toast.success("Successfully booked")
      }})
      .then(err => console.log(err))

      axios.patch("http://localhost:5000/api/v1/booked",{
        availiblity : "unavailble",
        id: _id,
      })
      .then(res => console.log(res))
      .then(err =>console.log(err))



      // for updating while the room is booked

    }

    else{
      toast.error('please select a date')
    }
    
    
    
    // update bookings
  };

  // if the booking date over then a  patch request will be send to the database and set the booking status available

  // to pick present date
  // const presentDate = new Date();

  // if(selectedDate){
  //   const selectedDateStr = selectedDate;
  // const selected = parseDate(selectedDateStr)
  // console.log(selected)
  // }
  // console.log(isBefore(presentDate,tomorrow))



  return (
   
    <div className="w-[89vw] mx-auto">
      {/* for slider */}
      <div className="">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="h-[70vh] lg:h-[80vh] w-[89vw] lg:w-[70vw] mx-auto"
        >
          <SwiperSlide>
            <img className="w-[89vw] h-full" src={image1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-[89vw] h-full" src={image2} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* for other information */}
      <div className="p-8">
        <h1 className="text-3xl text-[#08476b] font-semibold mb-4">
          {room_title}
        </h1>
        <p className="text-xl mb-1">{room_description}</p>
        <div className="flex gap-7 items-center mb-1">
          <p>
            <span className="font-bold">Special Offer : </span>
            {special_offers ? special_offers : "No special offer available"}
          </p>
          <p className="font-semibold text-black">
            Charges :{" "}
            <span className=" text-xl text-[#08476b]">{price_per_night} </span>{" "}
            $
          </p>
        </div>

        <p className="mb-1">
          <span className="font-bold ">Room Availability : </span>
          {booking_status}
        </p>
        
        <p className="mb-1">
          <span className="font-bold ">Room Availability : </span>
          {reviews?.length}
        </p>
        <p className="mb-2">
          <span className="font-bold">Room Space : </span>
          {room_size}
        </p>
        <p className="mb-2">
          <span className="font-bold">Seat available : </span>
          {seat_count}
        </p>


        {/* for date picker */}
        <p className="inline-block w-full mb-4">
          <span className="font-bold">Booking date : </span>
          <DatePicker
      onChange={handleDateChange}
      value={selectedDate ? moment(selectedDate, 'DD-MM-YYYY') : null}
      format="DD-MM-YYYY"
    />
        </p>
        {
          booking_status === 'available'? <button
          onClick={()=>document.getElementById('my_modal_5').showModal()}
          className="  text-white bg-[#f16f6e] hover:bg-[#f16f6e] px-4 py-2 rounded-xl  relative"
        >
          Review Details
        </button> 
        :
        <button className=" text-white bg-[#f16f6e] hover:bg-[#f16f6e] px-4 py-2 rounded-xl  relative disabled">Not Available</button>
        }
        
        
      </div>


      {/* for modal */}
      <dialog id="my_modal_5" className="modal modal-bottom  sm:modal-middle">
  <div className="modal-box bg-gradient-to-br from-[#85c2e5] via-gray-200 to-[#f16f6e]">
  <h1 className="text-3xl text-[#08476b] font-semibold mb-4">
          {room_title}
        </h1>
        <p className="text-xl mb-1">{room_description}</p>
        <div className="flex gap-7  items-center mb-1">
          <p>
            <span className="font-bold">Special Offer : </span>
            {special_offers ? special_offers : "No special offer available"}
          </p>
          <p className="font-semibold text-black">
            Charges : <span className=" text-xl text-[#08476b]">{price_per_night} </span>
            $
          </p>
        </div>
          <p className="mb-2">
          <span className="font-bold">Room Space : </span>
          {room_size}
        </p>
          <p className="mb-6">
          <span className="font-bold">Booking for : </span>
          {selectedDate? selectedDate : 'set a date please'} (Singleday)
        </p>
    <div className="">
      <form method="dialog"  className="flex justify-center gap-8">
        {/* if there is a button in form, it will close the modal */}
        <button
        onClick={handleBook}
         className="btn  bg-[#eb5b5b] text-white border-0 hover:bg-[#ca3232]">confirm</button>
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  );
};

export default RoomDetailsPage;
