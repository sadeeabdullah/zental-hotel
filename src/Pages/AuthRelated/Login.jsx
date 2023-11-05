import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
const Login = () => {

    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

    const handleLogin = async ( e ) =>{
        
        e.preventDefault();
    const toastId = toast.loading('Logging in ...');

    try {
      const user  = await login(email, password);
      console.log(user.user.email)
    //   axios.post('/auth/access-token', {email : user.user.email} )
      toast.success('Logged in', { id: toastId });
      navigate('/');
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
    }



    // handle google login

    const handleGoogleLogin = async () => {
        const toastId = toast.loading('Logging in ...');
    
        try {
          await googleLogin();
          toast.success('Logged in', { id: toastId });
          navigate('/');
        } catch (error) {
        //   toast.error(error.message, { id: toastId });
        console.log(error)
        }
      };

    return (
        <div className="flex justify-center items-center">
  <div className=" p-6 space-y-4 md:space-y-6 sm:p-8 lg:w-1/3 bg-gradient-to-tr from-[rgb(240,146,146)] to-[rgb(238,123,123)] rounded-md">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#074468] md:text-2xl dark:text-white">
                  Log in
              </h1>
              <form
              onSubmit={handleLogin}
               className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label form="email" className="block mb-2 text-sm font-medium text-[#074468] dark:text-white">Your email</label>
                      <input
                      onChange={(e)=>setEmail(e.target.value)}
                       type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label form="password" className="block mb-2 text-sm font-medium text-[#074468] dark:text-white">Password</label>

                      <input
                      onChange={(e) => setPassword(e.target.value)}
                       type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-[#074468] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  
                 
                  <button type="submit" className="w-full bg-gradient-to-tr from-[#3484b3] to-[#074468] text-white bg-primary-600 hover:bg-[#0f2836] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Log in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      don&apos;t have an account? <Link to='/register' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</Link>
                  </p>
              </form>
              {/* log in with google */}

              <button
              onClick={handleGoogleLogin}
               className="btn w-full border-1 border-sky-600 px-4 py-2 normal-case text-md "><FcGoogle className="text-2xl"/> Sign In Google</button>
          </div>

        </div>
    );
};

export default Login;