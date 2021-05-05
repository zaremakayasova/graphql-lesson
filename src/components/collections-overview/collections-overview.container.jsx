import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

const GET_COLLECTIONS = gql`
{
    collections {
        id
        title
        items {
          id
          name
          price
          imageUrl
        }
      }
}
`;

const CollectionsOverviewContainer = () => (
    // Query component gives us back a function
    // on that function is going to be an object that holds a lot of different properties that get passed in
    // the main ones that we care about: loading, error, data - we destructure them

    <Query query={GET_COLLECTIONS}>
        {({ loading, data }) => {
            if (loading) return <Spinner />;
            return <CollectionsOverview collections={data.collections} />;
        }}
    </Query>
);

export default CollectionsOverviewContainer;
