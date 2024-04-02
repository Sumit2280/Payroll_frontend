import axios from "axios";
const axiosClient = axios.create({});
axiosClient.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// axiosClient.defaults.headers.common['Authorization']=AUTH_TOKEN;

// axiosClient.interceptors.request.use(config=> {
//   const accessToken = localStorage.getItem("accessToken");
//   // console.log(Headers);
//   //checking if accessToken exists
//   if(accessToken){
//     config.headers["Authorization"]=accessToken;
//     }
//     console.log("in axios");
//   console.log(accessToken);
//   return config;
// });

const getRequest = async () => {
  return await axiosClient.get("");
};

const deleteRequest = async (id: number) => {
  return await axiosClient.delete(`/${id}`);
};

const deleteEmployee = async (id: string) => {
  return await axiosClient({
    method: "DELETE",
    url: `/deleteEmployee?id=${id}`,
  });
};

const updateRequest = async (id: number, payload: {}) => {
  return await axiosClient.put(`/${id}`, payload);
};

const showRequest = async (id: string) => {
  return await axiosClient.get(`/${id}`);
};

const postRequest = async (payload: { email: string; password: string }) => {
  // console.log("in postrequest");
  return await axiosClient({
    method: "POST",
    url: "/login",
    data: payload,
  });
};

const createEmployee = async (payload: {}) => {
  console.log("in postrequest");
  console.log(payload);
  return await axiosClient({
    method: "POST",
    url: "/createEmployee",
    data: payload,
  });
};

const createPayroll =async (payload:{})=>{
  return await axiosClient({
    method: "POST",
    url: "/createPayroll",
    data: payload
  })
}
const queryRequest = async (query: string) => {
  return await axiosClient.get(`${query}`);
};

export {
  getRequest,
  deleteRequest,
  updateRequest,
  showRequest,
  postRequest,
  queryRequest,
  createEmployee,
  deleteEmployee,
  createPayroll
};
