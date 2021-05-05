import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';

import CartIcon from './cart-icon.component';

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
      toggleCartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
      itemCount @client
  }
`;

const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => ( //we desctructure from props that get passed from flowRight
    <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
);

export default flowRight(
    graphql(GET_ITEM_COUNT), //we now have access to data object(that has itemCount property) inside the props that CartIconContainer gets
    graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' }) //gives us mutation as prop but is called mutate, so we set the second argument to call the name we want
)(CartIconContainer);
//graphql takes mutations and queries and binds them to some components,
// that we pass as the outcome of that function, bec. it is HOC function