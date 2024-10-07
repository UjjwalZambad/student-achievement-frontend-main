import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
   <Provider store={store}>

    <App />
   </Provider>
    <Toaster/>
  </BrowserRouter>
);
