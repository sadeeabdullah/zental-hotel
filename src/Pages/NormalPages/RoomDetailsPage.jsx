import { useContext} from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../Components/Loading/Loading";
import { useParams } from "react-router-dom";
import { Pagination } from 'swiper/modules';
// import Swiper from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';





const RoomDetailsPage = () => {
    const params  = useParams();
    const {query}  = useContext(AuthContext);
    const  {data, isLoading , isError,error} = query;
    if(isLoading){
        return <div className="flex
        justify-center items-center">
            <Loading></Loading>
        </div>
    }
    if(isError){
        return <p>something went wrong:${error.message}</p>
      }
      const allData = data.data;

    
      
    const findedRoom = allData.find(finded => finded._id === params.id)
    console.log(findedRoom)
    const {room_title,
        room_description,
        price_per_night,
        room_size,
        image1,
        image2,
        booking_duration,
        special_offers,
        seat_count,
        booking_status} = findedRoom;


        console.log(image2)

    return (
        <div className="w-[89vw] mx-auto">
            {/* for slider */}
            <div className="">
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="h-[70vh] lg:h-[80vh] w-[89vw] lg:w-[70vw] mx-auto"
      >
        <SwiperSlide >
            <img className="w-[89vw] h-full"  src={image1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img className="w-[89vw] h-full" src={image2} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>

    {/* for other information */}
    <div className="p-8">
        <h1 className="text-3xl text-[#08476b] font-semibold mb-4">{room_title}</h1>
        <p className="text-xl mb-1">{room_description}</p>
        <div className="flex gap-7 items-center mb-1">
        <p> <span className="font-bold">Special Offer : </span>{special_offers ? special_offers:'No special offer available'}</p>
        <p className="font-semibold text-black">Charges : <span className=" text-xl text-[#08476b]">{price_per_night} </span> $</p>
        </div>

        <p className="mb-1"><span className="font-bold ">Room Availability : </span>{booking_status}</p>
        <p><span className="font-bold">Room Space : </span>{room_size}</p>
    </div>
        </div>
    );
};

export default RoomDetailsPage;