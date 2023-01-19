import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import { HashRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./components/Tasks/Task", () => {
    const newRootReducer = require("./components/Tasks/Task").default;
    store.replaceReducer(newRootReducer);
  });
  // console.log("k");
}
