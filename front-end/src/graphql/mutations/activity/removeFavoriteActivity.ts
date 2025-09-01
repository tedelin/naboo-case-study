import gql from "graphql-tag";

const RemoveFavoriteActivity = gql`
  mutation RemoveFavoriteActivity($activityId: String!) {
    removeFavorite(activityId: $activityId) {
      id
      name
    }
  }
`;

export default RemoveFavoriteActivity;
