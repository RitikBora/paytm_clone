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
        try
        {
            const token = localStorage.getItem("token");
          
        const headers = {
            authorization : token
        }
        const response = await axios.get(BACKEND_URL + "/user/me" , {headers});
        if(response.status === 200)
        {
            const loggedInUser = {...response.data.user , loading : false};
            setLoggedInUser(loggedInUser);
        }else
        {
            setLoggedInUser({username : "",
            firstName : "" ,
            lastName : "",
            userId : "",
            loading : false})
        }
        }catch(err : any)
        {
            setLoggedInUser({username : "",
            firstName : "" ,
            lastName : "",
            userId : "",
            loading : false})
        }
    }

    useEffect(() =>
    {
        init();
    } , [])

    return <></>
}



export default InitUser;