import React from "react" 
import Top from "./components/topBar" ; 
import Footer from "./components/Footer";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import About from "./components/About";
import NavBar from "./components/Navbar";
import HomePage  from "./interface/HomePage";
import FoodScreen from "./interface/FoodScreen";
import CartScreen from "./interface/CartScreen";
import LoginScreen from "./interface/LoginScreen";
import RegisterScreen from "./interface/RegisterScreen";
import ProfileScreen from "./interface/ProfileScreen";
import ShippingScreen from "./interface/ShippingScreen";
import PaymentScreen from "./interface/PaymentScreen";
import PlaceOrderScreen from "./interface/PlaceOrderScreen";
import OrderScreen from "./interface/OrderScreen";
import UserListScreen from "./interface/UserListScreen";
import UserEditScreen from "./interface/UserEditScreen";
import ProductListScreen from "./interface/ProductListScreen";
import ProductEditScreen from "./interface/ProductEditScreen";
import OrderListScreen from "./interface/OrderListScreen";
import HomeScreen from "./interface/HomeScreen";

function App() {
  return (
      <BrowserRouter>
          <Top/>
          <NavBar/>
          <Routes>
             <Route path="/login" element={<LoginScreen/>} />
             <Route path="/register" element={<RegisterScreen/>} />
             <Route path="/profile" element={<ProfileScreen/>} />
             <Route path="/admin/userList" element={<UserListScreen/>}/>
             <Route path="/admin/productList" element = {<ProductListScreen/>} />
             <Route path="/admin/orderList" element = {<OrderListScreen/>} />
             <Route path="/admin/user/:id/edit" element={<UserEditScreen/>}/>
             <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>}/>
             <Route path='/shipping' element={<ShippingScreen/> } />
             <Route path='/payment' element = {<PaymentScreen/>} />
             <Route path='/placeorder' element ={<PlaceOrderScreen/>} />
             <Route path='/order/:id' element={<OrderScreen/>} />
             <Route path="/" element={<HomePage/>} />
             <Route path="about" element={<About />} />
             <Route path= "foods/:id" element = {<FoodScreen/>} />
             <Route path='/cart'>
                 <Route path=':id' element={<CartScreen />} />
                 <Route path='' element={<CartScreen />} />
            </Route>
            <Route path= "/search/:keyword" element = {<HomeScreen/>} />
          </Routes>
          <Footer/>
      </BrowserRouter>   
  );
}

export default App;
