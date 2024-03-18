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
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
let dbConnected = false;
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!dbConnected) {
        (0, dotenv_1.config)();
        const username = process.env.MONGO_USERNAME;
        const password = process.env.MONGO_PASSWORD;
        const dbUrl = `mongodb+srv://${username}:${password}@projects.icbkpjd.mongodb.net/paytm`;
        // const dbUrl = 'mongodb://127.0.0.1:27017/courseapp'; // for local testing
        try {
            yield mongoose_1.default.connect(dbUrl, {});
            console.log('Connected to MongoDB');
            dbConnected = true;
        }
        catch (error) {
            console.error('MongoDB connection error:', error);
        }
    }
});
exports.connectToDatabase = connectToDatabase;
exports.default = exports.connectToDatabase;
