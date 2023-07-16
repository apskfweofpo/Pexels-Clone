import { Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage } from "./components/MainPage";
import "./styles/app.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ResultPage } from "./components/ResultPage";
import { APP_ROUTE, SEARCH_ROUTE } from "./utils/routes";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path={APP_ROUTE} element={<MainPage />} />
          <Route path={SEARCH_ROUTE + ":category"} element={<ResultPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
