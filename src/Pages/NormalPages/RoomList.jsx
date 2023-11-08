
import Loading from "../../Components/Loading/Loading";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";


const RoomList = () => {
    const axios = useAxios();
    const getRoomsData =async () => {
        const res =  axios.get('rooms')
        return res ;
    }
    const query = useQuery({
        queryKey: ['roomsData'],
        queryFn: getRoomsData,
    })
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
        <div className="mb-10 lg:mb-0 bg-gradient-to-r  from-[#f16f6e] to-[#08476b] inline-block bg-clip-text text-transparent">
            <h2 className="text-2xl text-[#08476b] mb-4 font-semibold">
        Available Rooms:
      </h2>
            {
                    allData.map(singleData  =>
                        <div
                         key={singleData._id}>
                            <div >
                                <p className="text-xl font-semibold ">{singleData.room_title}</p>
                            </div>
                        </div>
                    )
                    
                }
        </div>
    );
};
