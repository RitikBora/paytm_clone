"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AccountSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    balance: {
        type: Number,
        required: true,
    }
});
const Account = (0, mongoose_1.model)('Account', AccountSchema);
exports.default = Account;
