import { useEffect, useState } from "react";
import { createPayroll, deleteEmployee, queryRequest } from "../services/axiosWrapper";
import IUser from "../interfaces/User";


const ListUsers = () => {
  const [user, setUser] = useState<IUser[]>([]);

  const getAllUsers = async () => {
    try {
      const data = await queryRequest(`/getAllEmployees`);
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUser = async (key: string) => {
    console.log(key);
    try {
      await deleteEmployee(key);
      console.log("Deleted Successfully");
      getAllUsers();
    } catch (error) {
      console.log("in catch");
      console.log(error);
    }
  };

  const createEmployeePayroll = async(key:string)=>{
    console.log(key);
    try {
      await createPayroll(key);
      // console.log(data);
      console.log("Created payroll Successfully");
    } catch (error) {
      console.log("in catch");
      console.log(error);
    }
  }

  console.log(user);

  return (
    // <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    //   {user.map((item) => {
    //     return (
    //       <div key={item.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
    //       <div className="flex flex-col items-center pb-10">
    //       <ol key={item.id}>
    //         <div>
    //           <li>{item.id}</li>
    //           <button
    //             onClick={() => deleteUser(item.id)}
    //             className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    //           >
    //             Delete Employee
    //           </button>

    //           <button
    //             onClick={() => createEmployeePayroll(item.id)}
    //             className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    //           >
    //             Create Payroll
    //           </button>
    //         </div>
    //         <br />
    //       </ol>
    //       </div>
    //     </div>
    //     );
    //   })}
    // </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {user.map((item) => {
      return (
        <div key={item.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
          <div className="flex justify-end px-4 pt-4">
            {/* Your dropdown button code goes here */}
          </div>
          <div className="flex flex-col items-center pb-10">
            {/* Replace the image with your content */}
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item.first_name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{item.last_name}</span>
            <div className="flex mt-4 md:mt-6">
              <button
                onClick={() => deleteUser(item.id)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Delete Employee
              </button>
              <button
                onClick={() => createEmployeePayroll(item.id)}
                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Create Payroll
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
  );
};
export default ListUsers;
