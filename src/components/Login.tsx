import { postRequest } from "../services/axiosWrapper";
import storage from "../utility/storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      const user = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const response = await postRequest(user);
      const token = response.data.token;
      storage.setToken(token);
      const object = JSON.parse(atob(token.split('.')[1]))
      navigate(`/account/${object.id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="h-screen flex bg-gray-bg1">
  <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
    <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
      Log in to your account 🔐
    </h1>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150`}
          id="email"
          placeholder="Your Email"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        <input
          type="password"
          className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150`}
          id="password"
          placeholder="Your Password"
        />
      </div>

      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          className={`bg-primary-600 py-2 px-4 text-sm text-white rounded-lg focus:outline-none focus:border-primary-700`}
        >
          Login
        </button>
       
      </div>
     
    </form>
  </div>
</div>

  );
};

export default Login;
