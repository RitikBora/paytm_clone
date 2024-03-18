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
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const AccountSchema_1 = __importDefault(require("../db/schemas/AccountSchema"));
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const transferBody = zod_1.z.object({
    to: zod_1.z.string(),
    amount: zod_1.z.number()
});
const accountRouter = express_1.default.Router();
accountRouter.get("/balance", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const account = yield AccountSchema_1.default.findOne({ userId: userId });
    if (account) {
        return res.status(200).send({ balance: account.balance });
    }
    return res.status(500).send({ message: "Error occured while fetching balance" });
}));
accountRouter.post("/transfer", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const senderId = req.userId;
    const tranferDetails = req.body;
    const { success } = transferBody.safeParse(tranferDetails);
    if (success) {
        const { to, amount } = tranferDetails;
        const senderAccount = yield AccountSchema_1.default.findOne({ userId: senderId }).session(session);
        const receiverAccount = yield AccountSchema_1.default.findOne({ userId: to }).session(session);
        if (!receiverAccount) {
            yield session.abortTransaction();
            return res.status(400).send({
                message: "Invalid account"
            });
        }
        if (senderAccount && receiverAccount) {
            if (senderAccount.balance < amount) {
                yield session.abortTransaction();
                return res.status(400).send({
                    message: "Insufficient Balance"
                });
            }
            yield AccountSchema_1.default.updateOne({ userId: senderId }, { $inc: { balance: -amount } }).session(session);
            yield AccountSchema_1.default.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
            yield session.commitTransaction();
            return res.status(200).send({
                message: "Transfer successful"
            });
        }
    }
    return res.status(411).send({
        message: "Invalid sender details"
    });
}));
accountRouter.post("/add", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const userId = req.userId;
    const amount = req.body.amount;
    if (amount <= 0) {
        return res.status(400).send({ message: "invalid amount" });
    }
    yield AccountSchema_1.default.updateOne({ userId: userId }, { $inc: { balance: +amount } }).session(session);
    yield session.commitTransaction();
    return res.status(200).send({ message: "Money Added Sucessfully" });
}));
exports.default = accountRouter;
