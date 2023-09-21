import ReactDOM from "react-dom/client";
import "assets/styles/index.scss";
import "assets/styles/ant-override.scss";

import { RouterProvider } from "react-router-dom";
import Router from "./routes/index";

import { Provider } from "react-redux";
import { store } from "@/store/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>
);
