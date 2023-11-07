import { useContext } from "react";
import Loading from "../../Components/Loading/Loading";
import { AuthContext } from "../../Provider/AuthProvider";
import RoomList from "./RoomList";
import { Link } from "react-router-dom";
import Error from "./Error";

const Rooms = () => {
  const { query } = useContext(AuthContext);
  const { data, isLoading, isError} = query;
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
    <div className="w-[89vw] mx-auto py-8">
      

      <div className=" flex flex-col lg:flex-row justify-center lg:justify-between">
        {/* room list */}
        <RoomList></RoomList>

        {/* div for the room card */}
        <div className="lg:grid flex flex-col justify-center  lg:grid-cols-2 gap-4 w-3/4">
          {allData.map(
            (singleData) =>
              singleData?.booking_status === "available" && (
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
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
