import { CART_ADD_ITEM , CART_REMOVE_ITEM , CART_SAVE_SHIPPING_ADDRESS , CART_SAVE_PAYMENT_METHOD , CART_RESET_ITEM} from "../constants/cardConstants";

export const cartReducer = (state = {cartItems : [], shippingAddress : {}}, action) => {
    switch(action.type){
        case CART_ADD_ITEM : 
               
            // if newItem is already in the cartItems, then replace the old item with the new one
			// product in here is the product id
                const newItem = action.payload;
                const existItem = state.cartItems.find((currentItem) => currentItem.product_id === newItem.product_id);

                if(existItem){
                    return{
                        ...state,
                        cartItems : state.cartItems.map(currentItem=>
                            currentItem.product_id === existItem.product_id ? newItem 
                            : currentItem)
                    };
                }
                else{
                    return {
                        ...state ,
                        cartItems: [...state.cartItems, newItem]
                    };
                }
        case CART_REMOVE_ITEM:

        return {
            ...state,
            cartItems : state.cartItems.filter( item => item.product_id !== action.payload)
        };

        case CART_SAVE_SHIPPING_ADDRESS:

            return {
                ...state,
                shippingAddress : action.payload
            };

        case CART_SAVE_PAYMENT_METHOD:

        return {
            ...state,
            paymentMethod : action.payload
        };

        case CART_RESET_ITEM:
            return {
                cartItems : [], shippingAddress : {}
            }
    

        default :
            return state ;
    }
}