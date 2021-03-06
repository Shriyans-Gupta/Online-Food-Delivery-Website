import axios from 'axios';
import React, { useState , useEffect} from 'react';
import {Link , useNavigate , useLocation , useParams} from "react-router-dom";
import { Form , Button , Container} from 'react-bootstrap';
import { useDispatch , useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails , updateProduct } from '../actions/productActions';
import Message from '../components/Message';
import {PRODUCT_UPDATE_RESET , PRODUCT_DETAILS_RESET} from '../constants/productConstants';

const ProductEditScreen = () => {
    
   const navigate = useNavigate();
   const params = useParams();
   const productId = params.id;
   const [name , setName] = useState('');
   const [price , setPrice] = useState('');
   const [image , setImage] = useState('');
   const [brand , setBrand] = useState('');
   const [description , setDescription] = useState('');
   const [category , setCategory] = useState('');
   const [countInStock , setCountInStock] = useState(0);
   const [uploading , setUploading] = useState(false);
   
   const dispatch = useDispatch();
   const productDetails = useSelector((state) => state.productDetails);
   const { loading , error , product} = productDetails;

   const productUpdate = useSelector((state)=> state.productUpdate)
   const {loading : loadingUpdate , error : errorUpdate , success : successUpdate } = productUpdate

   useEffect(() => {
         if(successUpdate){
             dispatch({type : PRODUCT_UPDATE_RESET})
             dispatch({type : PRODUCT_DETAILS_RESET})
             navigate('/admin/productList');
         }else{
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId));
            }else{
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setDescription(product.description);
                setCountInStock(product.countInStock);
            }
         }

    }, [product , productId , dispatch , successUpdate , navigate]);
   
   const uploadFileHandler = async(e) => {
     const file = e.target.files[0];
     const formData = new FormData();
     formData.append('image',file)
     setUploading(true)
     try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
   }

   const submitHandler = (e) => {
        e.preventDefault();
        //UPDATE PRODUCT
        dispatch(updateProduct({
            _id : productId,
             name , 
             price,
             image , 
             category ,
             description,
             brand,
             countInStock
        }))
   }

   return (
       <Container>
           <Link to='/admin/productList' style={{textDecoration:'none'}} >
                <Button  variant='light' style={{margin: '20px 0 0 0'}}>  Go To Product List </Button>
           </Link>
           <FormContainer>
           <h2>EDIT PRODUCT DETAILS</h2>
           {loadingUpdate && <Loader/>}
           {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
           {
               loading ? <Loader/> : error ? <Message variantt='danger'>{error}</Message>:(
              <Form onSubmit={submitHandler}>
               <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e)=> setName(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter Price'
                  value={price}
                  onChange={(e)=> setPrice(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="image">
                  <Form.Label >
                     Image
                 </Form.Label>
                 <Form.Control
                       type="text"
                       placeholder="Enter image url" 
                       value={image} 
                       onChange={(e) => setImage(e.target.value)}
                   >
                </Form.Control>
                 <Form.Control 
                     type="file"
                     id="image-file"
                     label="Choose file"
                     custom
                     onChange={uploadFileHandler}
                  />
                   {uploading && <Loader />}
               </Form.Group>
              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Brand'
                  value={brand}
                  onChange={(e)=> setBrand(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Description'
                  value={description}
                  onChange={(e)=> setDescription(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Category'
                  value={category}
                  onChange={(e)=> setCategory(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter Count In Stock'
                  value={countInStock}
                  onChange={(e)=> setCountInStock(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Button type='submit' variant='dark'>
                  Update Product Details
              </Button>
           </Form>
               )
           }
       </FormContainer>
       </Container>

   )

}

export default ProductEditScreen;