import express  from "express";
import {z} from 'zod';
import User from '../db/schemas/UserSchema';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config";
import authMiddleware , { AuthenticationRequest } from "../middlewares/authMiddleware";
import Account from "../db/schemas/AccountSchema";



const signupBody = z.object({
    username : z.string().min(3).max(10),
    password: z.string().min(6),
    firstName: z.string().max(50),
    lastName: z.string().max(50),
})

const signinBody = z.object({
    username : z.string().min(3).max(10),
    password: z.string().min(6),
})

const updateBody = z.object({
    password: z.string().min(6),
    firstName: z.string().max(50),
    lastName: z.string().max(50),
})

const userRouter = express.Router();

userRouter.post("/signup" , async (req , res) =>
{
    const  userData = req.body;
    const {success} = signupBody.safeParse(userData);
    if(success)
    {
        const existingUser = await User.findOne({username : userData.username}) ;

        if(!existingUser)
        {
            try
            {
                const openingBalance = Math.floor(Math.random() * 1000) + 1;

                const user = await User.create({
                    username : userData.username,
                    password : userData.password,
                    firstName : userData.firstName,
                    lastName : userData.lastName 
                })

                
                const newAccount = await Account.create({userId : user._id , balance: openingBalance});

                user.account = newAccount._id;
                await user.save();

                const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
                    expiresIn: '1h',
                    });

                return res.status(200).send({
                    message: "User created successfully",
                    token: token,
                    user : {
                        username : user.username,
                        firstName: user.username,
                        lastName: user.lastName,
                        userId  : user._id
                    }
                });

            }catch
            {
                return res.status(500).send({message : "Error occured while creating user in database"});
            }
        }else
        {
            return res.status(411).send({message: "Email already taken / Incorrect inputs"});
        }
    }else
    {
       return res.status(411).send({message: "Email already taken / Incorrect inputs"});
    }

});

userRouter.post("/signin"  ,async (req , res) =>
{
    const  userData = req.body;
    const {success} = signinBody.safeParse(userData);

    if(!success)
    {
        return res.status(411).send( {
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({username : userData.username , password: userData.password});

    if(user)
    {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1h',
            });

        return res.status(200).send({
            message : "Login successful",
            token: token,
            user : {
                username : user.username,
                firstName : user.firstName,
                lastName: user.lastName,
                userId  : user._id
            }
        });
    }else
    {
        return res.status(411).send( {
            message: "Error while logging in"
        })
    }
});

userRouter.put('/' , authMiddleware , async (req : AuthenticationRequest, res) =>
{
    const userId = req.userId;
    const updateData = req.body;

    const {success}  = updateBody.safeParse(updateData);

    if(!userId || !success)
    {
        return res.status(411).send({
            message: "Error while updating information"
        });
    } 

    const updatedUser = await User.findByIdAndUpdate(userId , updateData , { new: true, runValidators: true });
    if(updatedUser)
    {
        return res.status(200).send({
            message: "Updated successfully"
        });
    }

    return res.status(411).send({
        message: "Error while updating information"
    });

})

userRouter.get("/me" , authMiddleware ,async(req : AuthenticationRequest, res) =>
{
    const userId = req.userId;

    const user = await User.findById(userId);
    

    if(user)
    {
        return res.status(200).send({
            user: {
                username : user.username,
                firstName : user.firstName,
                lastName : user.lastName,
                userId : user._id
            }
        } )
    }
    return res.status(400).send({message : "Error occured while fetching user details"});
})


userRouter.get("/bulk" ,authMiddleware ,async (req : AuthenticationRequest , res) =>
{
    
   let filter = req.query.filter;
   const loggedInUserId = req.userId;

   const users = await User.find({
    $and: [
      {
        $or: [
          { firstName: { $regex: filter, $options: 'i' } }, 
          { lastName: { $regex: filter, $options: 'i' } },
        ],
      },
      {
        _id: { $ne: loggedInUserId }, 
      },
    ],
  });
    
    if(users)
    {
        const userResponse  = users.map(user  =>
            {
                return {
                    username : user.username,
                    firstName : user.firstName,
                    lastName: user.lastName,
                    userId: user._id
                }
            })
        return res.status(200).send({users : userResponse});
    }
    
    return res.status(411).send({
        message: "Error while fetching information"
    });
})


export default userRouter;
