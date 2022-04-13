import  React from "react";
import { Container,Navbar,Nav , NavDropdown} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {MdAccountCircle} from "react-icons/md";
import {BsCartFill} from "react-icons/bs";
import {useSelector , useDispatch} from "react-redux";
import {FaHamburger} from "react-icons/fa";
import { logout } from "../actions/userAction";
import SearchBox from "./SearchBox";

const NavBar = () => {

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo}  = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
           dispatch(logout());
    }

    return (
     <>
  <Navbar collapseOnSelect expand="lg" style={{backgroundColor : "#F0ECE3"}} className='sticky' sticky="top">
     <Container>
       
       <LinkContainer to='/'>
          <Navbar.Brand>
                 <FaHamburger style={{color : ' #CC7722'}}/> FoodShop
            </Navbar.Brand>
       </LinkContainer>     
       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
       <Navbar.Collapse id="responsive-navbar-nav">
       &nbsp; &nbsp;<SearchBox/>
          <Nav className="ms-auto">
          {
            userInfo ? (
               <NavDropdown title={userInfo.name} id='username'>
                 <LinkContainer to="/profile">
                       <NavDropdown.Item>
                            Profile
                       </NavDropdown.Item>
                 </LinkContainer>
                 <NavDropdown.Item onClick={logoutHandler}>
                   Logout
                 </NavDropdown.Item>
               </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                   <Nav.Link> <MdAccountCircle/> Login</Nav.Link>
               </LinkContainer>)
            }
            {
              (userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='admin'>
                 <LinkContainer to="/admin/userList">
                       <NavDropdown.Item>
                            Users
                       </NavDropdown.Item>
                 </LinkContainer>
                 <LinkContainer to="/admin/productList">
                       <NavDropdown.Item>
                           Products
                       </NavDropdown.Item>
                 </LinkContainer>
                 <LinkContainer to="/admin/orderList">
                       <NavDropdown.Item>
                            Orders
                       </NavDropdown.Item>
                 </LinkContainer>
               </NavDropdown>
              ))
            }
          <LinkContainer to="/cart">
                <Nav.Link><BsCartFill style={{color : ' #CC7722'}}/>Cart</Nav.Link>
         </LinkContainer>
         </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
     </>
    )
}

export default NavBar;