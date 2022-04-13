import React , { useEffect} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Table , Button , Container , Row , Col} from 'react-bootstrap';
import {useDispatch , useSelector} from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts , deleteProduct  , createProduct} from '../actions/productActions'; 
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import {AiFillEdit} from 'react-icons/ai';
import {MdDelete , MdAddCircleOutline} from 'react-icons/md';

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productList = useSelector(state => state.productList)
    const {loading , error , products} = productList;
    const productDelete = useSelector(state => state.productDelete)
    const { loading : loadingDelete , error : errorDelete , success : successDelete } = productDelete
    const productCreate = useSelector(state => state.productCreate)
    const { loading : loadingCreate , error : errorCreate , success : successCreate,
       product : createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;

    useEffect(() => {
        dispatch({ type : PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin){
            navigate('/login');
        }
        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts());
        }
        
    },[dispatch,navigate,userInfo , successDelete , successCreate , createdProduct]);

    const deleteHandler = (id) => {
        if(window.confirm('Are you want to delete the product?')){
        // delete product
         dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        //CREATE A NEW PRODUCT
        dispatch(createProduct());
    }

    return (
      <Container style={{marginTop : '30px' , marginBottom : '80px'}}>
        <Row>
           <Col>
               <h2>FOOD ITEMS</h2> 
           </Col>
           <Col style={{textAlign : 'right'}}>
              <Button variant='dark' style={{marginTop : '0'}} onClick={createProductHandler}>
                  <MdAddCircleOutline size={25}/>  Add Item
              </Button>
           </Col>
        </Row>
        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
         {
             loading ? <Loader/> : error ? <Message variant='danger'> {error} </Message> : (
                 <Table striped bordered responsive hover className='table-sm' >
                     <thead>
                         <th>ID</th>
                         <th>NAME</th>
                         <th>PRICE</th>
                         <th>CATEGORY</th>
                         <th>BRAND</th>
                         <th></th>
                     </thead>
                     <tbody>
                         {
                             products.map(food => (
                                 <tr key = {food._id}>
                                     <td>{food._id}</td>
                                     <td>{food.name}</td>
                                     <td>{food.price}</td>
                                     <td>{food.category}</td>
                                      <td>{food.brand}</td>
                                     <td style={{textAlign : 'center'}}>
                                             <LinkContainer to={`/admin/product/${food._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <AiFillEdit/>
                                                </Button>
                                             </LinkContainer>
                                             <Button 
                                                variant = 'danger' className = 'btn-sm' 
                                                onClick= {() => deleteHandler(food._id)}>
                                                 <MdDelete/>
                                             </Button>
                                     </td>
                                 </tr>
                             ))
                         }
                     </tbody>
                 </Table>
             )
         }
      </Container>
  )
}

export default ProductListScreen;