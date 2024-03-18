import { useState , ChangeEvent } from "react"
import axios from 'axios';
import { BACKEND_URL } from '../../../config';

interface User {
    username : string,
    firstName : string,
    lastName : string,
    userId : string,
    loading : boolean
  }

interface AddMoneyPopupProps {
    isOpen : Boolean,
    onClose : () => void,
    setSuccess: React.Dispatch<React.SetStateAction<any>>;
    setError: React.Dispatch<React.SetStateAction<any>>;
    user ?: User
}
const AddMoneyPopup : React.FC<AddMoneyPopupProps> =  ({isOpen , onClose , setSuccess , setError}) =>
{

    const [addAmount, setAddAmount] = useState("10");

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddAmount(e.target.value);
    };


    const addMoney = async () =>
    {
        const token = localStorage.getItem('token');
        if (token) {
          const headers = {
            authorization: token,
          };
          try {
            const response = await axios.post(
              BACKEND_URL + "/account/add",
              {
                amount: parseInt(addAmount),
              },
              { headers }
            );
    
            if (response.status === 200) {

              setSuccess(response.data.message);
              onClose();
            }
          } catch (err: any) {
            setError(err.response.data.message);
          }
        }
    }

    if (!isOpen) return null;

    return (<>
        <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="font-manrope flex h-screen w-full items-center justify-center">
      <div className="mx-auto box-border w-[365px] border bg-white p-4 border-grey-500 border-2" >
        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Adding Money</span>
          <div className="cursor-pointer border rounded-[4px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#64748B]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              onClick={() => {
                    // setSendAmount("");
                    onClose();
                }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <div className="mt-6">
          <div className="font-semibold">How much would you like to add?</div>
          <div>
            <input
              className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
              value={addAmount}
              type="number"
              placeholder="$10.00"
              onChange={handleAmountChange}
            
            />
          </div>
          <div className="flex justify-between">
            <div className="mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] hover:border-green-700 p-3 text-[#191D23]" onClick={() => {setAddAmount("10")}}>
              $10.00
            </div>
            <div className="mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] hover:border-green-700 p-3 text-[#191D23]" onClick={() => {setAddAmount("50")}}>
              $50.00
            </div>
            <div className="mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] hover:border-green-700 p-3 text-[#191D23]" onClick={() => {setAddAmount("100") }}>
              $100.00
            </div>
            <div className="mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] hover:border-green-700 p-3 text-[#191D23]" onClick={() => { setAddAmount("200")}}>
              $200.00
            </div>
          </div>
        </div>


        <div className="mt-6">
          <div className="w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white" onClick={addMoney} >
            Add ${addAmount}
          </div>
        </div>
      </div>
    </div>
    </div>
    </>)
}

export default AddMoneyPopup;