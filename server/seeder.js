import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from "./data/users.js";
import foods from "./data/foods.js";
import User  from "./models/userModel.js";
import Food from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/database.js";

dotenv.config();
connectDB();

const importData = async() => {
    
    try {
        await Order.deleteMany();
        await Food.deleteMany();
        await User.deleteMany();

        const createUsers = await User.insertMany(users);
        const adminUser = createUsers[0]._id;

        const sampleFoods = foods.map((food) =>{
            return {...food , user: adminUser}
        })
        await Food.insertMany(sampleFoods);
        console.log('Data Imported');
        process.exit();

    }catch(error){
        console.log(`${error}`);
        process.exit(1);
    }

}

const destroyData = async() => {
    try {
        await Order.deleteMany();
        await Food.deleteMany();
        await User.deleteMany();

        console.log("data destroyed");
        process.exit();
    }catch(error){
        console.log(`${error}`);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}