import { atom,  } from "recoil";


export const loginUser =  atom({
    key: "loginUserAtom",
    default: { username : "",
                firstName : "" ,
                lastName : "",
                userId : "",
                loading : true
            }
})

export const addMoneyPopupAtom = atom({
    key : "addMoneyPopupKey",
    default: false
})