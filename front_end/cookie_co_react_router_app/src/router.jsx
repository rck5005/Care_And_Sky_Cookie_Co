import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import Error404Page from "./pages/Error404Page.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CreationsPageFavorites from "./pages/CreationsPageFavorites.jsx";
import CreationsPageAll from "./pages/CreationsPageAll.jsx";
import CreationsPageMy from "./pages/CreationsPageMy.jsx";
import CreationsPageMake from "./pages/CreationsPageMake.jsx";
import VariationsPageFlavors from "./pages/VariationsPageFlavors.jsx";
import VariationsPageDecorations from "./pages/VariationsPageDecorations.jsx";
import VariationsPageToppings from "./pages/VariationsPageToppings.jsx";
import VariationsPageCookieCutters from "./pages/VariationsPageCookieCutters.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about/",
        element: <AboutPage />,
      },
      {
        path: "creations/favorites",
        element: <CreationsPageFavorites />,
      },      
      {
        path: "creations/all",
        element: <CreationsPageAll />,
      },      
      {
        path: "creations/mine",
        element: <CreationsPageMy />,
      },      
      {
        path: "creations/make",
        element: <CreationsPageMake />,
      },
      {
        path: "variations/flavors",
        element: <VariationsPageFlavors />,
      },
      {
        path: "variations/cookiecutters",
        element: <VariationsPageCookieCutters />,
      },
      {
        path: "variations/toppings",
        element: <VariationsPageToppings />,
      },
      {
        path: "variations/decorations",
        element: <VariationsPageDecorations />,
      },
    //   {
    //     path: "variations/:name",
    //     element: <VariationsPage />,
    //   },
    //   {
    //     path: "login/",
    //     element: <MissingPokemonPage />,
    //   },
    ],
    errorElement:<Error404Page />,
  },
]);

export default router;