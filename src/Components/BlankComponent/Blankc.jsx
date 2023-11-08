import { useEffect } from 'react';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
// import useAuth from '../Hooks/useAuth';

const Blankc = () => {
    // const {parseDate} = useAuth()
    const axios = useAxios();
    const getRoomsData =async () => {
        const res =  axios.get('bookings')
        return res ;
    }
    const query = useQuery({
        queryKey: ['roomsData'],
        queryFn: getRoomsData,
    })
    const {data} = query
    const allData = data?.data
    // console.log(allData)
    useEffect(()=>{
        allData?.map(singleOne=>{
            console.log(singleOne.booking_duration)
        })

    },[])
    // if the booking date over then a  patch request will be send to the database and set the booking status available

  // to pick present date
//   const presentDate = new Date();
  
//   if(selectedDate){
//     const selectedDateStr = selectedDate;
//   const selected = parseDate(selectedDateStr)
//   console.log(selected)
//   }
  
    return (
        <div>
            
        </div>
    );
};

export default Blankc;