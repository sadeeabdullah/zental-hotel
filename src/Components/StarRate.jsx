import React from "react";
// import { FaStar } from "react-icons/fa"
import { FaStar } from "react-icons/fa";


 const StarRate = () =>{
    return( 

        <div>
            
        
        {[...Array(5)].map(star => <FaStar/>)}
    

        </div>

    )
    
}
export default StarRate;