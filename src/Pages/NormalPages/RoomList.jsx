import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../Components/Loading/Loading";


const RoomList = () => {
    const {query} = useContext(AuthContext);
    const {data, isLoading , isError,error} = query;

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
    return (
        <div className="mb-10 lg:mb-0">
            {
                    allData.map(singleData  => singleData?.booking_status === "available" && (
                        <div
                         key={singleData._id}>
                            <div >
                                <p className="text-xl font-semibold text-gray-500">{singleData.room_title}</p>
                            </div>
                        </div>
                    )
                    )
                }
        </div>
    );
};

export default RoomList;