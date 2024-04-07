import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Account from "./components/Account";
import CreateEmployee from "./components/CreateEmployee";
import ListUsers from "./components/ListUsers";
import UserAccount from "./components/UserAccount";
import Timepass from "./components/Timepass";
import { Modal } from "@mui/material";
import CombinedAppBar from "./components/CombinedAppBar";
import UpdateEmployee from "./components/UpdateEmployee";

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
    path: "/userAccount/:id",
    element: <UserAccount />,
  },
  {
    path: "/createEmployee",
    element: <CreateEmployee />,
  },
  {
    path: "/listUsers",
    element: <ListUsers searchKey=""/>,
  },
  {
    path: "/timepass",
    element: <Timepass />,
  },
  {
    path: "/updateEmployee",
    element: <UpdateEmployee />,
  },
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
