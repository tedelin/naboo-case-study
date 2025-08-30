import gql from "graphql-tag";

const AddFavoriteActivity = gql`
  mutation AddFavoriteActivity($userId: String!, $activityId: String!) {
    addFavorite(userId: $userId, activityId: $activityId) {
      id
      name
      description
      city
      price
    }
  }
`;

export default AddFavoriteActivity;
