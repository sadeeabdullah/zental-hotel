
const StunningVideo = () => {
    return (
        <div className=" mx-auto relative  mb-12">
            <video autoPlay loop muted playsInline className="" >
                <source src="src/assets/image/pexels-cottonbro-7507165 (Original).mp4" type="video/mp4"/>
            </video>
            <div className="absolute inset-0
            
             bg-black opacity-50 justify-center items-center flex">
                <div className="lg:text-4xl text-white  ">
                    {/* see it start here */}
                    <div className="flex w-[89vw] mx-auto  ">
                    <div className=" w-[90vw] lg:w-[50vw]">
            <div className="bg-white  rounded-lg shadow-md p-6 ">
                <h2 className="lg:text-2xl font-semibold mb-2">Summer Getaway</h2>
                <p className="text-gray-800 mb-4">Enjoy a relaxing summer escape with a 20% discount on room rates. Limited time offer!</p>
                <p className="text-[#08476b] lg:text-5xl mb-2 font-bold">From $99/night</p>
                <button href="#" className=" lg:text-2xl text-white bg-[#f16f6e] hover:bg-[#f16f6e] px-4 py-2 rounded-xl  relative">Book Now</button>
            </div>
            </div>
                    </div>
                    
                    {/* end here */}
                </div>
            </div>
        </div>
    );
};

export default StunningVideo;