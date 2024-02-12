import { useState  , ChangeEvent, useEffect} from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import SendPopup from "./popups/SendPopup";
import ErrorPopup from "./popups/ErrorPopup";
import SuccessPopup from "./popups/SucessPopup";

interface User {
    username : string,
    userId: string,

    firstName : string
    lastName : string
}

  
interface SearchSectionProps {
  setBalance : React.Dispatch<React.SetStateAction<any>>,
  balance: string|null
}

const SearchSection: React.FC<SearchSectionProps> = ({balance , setBalance}) =>
{

    const [searchInput , setSearchInput] = useState("");
    const [users , setUsers] = useState<User[]>([]);
    const [isSendPopupOpen, setIsSendPopupOpen] = useState(false);
    const [success , setSuccess] = useState(null);
    const [error , setError] = useState(null);
    const [reciever , setReciever] = useState<User>({
      username : "",
      firstName: "",
      lastName : "",
      userId : ""
    });

    const handleCloseSendPopup = () => {
      setIsSendPopupOpen(false);
    };

    const closeErrorPopup = () =>
    {
      setError(null);
    }

    const closeSuccessPopup = () =>
    {
      setSuccess(null);
    }

    useEffect(() =>
    {
        searchUsers();
    } , []);

    
    const handleInputChange = (e : ChangeEvent<HTMLInputElement>) =>
    {
        setSearchInput(e.target.value);
    }

    const setRecieverData = (user : User) =>
    {
      setReciever(user);
      setIsSendPopupOpen(true);
    }

    const searchUsers = async() =>
    {
        try
        {
            const token = localStorage.getItem("token");
            const headers = {
              authorization : token
            }
            const filter = searchInput === "" ? ".*" :  searchInput;
            const response = await axios.get(BACKEND_URL + "/user/bulk?filter=" + filter , {headers});
            if(response.status === 200)
            {
              setUsers(response.data.users);;
            }
        }catch(err : any)
        {
        }     
    }

    
    return(
    <>
        <div>
            <form>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Users..."
                    required
                    value={searchInput}
                    onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={searchUsers}
                        >
                        Search
                        </button>
                </div>
            </form>
        </div>
        <br />
        <div className="overflow-y-hidden rounded-lg border">
            <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                        <th className="px-5 py-3">username</th>
                    <th className="px-5 py-3">First Name</th>
                    <th className="px-5 py-3">Last Name</th>
                    <th className="px-40 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-500">
                    {
                        users.map((user) => {
                            return (
                              <tr key={user.userId}>
                                <td className="border-b border-gray-200 bg-white px-5 py-3 text-sm">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="whitespace-no-wrap">{user.username}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-3 text-sm">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="whitespace-no-wrap">{user.firstName}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-3 text-sm">
                                  <p className="whitespace-no-wrap">{user.lastName}</p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-40 py-3 text-sm text-right">
                                  <button className="rounded-md bg-green-200 px-3 py-1 text-m font-semibold text-green-900" onClick={() => setRecieverData(user)}>Send</button>
                                </td>
                              </tr>
                            );
                          })
                    }
                </tbody>
                </table>
            </div>
        </div>
        <SendPopup
          isOpen={isSendPopupOpen}
          onClose={handleCloseSendPopup}
          setSuccess = {setSuccess}
          setError={setError}
          balance={balance}
          setBalance={setBalance}
          reciever = {reciever}
    />
     {error  && <ErrorPopup errorMessage={error} onClose={closeErrorPopup} />}
     {success && <SuccessPopup successMessage={success} onClose={closeSuccessPopup} />}
    </>)
}

export default SearchSection;