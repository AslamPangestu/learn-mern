import React from "react";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import ShopingList from "./components/ShopingList";

import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <ShopingList />
      </div>
    </Provider>
  );
}

export default App;
