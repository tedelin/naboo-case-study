import gql from "graphql-tag";

const GetFavoriteActivities = gql`
  query GetFavoriteActivities($userId: String!) {
    getFavorites(userId: $userId) {
      id
      name
      description
      city
      price
    }
  }
`;

export default GetFavoriteActivities;
