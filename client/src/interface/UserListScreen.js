import React , { useEffect} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Table , Button , Container} from 'react-bootstrap';
import {useDispatch , useSelector} from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listUsers } from '../actions/userAction';
import { deleteUser } from '../actions/userAction';
import {TiTick} from 'react-icons/ti';
import {ImCross} from 'react-icons/im';
import {AiFillEdit} from 'react-icons/ai';
import {MdDelete} from 'react-icons/md';

const UserListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userList = useSelector(state => state.userList)
    const {loading , error , users} = userList;
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;
    const userDelete = useSelector(state => state.userDelete);
    const { success : successDelete} = userDelete;

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            navigate('/login');
        }
        
    },[dispatch,navigate,userInfo , successDelete]);

    const deleteHandler = (id) => {
        if(window.confirm('Are you want to delete the user?')){
            dispatch(deleteUser(id));
        }
    }

    return (
      <Container style={{marginTop : '30px' , marginBottom : '80px'}}>
         <h2>USERS</h2>
         {
             loading ? <Loader/> : error ? <Message variant='danger'> {error} </Message> : (
                 <Table striped bordered responsive hover className='table-sm' >
                     <thead>
                         <th>ID</th>
                         <th>NAME</th>
                         <th>EMAIL</th>
                         <th>ADMIN</th>
                         <th></th>
                     </thead>
                     <tbody>
                         {
                             users.map(user => (
                                 <tr key = {user._id}>
                                     <td>{user._id}</td>
                                     <td>{user.name}</td>
                                     <td>{user.email}</td>
                                     <td style={{textAlign : 'center'}}>{
                                        user.isAdmin ? <TiTick  size={30} style={{  color : 'green'}} /> :(
                                            <ImCross style={{ color : 'red'}} />
                                        )
                                         }
                                      </td>
                                     <td style={{textAlign : 'center'}}>
                                             <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <AiFillEdit/>
                                                </Button>
                                             </LinkContainer>
                                             <Button 
                                                variant = 'danger' className = 'btn-sm' 
                                                onClick= {() => deleteHandler(user._id)}>
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

export default UserListScreen;