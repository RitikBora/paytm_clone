import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUser } from "../recoil/atom";

const NavBar = () => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [loggedInUser , setLoggedInUser]  = useRecoilState(loginUser);



    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };

    const logoutUser = () =>
    {
        localStorage.removeItem("token");
        setLoggedInUser({username : "" , userId : "" , loading: false});
        window.location.reload();
    }

    return (
        <div>
            {loggedInUser.loading === true ? 
            <></>
            :
                <nav className="bg-transparent fixed w-full z-10">
                <div className=" flex flex-wrap items-center justify-between mx-auto py-4">
                <div className="px-8">
                    <a href="/dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Paytm</span>
                    </a>
                    <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                    ></button>
                </div>
                <div className="hidden w-full md:block md:w-auto px-8 md:flex"  id="navbar-default">
                    {loggedInUser.username !== "" ? 
                        <>
                    <div className="">
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded={isDropdownOpen}
                            onClick={toggleDropdown}
                            data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                            className="w-8 h-8 rounded-full"
                            src="/docs/images/people/profile-picture-3.jpg"
                            alt="user photo"
                            />
                        </button>
                        {isDropdownOpen && (
                            <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={logoutUser}>Logout</a>
                                </li>
                            </ul>
                            </div>
                        )}
                    </div>
                        </>
                    :
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/signup" className="text-lg block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Signup</a>
                        </li> 
                        <li>
                            <a href="/signin" className="text-lg block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Login</a>
                        </li> 
                    </ul>
                    }
                </div>
                </div>
                </nav>
             }
        </div>
      );
      
  }
  
  export default NavBar;
  