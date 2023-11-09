/* eslint-disable react/jsx-key */
import { useState } from "react";
// import { FaStar } from "react-icons/fa"
import { FaStar } from "react-icons/fa";

 const StarRate = () =>{
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    
    return( 

        <div className="flex">
            
        {[...Array(5)].map( (star) =>{
            return(
                <label >
                    <input type="radio" className="hidden" name="rating" value = {} id="" />
                    <FaStar  
                    color={rating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    
                    
                    size={50}></FaStar>
                </label>
               
            ) 
        })}
        </div>

    )
    
}
export default StarRate;