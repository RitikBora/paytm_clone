import axios from 'axios';
import React, { useState  , ChangeEvent} from 'react';
import { BACKEND_URL } from '../../config';

interface User {
    username : string,
    userId: string,

    firstName : string
    lastName : string
}

interface SendPopupProps {
  isOpen: boolean;
  onClose: () => void;
  setSuccess: React.Dispatch<React.SetStateAction<any>>;
  setError: React.Dispatch<React.SetStateAction<any>>;
  reciever : User
}

const SendPopup: React.FC<SendPopupProps> = ({ isOpen, onClose ,setSuccess , setError  ,reciever }) => {
  const [sendAmount, setSendAmount] = useState("");

  const handleAmountChange = (e : ChangeEvent<HTMLInputElement>) =>
  {
    setSendAmount(e.target.value);
  }

  const sendMoney = async () =>
  {
    const token = localStorage.getItem('token');
    if(token)
    {
        const headers = {
            authorization : token
        }
        try
        {
            const response = await axios.post(BACKEND_URL + "/account/transfer" , {
                to : reciever.userId,
                amount : parseInt(sendAmount)
            } , {headers} );
    
            if(response.status === 200)
            {
                setSuccess(response.data.message);
                onClose();
            }
        }catch(err : any)
        {
            setError(err.response.data.message);
        }
    }
     
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
        <div className="bg-white p-6 rounded-lg z-10">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Send Money to {reciever.username}
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <input type="number" name="amount" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Enter Amount"  value={sendAmount} onChange={handleAmountChange} required />
                    </div>
                    <div className='flex items-center justify-center space-x-10'>
                    <input
                        type="button"
                        value="Send"
                        className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-primary-800"
                        onClick={sendMoney}
                        />
                    <input
                    type="button"
                    value="Close"
                    className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-primary-800"
                    onClick={() => {
                        setSendAmount("");
                        onClose();
                    }}
                    />
                    </div>
                </form>
            </div>
        </div>
  </div>
  );
};

export default SendPopup;
