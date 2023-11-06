import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import useAxios from "../../Hooks/useAxios";

const Rooms = () => {
    
    const axios = useAxios();
    const getRoomsData =async () => {
        // const res = axios.get('http://localhost:5000/api/v1/rooms')
        const res =  axios.get('rooms')
        return res ;
    }
    const {data, isLoading , isError,error} = useQuery({
        queryKey: ['roomsData'],
        queryFn: getRoomsData,
    })
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
      console.log(allData)
    return (
        <div>

            {
                allData.map(singleData  => ()
                )
            }

            
        </div>
    );
};

export default Rooms;