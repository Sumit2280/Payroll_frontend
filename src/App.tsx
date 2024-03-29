import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Account from "./components/Account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/account/:id" element={<Account />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
