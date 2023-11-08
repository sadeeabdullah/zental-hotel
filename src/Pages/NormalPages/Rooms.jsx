

// import RoomList from "./RoomList";
import { Link } from "react-router-dom";
import Error from "./Error";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import {  useState } from "react";

const Rooms = () => {
  // for filtering the rooms according the price range
  const [selectedValue, setSelectedValue] = useState('');


  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);

  }
  
  console.log(selectedValue)
  // for fetching the data of room 
    const axios = useAxios();
    const getRoomsData =async () => {
        const res = await axios.get(`rooms?selectedValue=${selectedValue}`)
        return res ;
    }
    const query = useQuery({
        queryKey: ['roomsData',selectedValue],
        queryFn: getRoomsData,
    })

const {data,isLoading,isError} = query

  if (isLoading) {
    return (
      <div
        className="flex
        justify-center items-center h-screen"
      >
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  if (isError) {
    return <Error></Error>;
  }
  const allData = data.data;
  console.log(allData)
  const filter100 = allData.filter(fil1=> fil1.price_per_night<200)
  // console.log(filter100)
  const filter200 = allData.filter(fil1=> fil1.price_per_night>200)
  // console.log(filter200)

  if(selectedValue == 'down'){
    console.log('100 er niche')
  }

  return (
    <div  className="w-[89vw] mx-auto py-8">
      <div className="flex justify-end mb-8">
      <select  className="text-center text-gray-500 bg-gradient-to-br from-[#85c2e5] via-gray-200 to-[#f16f6e] rounded-lg p-1"
      onChange={()=>handleSelectChange(event)}
      value={selectedValue} >
        <option value="All">All Rooms</option>
        <option value="down">Price(1-100)</option>
        <option value="upper">Price(100-400)</option>
      </select>
      </div>
      <div >
      
      

      <div className=" flex flex-col lg:flex-row justify-center lg:justify-between">
        {/* room list */}
        <div className="mb-10 lg:mb-0 bg-gradient-to-r  from-[#f16f6e] to-[#08476b] inline-block bg-clip-text text-transparent">
            <h2 className="text-2xl text-[#08476b] mb-4 font-semibold">
        Available Rooms:
      </h2>
            {
                   !selectedValue  && allData.map(singleData  =>
                        <div
                         key={singleData._id}>
                            <div >
                                <p className="text-xl font-semibold ">{singleData.room_title}</p>
                            </div>
                        </div>
                    )
                    
                }
            {
                   selectedValue === 'All' && allData.map(singleData  =>
                        <div
                         key={singleData._id}>
                            <div >
                                <p className="text-xl font-semibold ">{singleData.room_title}</p>
                            </div>
                        </div>
                    )
                    
                }

                {
                  selectedValue === 'down' && filter100.map(singleData  =>
                    <div
                     key={singleData._id}>
                        <div >
                            <p className="text-xl font-semibold ">{singleData.room_title}</p>
                        </div>
                    </div>)
                }
                {
                  selectedValue === 'upper' && filter200.map(singleData  =>
                    <div
                     key={singleData._id}>
                        <div >
                            <p className="text-xl font-semibold ">{singleData.room_title}</p>
                        </div>
                    </div>)
                }
        </div>

        {/* div for the room card */}
        <div className="lg:grid flex flex-col justify-center  lg:grid-cols-2 gap-4 lg:w-3/4">
          { !selectedValue && allData.map(
            (singleData) =>
                <div key={singleData._id}>


                  <Link to={`/rooms/${singleData._id}`}>

                  <div
                  className="relative group">
                   <img
                     className="rounded-xl lg:h-[40vh] md:h w-full"
                     src={singleData.image1}
                     alt=""
                   />
                   <div className="absolute inset-0 bg-gradient-to-br from-[#85c2e5] via-gray-200 to-[#f16f6e]  opacity-0 hover:opacity-50 transition duration-300 ease-in-out"></div>
                   <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#85c2e5] via-gray-200 to-[#f16f6e] opacity- flex items-center justify-center opacity-0 group-hover:opacity-50 transition duration-300 ease-in-out">
                     <p className="text-[#09161d] font-semibold text-xl">{singleData.room_title}</p>
                   </div>
                 </div>

                  </Link>
                </div>
              
          )}
          { selectedValue === 'All' && allData.map(
            (singleData) =>
                <div key={singleData._id}>


                  <Link to={`/rooms/${singleData._id}`}>

                  <div
                  className="relative group">
                   <img
                     className="rounded-xl lg:h-[40vh] md:h w-full"
                     src={singleData.image1}
                     alt=""
                   />
                   <div className="absolute inset-0 bg-gradient-to-br from-[#85c2e5] via-gray-200 to-[#f16f6e]  opacity-0 hover:opacity-50 transition duration-300 ease-in-out"></div>
                   <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#85c2e5] via-gray-200 to-[#f16f6e] opacity- flex items-center justify-center opacity-0 group-hover:opacity-50 transition duration-300 ease-in-out">
                     <p className="text-[#09161d] font-semibold text-xl">{singleData.room_title}</p>
                   </div>
                 </div>

                  </Link>
                </div>
              
          )}
          { selectedValue === 'down' && filter100.map(
            (singleData) =>
                <div key={singleData._id}>


                  <Link to={`/rooms/${singleData._id}`}>

                  <div
                  className="relative group">
                   <img
                     className="rounded-xl lg:h-[40vh] md:h w-full"
                     src={singleData.image1}
                     alt=""
                   />
                   <div className="absolute inset-0 bg-gradient-to-br from-[#85c2e5] via-gray-200 to-[#f16f6e]  opacity-0 hover:opacity-50 transition duration-300 ease-in-out"></div>
                   <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#85c2e5] via-gray-200 to-[#f16f6e] opacity- flex items-center justify-center opacity-0 group-hover:opacity-50 transition duration-300 ease-in-out">
                     <p className="text-[#09161d] font-semibold text-xl">{singleData.room_title}</p>
                   </div>
                 </div>

                  </Link>
                </div>
              
          )}
          { selectedValue === 'upper' && filter200.map(
            (singleData) =>
                <div key={singleData._id}>


                  <Link to={`/rooms/${singleData._id}`}>

                  <div
                  className="relative group">
                   <img
                     className="rounded-xl lg:h-[40vh] md:h w-full"
                     src={singleData.image1}
                     alt=""
                   />
                   <div className="absolute inset-0 bg-gradient-to-br from-[#85c2e5] via-gray-200 to-[#f16f6e]  opacity-0 hover:opacity-50 transition duration-300 ease-in-out"></div>
                   <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#85c2e5] via-gray-200 to-[#f16f6e] opacity- flex items-center justify-center opacity-0 group-hover:opacity-50 transition duration-300 ease-in-out">
                     <p className="text-[#09161d] font-semibold text-xl">{singleData.room_title}</p>
                   </div>
                 </div>

                  </Link>
                </div>
              
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Rooms;
