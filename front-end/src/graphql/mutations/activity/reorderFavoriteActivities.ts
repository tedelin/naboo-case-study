import gql from "graphql-tag";

const ReorderFavoriteActivities = gql`
  mutation ReorderFavoriteActivities($activityId: String!, $newIndex: Int!) {
    reorderFavorite(activityId: $activityId, newIndex: $newIndex) {
      id
      name
      description
      city
      price
    }
  }
`;

export default ReorderFavoriteActivities;
