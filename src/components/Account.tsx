import {  useNavigate, useParams } from "react-router-dom";
import { queryRequest } from "../services/axiosWrapper";
import { useEffect, useState } from "react";
import IUser from "../interfaces/User";

const Account = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      queryRequest(`/getEmployeeByID?id=${id}`)
        .then((data) => setUser(data.data))
        .catch((error) => alert(error));
    }
  }, [id]);

  const navigateCreate=()=>{
    navigate("/createEmployee");
  }

  const navigateAllEmployees=()=>{
    navigate("/listUsers")
  }

  return (
    <div>
      
      <h1> Welcome, Admin </h1>
      <div>
        Name : {user?.first_name} {user?.middle_name} {user?.last_name}
      </div>
      <div>Email: {user?.email}</div>
      <div>Designation: {user?.designation}</div>
      <div>DOB: {user?.date_of_birth}</div>
      <div>Joining Date: {user?.date_of_joining}</div>
      <div>Location: {user?.hired_location}</div>
      <div>Address: {user?.residential_address}</div>
      <div>Salary: {user?.salary}</div>
      <div>Status: {user?.work_status}</div>
      <div>Experience: {user?.years_of_experience}</div>
      <button onClick={navigateCreate} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Create Employee
      </button>
      <button onClick={navigateAllEmployees} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        All Employees
      </button>
    </div>
  );
};

export default Account;
