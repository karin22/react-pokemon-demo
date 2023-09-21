import { createBrowserRouter } from "react-router-dom";

import Home from "pages/home.tsx";
import Fav from "pages/fav.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/fav",
    element: <Fav />,
  },
]);

export default router;
