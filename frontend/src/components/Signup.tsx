import axios from "axios";
import {ChangeEvent , useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "./popups/ErrorPopup";
import { loginUser } from "../recoil/atom";
import { useSetRecoilState } from "recoil";


const Signup = () =>
{
    const navigate = useNavigate();
    const setLoggedInUser = useSetRecoilState(loginUser);

    const [formData , setFormData] = useState({
        username : "",
        password : "",
        firstName : "",
        lastName : ""
    });
    const [error , setError] = useState(null);

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) =>
    {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    }

      const signupUser = async() =>
      {
        const headers = {
            'Content-Type': 'application/json',
          };

        try
        {
            const response = await axios.post(BACKEND_URL + "/user/signup" , formData , {headers});
            if(response.status === 200)
            {
                localStorage.setItem("token", response.data.token);
                const loggedInUser = {...response.data.user , loading : false};
                setLoggedInUser(loggedInUser);
                navigate("/dashboard");
            } 
        }catch(err : any)
        {
            setError(err.response.data.message);
        }
      }

      const closeErrorPopup = () => {
        setError(null);
      };
    

    return(
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Enter your username"  value={formData.username} onChange={handleFormChange} required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            value={formData.password} onChange={handleFormChange} required />
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input type="firstName" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Your given name" value={formData.firstName} onChange={handleFormChange} required />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input type="lastName" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Your family name" value={formData.lastName} onChange={handleFormChange} required />
                        </div>
                        <input
                            type="button"
                            value="Create an account"
                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-primary-800"
                            onClick={signupUser}
                            />
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <a href="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                        </p>
                        </form>
                    </div>
                    </div>
                </div>
            </section>

            {error && <ErrorPopup errorMessage={error} onClose={closeErrorPopup} />}
   
        </>
    )
}

export default Signup;

