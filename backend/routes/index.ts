import express from "express";
import userRouter from "./user";
import accountRouter from "./account";


const router = express.Router();

router.use('/user' , userRouter)

router.use('/account' , accountRouter);

router.get("/health" , (req , res) =>
{
    res.status(200).json({"ok":true,"message":"Healthy"})
})

export default router;