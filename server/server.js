import path from 'path';
import express  from 'express';
import  cors from 'cors' ;
import dotenv  from 'dotenv';
import connectDB from './config/database.js';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"
import { notFound , errorHandler } from './middleware/errorMiddleware.js';
import morgan from 'morgan';

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

connectDB();

dotenv.config();
app.use(cors());
app.get("/",(req,res)=>{
    res.send('API is running');
})

app.use("/api/foods",productRoutes);
app.use("/api/users",userRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/upload",uploadRoutes);



const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;


app.listen(port,console.log(`server is running in ${process.env.NODE_ENV} mode on port ${port}`));