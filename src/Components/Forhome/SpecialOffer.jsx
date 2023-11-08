import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";


const SpecialOffer = () => {
  const [info,setInfo] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  useEffect(() =>{
    fetch('http://localhost:5000/api/v1/rooms')
    .then(res =>res.json())
    .then(data => setInfo(data))
    setIsLoading(false)
  },[!isLoading])
  if(isLoading){
    return <Loading></Loading>
  }

    return (
      <div>
                  <h2 className="text-4xl text-[#08476b] text-center mb-6 font-bold">Special offers</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-[89vw] mx-auto gap-4">
        {
          info?.map(d=>(
            d?.special_offers !== "" && <div key={d._id} className=" mt-8 mx-auto">



            <div className="card bg-base-100 shadow-xl">
              <figure className="h-48"><img src={d.image1} alt="Shoes" /></figure>
              <div className="p-4  ">
                <h2 className="text-[#08476b] text-2xl font-semibold">{d.room_title}</h2>
                <p className="text-[#f16f6e]  text-lg font-medium">{d.special_offers}</p>
                {
                  d.booking_status === 'available' ?
                  <p className="text-semibold mt-2  font-semibold">charges: <span className="font-bold text-xl text-red-600">{d.price_per_night} $ </span></p>
                  :
                  <p className="text-red-900 mt-4  text-sm">Room unavailable. Check alternatives.</p>
                }
                <p className="mb-4">{d.room_description.length > 92 ? d.room_description.slice(5,69) : d.room_description}</p>
                <div className=" flex justify-end pb-4 pr-4">
                  {
                    d.booking_status === 'available' ?
                    <Link to={`/rooms/${d._id}`}>
                <button href="#" className=" text-lg text-white bg-[#f16f6e] hover:bg-[#f16f6e] px-4 py-2 rounded-xl  relative">Book Now</button>
                </Link>
                :
                <Link to='rooms'>
                
                <button className="text-lg text-white bg-[#f16f6e] hover:bg-[#f16f6e] px-4 py-2 rounded-xl  relative">Explore more</button>
                </Link>
                  }
                
                </div>
              </div>
            </div>
                  </div>
          ))
        }
        </div>
      </div>
        
        
    );
};

export default SpecialOffer;