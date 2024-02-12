import axios from "axios";
import {ChangeEvent , useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "./popups/ErrorPopup";
import { useSetRecoilState } from "recoil";
import { loginUser } from "../recoil/atom";

const Signin = () =>
{
    const navigate = useNavigate();
    const setLoggedInUser = useSetRecoilState(loginUser);

    const [formData , setFormData] = useState({
        username : "",
        password : "",
    });
    const [error , setError] = useState(null);

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) =>
    {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    }

      const signinUser = async() =>
      {
        const headers = {
            'Content-Type': 'application/json',
          };

        try
        {
            const response = await axios.post(BACKEND_URL + "/user/signin" , formData , {headers});
            if(response.status === 200)
            {
                localStorage.setItem("token", response.data.token);
                const loggedInUser = {...response.data.user , loading : false};
                console.log(loggedInUser);
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
                        Sign In
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
                        <input
                            type="button"
                            value="Log In"
                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-primary-800"
                            onClick={signinUser}
                            />
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Dont have an account? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</a>
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

export default Signin;

