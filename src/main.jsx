import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContentDetail from "./pages/SingleArticle/ContentDetail.jsx";
import Favorite from "./pages/Favorites/Favorite.jsx"
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import SomethingWentWrong from "./pages/SomethingWentWrong/SomethingWentWrong.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>  

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/content" element={<ContentDetail />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/something-went-wrong" element={<PageNotFound/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
  
    </Provider>
  </React.StrictMode>
);
