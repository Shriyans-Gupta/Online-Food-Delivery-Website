import asyncHandler from "express-async-handler";
import Food from "../models/productModel.js";


//@desc fetch all products
//@route GET /api/foods
//@access public

const getProducts = asyncHandler(async(req,res) => {
    const keywordName = req.query.keyword ? {
        name : {
           $regex : req.query.keyword,
           $options : 'i' 
        }
    }:{};
    const keywordBrand = req.query.keyword ? {
        brand:{
          $regex: req.query.keyword,
          $options: 'i'
        }
      } : {}
     
    const keywordDescription = req.query.keyword ? {
        description:{
          $regex: req.query.keyword,
          $options: 'i'
        }
      } : {}
     
    const keywordCategory = req.query.keyword ? {
        category:{
          $regex: req.query.keyword,
          $options: 'i'
        }
      } : {}
    const foods = await Food.find({    
        $or: [
        {...keywordName},
        {...keywordBrand},
        {...keywordDescription},
        {...keywordCategory}
      ]
    });
    res.json(foods);
});

//@desc fetch single product
//@route GET /api/foods/:id
//@access public

const getProductById = asyncHandler(async(req,res)=>{
    const food = await Food.findById(req.params.id)
    if (food){
        res.json(food)
    }else{
        res.status(404);
        throw new Error('Product Not Found');
    }
});

//@desc delete a product
//@route delete /api/foods/:id
//@access private/admin

const deleteProduct = asyncHandler(async(req,res)=>{
    const food = await Food.findById(req.params.id)
    if (food){
        await food.remove();
        res.json({ message : 'Successfully Deleted'})
    }else{
        res.status(404);
        throw new Error('Product Not Found');
    }
});

//@desc create a product
//@route post /api/foods
//@access private/admin

const createProduct = asyncHandler(async(req,res)=>{
    const food = new Food({
        name : 'Sample Name',
        price : 0 ,
        user : req.user._id ,
        image : '/image/sample.jpg',
        brand : 'Sample Brand',
        category : 'Sample Category',
        countInStock : 0,
        numReviews : 0,
        description : 'Sample Description'
    })

    const createdFood = await food.save();
    res.status(201).json(createdFood);
});

//@desc update a product
//@route post /api/foods/:id
//@access private/admin

const updateProduct = asyncHandler(async(req,res)=>{
   
    const {name , price , image , brand , category , countInStock , description} = req.body;

    const food = await Food.findById(req.params.id);
    if(food){
       
        food.name = name;
        food.price = price ;
        food.description = description;
        food.image = image ;
        food.brand = brand;
        food.category = category;
        food.countInStock = countInStock;

        const updatedFood = await food.save();
        res.status(201).json(updatedFood);   
    }else{
        res.status(404);
        throw new Error('Product Not Found')
    }
});

//@desc create a review
//@route post /api/foods/:id/reviews
//@access private

const createProductReview = asyncHandler(async(req,res)=>{
   
    const {rating , comment} = req.body;

    const food = await Food.findById(req.params.id);
    if(food){
         const alreadyReviewed = food.reviews.find(r => r.user.toString() === req.user._id.toString())
        
          if(alreadyReviewed){
              res.status(400)
              throw new Error('Product Already Reviewed')
          }
          const review = {
              name : req.user.name,
              rating : Number(rating),
              comment ,
              user : req.user._id
          }
          food.reviews.push(review)
          food.noReviews = food.reviews.length
          food.rating = food.reviews.reduce((acc,item) => item.rating + acc , 0)/food.reviews.length

          await food.save();
          res.status(201).res.json({message : 'Review Added'})
    }else{
        res.status(404);
        throw new Error('Product Not Found')
    }
});

export {getProducts , getProductById , deleteProduct , createProduct , updateProduct , createProductReview} ;