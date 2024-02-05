import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchSection from "./SearchSection";
import { loginUser } from "../recoil/atom";
import { useRecoilValue } from "recoil";
import { BACKEND_URL } from "../config";
import axios from "axios";

const Dashboard = () =>
{
    const navigate = useNavigate();
    const user = useRecoilValue(loginUser);
    const [balance , setBalance] = useState(null);

    useEffect(() =>
    {
        if(user.username === "")
        {
            navigate("/");
        }
        init();
    } , []) 

    const init = async() =>
    {
        const token =  localStorage.getItem("token");
        const headers = {
            authorization : token
        }
        const response = await axios.get(BACKEND_URL + "/account/balance" , {headers});

        if(response.status === 200)
        {
            setBalance(response.data.balance);
        }
    }
    return(
        <div className="relative top-16 bg-white p-8 rounded-md">
            <div>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">Hello {user.username}!</h2>
                    <p className="text-lg text-blue-700">Your current balance is: {balance}</p>
                </div>
            </div>
            <div className="py-8">
                <SearchSection/>
            </div>
        </div>


    )
}

export default Dashboard;

