import express from "express";
import authMiddleware, { AuthenticationRequest } from "../middlewares/authMiddleware";
import Account from "../db/schemas/AccountSchema";
import {z} from 'zod';
import mongoose from "mongoose";


const transferBody = z.object({
    to : z.string(),
    amount: z.number()
})

const accountRouter = express.Router();

accountRouter.get("/balance" , authMiddleware ,async(req : AuthenticationRequest , res) =>
{
    const userId = req.userId;

   
    const account = await Account.findOne({userId : userId});
    
    if(account)
    {
        return res.status(200).send({balance : account.balance});
    }
    return res.status(500).send({message : "Error occured while fetching balance"});
})

accountRouter.post("/transfer" , authMiddleware , async(req : AuthenticationRequest , res) =>
{

    const session = await mongoose.startSession();

    session.startTransaction();

    const senderId = req.userId;
    const tranferDetails = req.body;

    const {success} = transferBody.safeParse(tranferDetails);

    if(success)
    {
    
        const {to , amount} = tranferDetails;

        const senderAccount = await Account.findOne({userId : senderId}).session(session);
        const receiverAccount = await Account.findOne({userId: to}).session(session);

        if(!receiverAccount)
        {
            await session.abortTransaction();
            return res.status(400).send({
                message: "Invalid account"
            });
        }

        if(senderAccount && receiverAccount)
        {
        
            if(senderAccount.balance < amount)
            {
                await session.abortTransaction();
                return res.status(400).send({
                    message: "Insufficient Balance"
                });
            }

            await Account.updateOne({ userId: senderId }, { $inc: { balance: -amount } }).session(session);
            await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

            await session.commitTransaction();

            return res.status(200).send({
                message: "Transfer successful"
            });

        }


    }
    return res.status(411).send({
        message: "Invalid sender details"
    });

})

accountRouter.post("/add" , authMiddleware , async(req : AuthenticationRequest, res) =>
{
    const session = await mongoose.startSession();

    session.startTransaction();
    
    const userId = req.userId;
    const amount = req.body.amount;

    if(amount <= 0)
    {
        return res.status(400).send({message : "invalid amount"});
    }

    await Account.updateOne({userId : userId} , {$inc: {balance : +amount}}).session(session);
    await session.commitTransaction();

    return res.status(200).send({message: "Money Added Sucessfully"});
})

export default accountRouter;