import express, { json } from "express";
import connectToDatabase from "./db/db";
import { config } from "dotenv";
import router from "./routes";
import cors from 'cors'



config();
connectToDatabase();

const port = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use(json());


app.use("/api/v1" , router);


app.listen(port, () =>
{
    console.log('Listning to port ' + port);
})

 



