//basic installation
import express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js"; 

/*configursation*/
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"})); //allow to access cross origin plateform
app.use(morgan("common"));//allows middleware 
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

/* import data from models */
import User from "./models/User.js";
import Product from "./models/Products.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateState.js";
import {
    dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
    dataAffiliateStat,
  } from "./data/index.js";

/*Routes*/
app.use("/client",clientRoutes);
app.use("/general",generalRoutes);
app.use("/management",managementRoutes);
app.use("/sales",salesRoutes);

/*mongoose setup*/
const PORT=process.env.PORT|| 9000;
mongoose.set("strictQuery",false);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server port: ${PORT}`));
   
    /* ONLY ADD DATA ONE TIME */
     /*AffiliateStat.insertMany(dataAffiliateStat);
     OverallStat.insertMany(dataOverallStat);
     Product.insertMany(dataProduct);
     ProductStat.insertMany(dataProductStat);
     Transaction.insertMany(dataTransaction);
     User.insertMany(dataUser);*/

}).catch((err)=>{
    console.log(`${err} did not connect`);
});
