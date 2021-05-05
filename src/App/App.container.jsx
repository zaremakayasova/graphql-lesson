import React from 'react';
import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';

import App from './App';
import { graphql } from 'react-apollo';

const SET_CURRENT_USER = gql`
  mutation SetCurrentUser($user:User!){
      setCurrentUser(user: $user) @client
  }
`;

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

const AppContainer = ({ data: { currentUser }, setCurrentUser }) => (
    <App setCurrentUser={setCurrentUser} currentUser={currentUser} />
);

export default flowRight(
    graphql(GET_CURRENT_USER),
    graphql(SET_CURRENT_USER, { name: 'setCurrentUser' })
)(AppContainer);