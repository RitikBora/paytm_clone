"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const account_1 = __importDefault(require("./account"));
const router = express_1.default.Router();
router.use('/user', user_1.default);
router.use('/account', account_1.default);
router.get("/health", (req, res) => {
    res.status(200).json({ "ok": true, "message": "Healthy" });
});
exports.default = router;
