import ReactDOM from "react-dom/client";
import "assets/styles/index.scss";
import "assets/styles/ant-override.scss";

import { RouterProvider } from "react-router-dom";
import Router from "./routes/index";

import { Provider } from "react-redux";
import { store } from "@/store/index";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMUl7YcyXmOauCTf_g1fD8puVCHjicGyE",
  authDomain: "react-demo-ddc09.firebaseapp.com",
  projectId: "react-demo-ddc09",
  storageBucket: "react-demo-ddc09.appspot.com",
  messagingSenderId: "23086864803",
  appId: "1:23086864803:web:cfe2a56d725fd26db7e216",
  measurementId: "G-CVDX4ZQD5C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>
);
