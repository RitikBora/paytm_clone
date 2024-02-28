import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchSection from "./SearchSection";
import { loginUser , addMoneyPopupAtom} from "../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { BACKEND_URL } from "../config";
import axios from "axios";
import AddMoneyPopup from "./popups/AddMoneyPopup";
import ErrorPopup from "./popups/ErrorPopup";
import SuccessPopup from "./popups/SucessPopup";

const Dashboard = () =>
{
    const navigate = useNavigate();
    const user = useRecoilValue(loginUser);
    const [balance , setBalance] = useState(null);
    const [moneyPopupOpened , setMoneyPopupOpened] = useRecoilState(addMoneyPopupAtom);
    const [success , setSuccess] = useState(null);
    const [error , setError] = useState(null);

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
        
        init();
    } , []) 

    const init = async() =>
    {
        const token =  localStorage.getItem("token");
        if(!token)
        {
            navigate("/");
        }
        const headers = {
            authorization : token
        }
        const response = await axios.get(BACKEND_URL + "/account/balance" , {headers});
        
        if(response.status === 200)
        {
            setBalance(response.data.balance);
        }
    }

    const closeAddMoneyPopup = () =>
    {
        setMoneyPopupOpened(false);
    } 

    return(
        <div className="relative top-16 bg-white p-8 rounded-md">
            <div>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">Hello {user.username}!</h2>
                    <p className="text-lg text-blue-700">Your current balance is: {balance}</p>
                </div>
            </div>
            {moneyPopupOpened && <AddMoneyPopup isOpen={moneyPopupOpened} onClose={closeAddMoneyPopup} setSuccess={setSuccess} setError={setError} />}
            <div className="py-8">
                <SearchSection balance={balance} setBalance= {setBalance}/>
            </div>
            {error  && <ErrorPopup errorMessage={error} onClose={closeErrorPopup} />}
            {success && <SuccessPopup successMessage={success} onClose={closeSuccessPopup} />}
        </div>


    )
}

export default Dashboard;

