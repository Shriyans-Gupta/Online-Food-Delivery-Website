import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";


//@desc Create New Order
//@route POST /api/orders
//@access private

const addOrderItems = asyncHandler(async(req,res) => {
    const {orderItems, shippingAddress , paymentMethod , 
        itemsPrice , gstPrice , deliveryPrice , totalPrice} = req.body;
    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order Items');
        return 
    }else{
        const order = new Order({user : req.user._id, orderItems, shippingAddress , paymentMethod , 
            itemsPrice , gstPrice , deliveryPrice , totalPrice});

        const createdOrder = await order.save();
        res.status(200).json(createdOrder);
    }
});

//@desc Get Order by id
//@route POST /api/orders/:id
//@access private

const getOrderById = asyncHandler(async(req,res) => {
    
    const order = await Order.findById(req.params.id).populate('user','name email');
    if(order){
        res.json(order)
    }else{
        res.status(404);
        throw new Error('Order not Found');
    }

});

//@desc Update Order to Paid
//@route PUT /api/orders/:id
//@access private

const updateOrderToPaid = asyncHandler(async(req,res) => {
    
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = new Date(Date.now() + (330 * 60 * 1000));
        // order.paymentResult = {
        //     id : req.body.id,
        //     status : req.body.status,
        //     update_time : req.body.update_time,
        //     email_address : req.body.email_address
        // }
      
        const updateOrder = await order.save();
        if(updateOrder){
            res.json(updateOrder);
        }
    }else{
        res.status(404);
        throw new Error('Order not Found');
    }

});


//@desc Update Order to Delivered
//@route PUT /api/orders/:id/deliver
//@access private/admin

const updateOrderToDelivered = asyncHandler(async(req,res) => {
    
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true;
        order.deliveredAt = new Date(Date.now() + (330 * 60 * 1000));
      
        const updateOrder = await order.save();
        if(updateOrder){
            res.json(updateOrder);
        }
    }else{
        res.status(404);
        throw new Error('Order not Found');
    }

});

//@desc get user orders
//@route get /api/orders/myorders
//@access private

const getMyOrders = asyncHandler(async(req,res) => {
    
    const orders = await Order.find({ user : req.user._id});
    if(orders){
        res.json(orders);
    }
});

//@desc get user orders
//@route get /api/orders
//@access private/admin

const getOrders = asyncHandler(async(req,res) => {
    
    const orders = await Order.find({}).populate('user','id name');
    if(orders){
        res.json(orders);
    }
});

export {addOrderItems , getOrderById , updateOrderToPaid ,updateOrderToDelivered , getMyOrders , getOrders};

