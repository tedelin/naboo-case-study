import { Route } from "./types";

export const getFilteredRoutes = (routes: Route[], user: {} | null) => {
  return routes.map((route) => {
    if (Array.isArray(route.route)) {
      const filteredSubRoutes = route.route.filter((subRoute) => {
        if (user) {
          if (
            subRoute.requiredAuth === undefined ||
            subRoute.requiredAuth === true
          ) {
            return true; // Include sub-routes with requiredAuth undefined or true
          }
        } else {
          if (
            subRoute.requiredAuth === undefined ||
            subRoute.requiredAuth === false
          ) {
            return true; // Include sub-routes with requiredAuth undefined or false
          }
        }
        return false; // Exclude sub-routes that don't match the conditions
      });
      return { ...route, route: filteredSubRoutes };
    } else {
      return route;
    }
  });
};
