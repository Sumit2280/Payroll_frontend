import { useNavigate, useParams } from "react-router-dom";
import { queryRequest } from "../services/axiosWrapper";
import { useEffect, useState } from "react";
import IUser from "../interfaces/User";
import ListUsers from "./ListUsers";
import CombinedAppBar from "./CombinedAppBar";
import storage from "../utility/storage";
// import { Navbar } from "./Navbar";

const Account = () => {
  // const [user, setUser] = useState<IUser>();
  

  // useEffect(() => {
  //   if (id) {
  //     queryRequest(`/getEmployeeByID?id=${id}`)
  //       .then((data) => setUser(data.data))
  //       .catch((error) => alert(error));
  //   }
  // }, [id]);


  return (
    <div>
      <CombinedAppBar />
      {/* <div>
        <button
          onClick={navigateCreate}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Create Employee
        </button>
        <button
          onClick={navigateAllEmployees}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          All Employees
        </button>
      </div> */}
      {/* <ListUsers /> */}
    </div>
  );
};

export default Account;
