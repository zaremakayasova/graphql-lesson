import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http'; //let us connect our client(apollo) to the specific endpoint(graphql)
import { InMemoryCache } from 'apollo-cache-inmemory'; //apollo uses it to cache the data that it fetches
import { ApolloClient } from 'apollo-boost';

import { store, persistor } from './redux/store';

import './index.css';
import { default as App } from './App/App.container';
import { resolvers, typeDefs } from './graphql/resolvers';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});

const cache = new InMemoryCache(); //cache object that we use to manage data; it kinda like an object we use as local storage for our app

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers
});

client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0,
    cartTotal: 0,
    currentUser: null
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
