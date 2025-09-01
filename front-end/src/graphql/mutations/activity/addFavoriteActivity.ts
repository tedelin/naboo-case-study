import gql from "graphql-tag";

const AddFavoriteActivity = gql`
  mutation AddFavoriteActivity($activityId: String!) {
    addFavorite(activityId: $activityId) {
      id
      name
      description
      city
      price
    }
  }
`;

export default AddFavoriteActivity;
