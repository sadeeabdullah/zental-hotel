import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import toast from 'react-hot-toast';

const AddReview = () => {
    const params = useParams();
    const { user }  = useContext(AuthContext);
    const Navigate = useNavigate();

    // load the bookings
    const [allData, setAllData]= useState()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true)
        fetch(`http://localhost:5000/api/v1/bookings?email=${user?.email}`,{credentials:"include"})
        .then(res =>res.json())
        .then(data => {
          setAllData(data)
          setLoading(false)
        })
        
      },[])

console.log(allData)
const findOne = allData?.find(f=> f._id === params.id);
console.log(findOne)

    //   console.log(allData)




    const handleReview = event =>{
        event.preventDefault();
      
        const form = event.target;
        const userName = form.userName.value;
        const dateOfBooking = form.reserve.value;
        const comment = form.comment.value;
        const rating = form.rating.value;
        const reviews = {
            review_owner : userName,
            dateOfBooking : dateOfBooking,
            comment: comment,
            rating: rating,
            reviewer_data: user
        }

        


        axios.patch("http://localhost:5000/api/v1/review-post",{
        reviews : reviews,
        id: findOne.image1,
      })
      .then(res => {
        if(res.data.modifiedCount>0){
          toast.success('Review Added Successfully')
          Navigate('/')
        }
      })
      
      .then(err =>console.log(err))
      }


      if(loading){
        return <Loading></Loading>
      }
    return (
        <div className='w-[89vw] lg:w-[70vw] mx-auto py-20'>
            <form onSubmit={handleReview}>
     {/* for user name and time stamp */}
     <div>
      <label className="block mb-2 text-sm font-medium text-[#074468] dark:text-white" htmlFor="User Name">User Name</label>
      <input defaultValue={user?.displayName}
      className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
       type="text"  name="userName" required  placeholder="User Name" id="" />
      
          
          <label  className="block mb-2 text-sm font-medium text-[#074468] dark:text-white" htmlFor="Reservation Time">Reservation Time</label>
            <input defaultValue={findOne?.booking_duration}
            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             type="text" name="reserve" required  placeholder="Reservation Time" id="" />
          
    </div>

          {/* for rating and comment */}

          <div className="mb-8 ">
      <label className="block mb-2 text-sm font-medium text-[#074468] dark:text-white" htmlFor="User Name">Rate the room and service</label>
      {/* for rating */}
      <input 
            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             type="text" name="rating" required  placeholder="Rate into 5" id="" />
      
     
      
          
          <label  className="block mb-2 text-sm font-medium text-[#074468] dark:text-white" htmlFor="Comment">Comment</label>
            <input required
            className="bg-gray-50 mb-4 border  h-[100px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             type="text"  name="comment"  placeholder="Write you comment here" id="" />
          
    </div>




    {/* for buttons */}
  <div className="flex justify-center gap-10">
      
        {/* if there is a button in form, it will close the modal */}
        <input
        className="btn  bg-[#eb5b5b] text-white border-0 hover:bg-[#ca3232]" type="submit" value="Post Review" />
        <button className="btn">Cancel</button>
      
    </div>
   </form>
        </div>
    );
};

export default AddReview;