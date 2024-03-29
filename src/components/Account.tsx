import { useParams } from "react-router-dom";
import { queryRequest, showRequest } from "../services/axiosWrapper";
import { useEffect, useState } from "react";
import storage from "../utility/storage";
import IUser from "../interfaces/User";

const Account = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    if (id) {
      queryRequest(`/getEmployeeByID?id=${id}`)
        .then((data) => setUser(data.data))
        .catch((error) => alert(error));
    }
  }, [id]);

  const token = storage.getToken();
  console.log(token);
  // console.log()
  console.log(user);
  return (
    <div>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Create Employee
      </button>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Delete Employee
      </button>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Create Payroll
      </button>
      <div>in account</div>
      <div>User {user?.salary}</div>
    </div>
  );
};

export default Account;
