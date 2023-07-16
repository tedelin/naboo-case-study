import { IconUserCircle } from "@tabler/icons-react";

type SubRoute = {
  link: string;
  label: string;
};

export type Route = {
  label: string;
  route: string | SubRoute[];
  icon?: typeof IconUserCircle;
};
