import newsletterImage from '../../assets/image/83316929_2308-w030-n003-822B-p15-822-removebg-preview.png'
const Newsletter = () => {
    return (
        <div className="flex flex-col mt-32 mb-20 lg:flex-row w-[89vw] mx-auto bg-gray-50 rounded-lg  shadow-xl p-4 lg:p-8  bg-gradient-to-br from-[#85c2e5] via-gray-200 to-[#f16f6e] lg:justify-center">
            {/* div for image in the left side */}
            <div className="lg:w-1/3 ">
                <img className="w-full" src={newsletterImage} alt="" />
            </div>

            {/* div for the right input field to get updated from the email */}
            <div className=" flex flex-col  justify-center gap-10">
            <div className="bg-gradient-to-br from-[#f16f6e] via-gray-400 to-[#08476b]  text-transparent bg-clip-text ">
            <h3 className=" font-bold text-4xl">Stay In The Know</h3>
            <p className=" font-bold text-2xl">Subscribe for exclusive offers and updates.</p>
            </div>
            
            <div>
            <input type="text" name="email" id="" className="rounded-l-full pl-2 px-2 lg:pl-4 lg:px-4  py-2" placeholder="type your email here" />
            <button className=" bg-[#f16f6e] text-white font-semibold rounded-r-full px-2 pr-2 lg:px-4  lg:pr-4 py-2">Subscribe</button>
            </div>
            </div>
            
            </div>
        
    );
};

export default Newsletter;