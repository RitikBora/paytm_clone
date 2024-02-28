import axios from 'axios';
import React, { useState, ChangeEvent } from 'react';
import { BACKEND_URL } from '../../config';

interface User {
  username: string;
  userId: string;
  firstName: string;
  lastName: string;
}

interface SendPopupProps {
  isOpen: boolean;
  onClose: () => void;
  setSuccess: React.Dispatch<React.SetStateAction<any>>;
  setError: React.Dispatch<React.SetStateAction<any>>;
  balance: string | null;
  setBalance: React.Dispatch<React.SetStateAction<any>>;
  reciever: User;
}

const SendPopup: React.FC<SendPopupProps> = ({
  isOpen,
  onClose,
  setSuccess,
  setError,
  balance,
  setBalance,
  reciever,
}) => {
  const [sendAmount, setSendAmount] = useState("10");

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSendAmount(e.target.value);
  };

  const sendMoney = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = {
        authorization: token,
      };
      try {
        const response = await axios.post(
          BACKEND_URL + "/account/transfer",
          {
            to: reciever.userId,
            amount: parseInt(sendAmount),
          },
          { headers }
        );

        if (response.status === 200) {
          if (balance !== null) {
            const newBalance = parseInt(balance) - parseInt(sendAmount);
            setBalance(newBalance);
          }
          setSuccess(response.data.message);
          onClose();
        }
      } catch (err: any) {
        setError(err.response.data.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="font-manrope flex h-screen w-full items-center justify-center">
      <div className="mx-auto box-border w-[365px] border bg-white p-4 border-grey-500 border-2" >
        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Sending Money</span>
          <div className="cursor-pointer border rounded-[4px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#64748B]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              onClick={() => {
                    setSendAmount("");
                    onClose();
                }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <div className="mt-6">
          <div className="font-semibold">How much would you like to send?</div>
          <div>
            <input
              className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
              value={sendAmount}
              type="number"
              placeholder="$10.00"
              onChange={handleAmountChange}
            />
          </div>
          <div className="flex justify-between">
            <div className="mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] hover:border-green-700 p-3 text-[#191D23]" onClick={() => { setSendAmount("10")}}>
              $10.00
            </div>
            <div className="mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] hover:border-green-700 p-3 text-[#191D23]" onClick={() => { setSendAmount("50")}}>
              $50.00
            </div>
            <div className="mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] hover:border-green-700 p-3 text-[#191D23]" onClick={() => { setSendAmount("100")}}>
              $100.00
            </div>
            <div className="mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] hover:border-green-700 p-3 text-[#191D23]" onClick={() => { setSendAmount("200")}}>
              $200.00
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between">
            <span className="font-semibold text-[#191D23]">Receiving</span>
          </div>

          <div className="flex items-center gap-x-[10px] bg-neutral-100 p-3 mt-2 rounded-[4px]">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
            <div>
              <div className="font-semibold">{reciever.firstName} {reciever.lastName}</div>
              <div className="text-[#64748B]">@{reciever.username}</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white"  onClick={sendMoney}>
            Send ${sendAmount}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SendPopup;
