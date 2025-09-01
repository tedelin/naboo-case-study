import gql from "graphql-tag";

const GetFavoriteActivities = gql`
  query GetFavoriteActivities {
    getFavorites {
      id
      name
      description
      city
      price
    }
  }
`;

export default GetFavoriteActivities;
