import { Schema  , model} from "mongoose";

const AccountSchema =  new Schema({
    userId : {type : Schema.Types.ObjectId , ref : "User" , required : true},
    balance : {
        type : Number,
        required: true,
    }
})


const Account =model('Account', AccountSchema);

export default Account;