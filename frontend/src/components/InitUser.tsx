import { useSetRecoilState } from "recoil";
import { loginUser } from "../recoil/atom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect } from "react";
const InitUser = () =>
{
    const setLoggedInUser = useSetRecoilState(loginUser);

    const init = async() =>
    {
        const token = localStorage.getItem("token");
          
            if(token)
            {
                const headers = {
                    authorization : token
                }
                const response = await axios.get(BACKEND_URL + "/user/me" , {headers});
                if(response.status === 200)
                {
                    const loggedInUser = {...response.data.user , loading : false};
                    setLoggedInUser(loggedInUser);
                }
            }
        }

    useEffect(() =>
    {
        init();
    } , [])

    return <></>
}



export default InitUser;