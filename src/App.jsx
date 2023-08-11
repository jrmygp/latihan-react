import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import KeepLogin from "./appWrapper/KeepLogin";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <KeepLogin>
          <div className="App">
            <Routes>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
            </Routes>
          </div>
        </KeepLogin>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
