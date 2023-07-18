import { IconUserCircle } from "@tabler/icons-react";
import { Route } from "./components/Topbar";

export const routes: Route[] = [
  { label: "Découvrez des activités", route: "/discover" },
  { label: "Explorer", route: "/explorer" },
  {
    label: "Utilisateur",
    icon: IconUserCircle,
    route: [
      {
        label: "Se connecter",
        link: "/signin",
        requiredAuth: false,
      },
      {
        label: "S'inscrire",
        link: "/signup",
        requiredAuth: false,
      },
      { label: "Profile", link: "/profile", requiredAuth: true },
      { label: "Se déconnecter", link: "/logout", requiredAuth: true },
    ],
  },
];
