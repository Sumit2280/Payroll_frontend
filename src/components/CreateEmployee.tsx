import { useNavigate } from "react-router-dom";
import { createEmployee } from "../services/axiosWrapper";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateEmployee = () => {
  const createuser=async(values:{})=>{
    try{
      console.log("in try");
      await createEmployee(values);

    }
    catch (error) {
      console.log("in catch");
      console.log(error); 
    }
  }
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      id: "",
      role_id: 0,
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      password: "",
      date_of_birth: "",
      designation: "",
      date_of_joining: "",
      hired_location: "",
      proof_id: "",
      residential_address: "",
      salary: 0,
      work_status: "",
      years_of_experience: 0,
    },
    // validationSchema: Yup.object({
    //   title: Yup.string()
    //     .min(4, "must be of minimum of four letters")
    //     .max(10, "can't be more than 10 letters")
    //     .required("Required"),
    //   assignee: Yup.string().required("Required"),
    //   dueDate: Yup.date().min(
    //     new Date(new Date().setHours(0, 0, 0, 0)),
    //     "You can't add any todo before today"
    //   ),
    // }),
    onSubmit: (values) => {
      console.log(values);
      // values.date_of_birth.toString();
      // values.date_of_joining.toString();
      // console.log("aftre");
      // console.log(values);
      createuser(values);
      navigate(`/account/${values.id}`);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="id">id</label>
        <input
          id="id"
          name="id"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.id}
          className="border border-black"
        />
      </div>
      <div>
        <label htmlFor="role_id">role_id</label>
        <input
          id="role_id"
          name="role_id"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.role_id}
          className="border border-black"
        />
      </div>
      <div>
        <label htmlFor="first_name">first_name</label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.first_name}
          className="border border-black"
        />
        {/* {formik.touched.first_name && formik.errors.first_name ? (
        <div>{formik.errors.first_name}</div>
      ) : null} */}
      </div>
      <label htmlFor="middle_name">middle_name</label>
      <input
        id="middle_name"
        name="middle_name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.middle_name}
        className="border border-black"
      />
      <label htmlFor="assignee">last_name</label>
      <input
        id="last_name"
        name="last_name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.last_name}
        className="border border-black"
      />
      {/* {formik.touched.last_name && formik.errors.last_name? (
        <div>{formik.errors.last_name}</div>
      ) : null} */}
      <label htmlFor="email">email</label>
      <input
        id="email"
        name="email"
        type="text"
        defaultValue={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="border border-black"
      />
      {/* {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null} */}
      <label htmlFor="password">password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className="border border-black"
      />
      <label htmlFor="date_of_birth">date_of_birth</label>
      <input
        id="date_of_birth"
        name="date_of_birth"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.date_of_birth}
        className="border border-black"
      />
      <label htmlFor="date_of_joining">date_of_joining</label>
      <input
        id="date_of_joining"
        name="date_of_joining"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.date_of_joining}
        className="border border-black"
      />
      {/* <label htmlFor="password">password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className="border border-black"
      /> */}
      <label htmlFor="designation">designation</label>
      <input
        id="designation"
        name="designation"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.designation}
        className="border border-black"
      />
      <label htmlFor="hired_location">hired_location</label>
      <input
        id="hired_location"
        name="hired_location"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.hired_location}
        className="border border-black"
      />
      <label htmlFor="proof_id">proof_id</label>
      <input
        id="proof_id"
        name="proof_id"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.proof_id}
        className="border border-black"
      />
      <label htmlFor="residential_address">residential_address</label>
      <input
        id="residential_address"
        name="residential_address"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.residential_address}
        className="border border-black"
      />
      <label htmlFor="salary">salary</label>
      <input
        id="salary"
        name="salary"
        type="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.salary}
        className="border border-black"
      />
      <label htmlFor="work_status">work_status</label>
      <input
        id="work_status"
        name="work_status"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.work_status}
        className="border border-black"
      />
      <label htmlFor="years_of_experience">years_of_experience</label>
      <input
        id="years_of_experience"
        name="years_of_experience"
        type="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.years_of_experience}
        className="border border-black"
      />
      <button
        type="submit"
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateEmployee;
