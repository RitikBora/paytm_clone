import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import SearchSection from "./SearchSection";
import { loginUser } from "../recoil/atom";
import { useRecoilValue } from "recoil";

const Dashboard = () =>
{
    // const navigate = useNavigate();
    const user = useRecoilValue(loginUser);

    useEffect(() =>
    {
        
        init();
    } , []) 

    const init = async() =>
    {
    //    console.log(user);
    }
    return(
        <div className="relative top-16 bg-white p-8 rounded-md">
            <div>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">Hello {user.username}!</h2>
                    {/* <p className="text-lg text-blue-700">Your current balance is: {user.accountBalance}</p> */}
                </div>
            </div>
            <div className="py-8">
                <SearchSection/>
            </div>
        </div>


    )
}

export default Dashboard;

