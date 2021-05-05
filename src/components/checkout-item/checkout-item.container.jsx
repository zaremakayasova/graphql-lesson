import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';

import CheckoutItem from './checkout-item.component';
import { clearItemFromCart } from '../../graphql/cart.utils';

const REMOVE_ITEM_FROM_CART = gql`
   mutation RemoveItemFromCart($item: Item!){
         removeItemFromCart(item: $item) @client
   }
   `;

const ADD_ITEM_TO_CART = gql`
   mutation AddItemToCart($item: Item!){
       addItemToCart(item: $item) @client
   }
   `;

const CLEAR_ITEM_FROM_CART = gql`
   mutation ClearItemFromCart($item: Item!){ 
       clearItemFromCart(item:$item) @client
   }
`;

const CheckoutItemContainer = ({ removeItemFromCart, addItemToCart, clearItemFromCart, ...otherProps }) => (
    <CheckoutItem {...otherProps}
        removeItem={item => removeItemFromCart({ variables: { item } })}
        addItem={item => addItemToCart({ variables: { item } })}
        clearItem={item => clearItemFromCart({ variables: { item } })}
    />
);

export default flowRight(
    graphql(REMOVE_ITEM_FROM_CART, { name: 'removeItemFromCart' }),
    graphql(ADD_ITEM_TO_CART, { name: 'addItemToCart' }),
    graphql(CLEAR_ITEM_FROM_CART, { name: 'clearItemFromCart' })
)
    (CheckoutItemContainer);