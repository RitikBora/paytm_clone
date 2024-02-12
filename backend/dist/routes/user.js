"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const UserSchema_1 = __importDefault(require("../db/schemas/UserSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const AccountSchema_1 = __importDefault(require("../db/schemas/AccountSchema"));
const signupBody = zod_1.z.object({
    username: zod_1.z.string().min(3).max(10),
    password: zod_1.z.string().min(6),
    firstName: zod_1.z.string().max(50),
    lastName: zod_1.z.string().max(50),
});
const signinBody = zod_1.z.object({
    username: zod_1.z.string().min(3).max(10),
    password: zod_1.z.string().min(6),
});
const updateBody = zod_1.z.object({
    password: zod_1.z.string().min(6),
    firstName: zod_1.z.string().max(50),
    lastName: zod_1.z.string().max(50),
});
const userRouter = express_1.default.Router();
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const { success } = signupBody.safeParse(userData);
    if (success) {
        const existingUser = yield UserSchema_1.default.findOne({ username: userData.username });
        if (!existingUser) {
            try {
                const openingBalance = Math.floor(Math.random() * 1000) + 1;
                const user = yield UserSchema_1.default.create({
                    username: userData.username,
                    password: userData.password,
                    firstName: userData.firstName,
                    lastName: userData.lastName
                });
                const newAccount = yield AccountSchema_1.default.create({ userId: user._id, balance: openingBalance });
                user.account = newAccount._id;
                yield user.save();
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.JWT_SECRET, {
                    expiresIn: '1h',
                });
                return res.status(200).send({
                    message: "User created successfully",
                    token: token,
                    user: {
                        username: user.username,
                        firstName: user.username,
                        lastName: user.lastName,
                        userId: user._id
                    }
                });
            }
            catch (_a) {
                return res.status(500).send({ message: "Error occured while creating user in database" });
            }
        }
        else {
            return res.status(411).send({ message: "Email already taken / Incorrect inputs" });
        }
    }
    else {
        return res.status(411).send({ message: "Email already taken / Incorrect inputs" });
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const { success } = signinBody.safeParse(userData);
    if (!success) {
        return res.status(411).send({
            message: "Incorrect inputs"
        });
    }
    const user = yield UserSchema_1.default.findOne({ username: userData.username, password: userData.password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.JWT_SECRET, {
            expiresIn: '1h',
        });
        return res.status(200).send({
            message: "Login successful",
            token: token,
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user._id
            }
        });
    }
    else {
        return res.status(411).send({
            message: "Error while logging in"
        });
    }
}));
userRouter.put('/', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const updateData = req.body;
    const { success } = updateBody.safeParse(updateData);
    if (!userId || !success) {
        return res.status(411).send({
            message: "Error while updating information"
        });
    }
    const updatedUser = yield UserSchema_1.default.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
    if (updatedUser) {
        return res.status(200).send({
            message: "Updated successfully"
        });
    }
    return res.status(411).send({
        message: "Error while updating information"
    });
}));
userRouter.get("/me", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const user = yield UserSchema_1.default.findById(userId);
    if (user) {
        return res.status(200).send({
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user._id
            }
        });
    }
    return res.status(400).send({ message: "Error occured while fetching user details" });
}));
userRouter.get("/bulk", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = req.query.filter;
    const loggedInUserId = req.userId;
    const users = yield UserSchema_1.default.find({
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
    if (users) {
        const userResponse = users.map(user => {
            return {
                username: user.username,
                firstName: user.firstName,
                lastNamec: user.lastName,
                userId: user._id
            };
        });
        return res.status(200).send({ users: userResponse });
    }
    return res.status(411).send({
        message: "Error while fetching information"
    });
}));
exports.default = userRouter;
