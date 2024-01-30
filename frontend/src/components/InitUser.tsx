import { useSetRecoilState } from "recoil";
import { loginUser } from "../recoil/atom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect } from "react";
const InitUser = () =>
{
    const setUser = useSetRecoilState(loginUser);

    const init = async() =>
    {
        const token = localStorage.getItem("token");
          
            if(token)
            {
                const headers = {
                    authorization : token
                }
                const response = await axios.post(BACKEND_URL + "/users/me" , {headers});
                if(response.status === 200)
                {
                    setUser(response.data);
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