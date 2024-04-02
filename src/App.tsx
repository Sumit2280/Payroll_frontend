import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Account from "./components/Account";
import CreateEmployee from "./components/CreateEmployee";
import ListUsers from "./components/ListUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/account/:id",
    element: <Account />,
  },
  {
    path: "/createEmployee",
    element: <CreateEmployee />
  },
  {
    path: "/listUsers",
    element: <ListUsers />
  }
]);

function App() {


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Login />}></Route>
  //       <Route path="/account/:id" element={<Account />}></Route>
  //       <Route path="/createEmployee" element={<CreateEmployee />}></Route>
  //     </Routes>
  //   </BrowserRouter>
  // );
}

export default App;
