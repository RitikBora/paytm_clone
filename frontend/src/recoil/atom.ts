import { atom,  } from "recoil";


export const loginUser =  atom({
    key: "loginUserAtom",
    default: { username : "",
                userId : "",
            }
})