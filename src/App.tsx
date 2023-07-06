import { Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage } from "./components/MainPage";
import "./styles/app.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
