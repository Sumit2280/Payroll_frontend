import { useNavigate } from "react-router-dom";
import { createEmployee, queryRequest } from "../services/axiosWrapper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import storage from "../utility/storage";
import { useEffect, useState } from "react";
import IUser from "../interfaces/User";

const UpdateEmployee = () => {
  const [user, setUser] = useState<IUser[]>([]);
  const token = storage.getToken();
  const object = JSON.parse(atob(token.split(".")[1]));

  // console.log(object);
  // const role_id = object.role_id;
  const curr_user_id = object.id;

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

  const createuser = async (values: {}) => {
    try {
      console.log("in try");
      await createEmployee(values);
      navigate(`/account/${curr_user_id}`);
    } catch (error) {
      console.log("in catch");
      console.log(error);
    }
  };

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
    validationSchema: Yup.object({
      id: Yup.string().required("ID is required"),
      role_id: Yup.number().required("Role ID is required"),
      first_name: Yup.string().required("First Name is required"),
      middle_name: Yup.string(),
      last_name: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      date_of_birth: Yup.date().required("Date of Birth is required"),
      date_of_joining: Yup.date().required("Date of Joining is required"),
      designation: Yup.string().required("Designation is required"),
      proof_id: Yup.string().required("Proof ID is required"),
      hired_location: Yup.string().required("Hired Location is required"),
      residential_address: Yup.string().required(
        "Residential Address is required"
      ),
      work_status: Yup.string().required("Work Status is required"),
      salary: Yup.number().required("Salary is required"),
      years_of_experience: Yup.number().required(
        "Years of Experience is required"
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
      // createuser(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ margin: "20px" }}>
        <Grid container columnSpacing={3} rowSpacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              error={formik.touched.id && Boolean(formik.errors.id)}
              select
              id="id"
              name="id"
              type="text"
              label="ID"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.id}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.id && formik.errors.id ? formik.errors.id : ""
              }
            >
              {user.map((item)=>(
                <MenuItem key={item.id} value={item.id}>{item.id}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={formik.touched.role_id && Boolean(formik.errors.role_id)}
              select
              id="role_id"
              name="role_id"
              type="number"
              label="Role ID"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role_id}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.role_id && formik.errors.role_id
                  ? formik.errors.role_id
                  : ""
              }
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>

            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              id="first_name"
              name="first_name"
              type="text"
              label="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.first_name && formik.errors.first_name
                  ? formik.errors.first_name
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={
                formik.touched.middle_name && Boolean(formik.errors.middle_name)
              }
              id="middle_name"
              name="middle_name"
              type="text"
              label="Middle Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.middle_name}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.middle_name && formik.errors.middle_name
                  ? formik.errors.middle_name
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              id="last_name"
              name="last_name"
              type="text"
              label="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.last_name && formik.errors.last_name
                  ? formik.errors.last_name
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={formik.touched.email && Boolean(formik.errors.email)}
              id="email"
              name="email"
              type="text"
              label="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={formik.touched.password && Boolean(formik.errors.password)}
              id="password"
              name="password"
              type="password"
              label="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={
                formik.touched.date_of_birth &&
                Boolean(formik.errors.date_of_birth)
              }
              id="date_of_birth"
              name="date_of_birth"
              type="text"
              label="Date of Birth"
              InputLabelProps={{ shrink: true }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date_of_birth}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.date_of_birth && formik.errors.date_of_birth
                  ? formik.errors.date_of_birth
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={
                formik.touched.date_of_joining &&
                Boolean(formik.errors.date_of_joining)
              }
              id="date_of_joining"
              name="date_of_joining"
              type="text"
              label="Date of Joining"
              InputLabelProps={{ shrink: true }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date_of_joining}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.date_of_joining && formik.errors.date_of_joining
                  ? formik.errors.date_of_joining
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={
                formik.touched.designation && Boolean(formik.errors.designation)
              }
              id="designation"
              name="designation"
              type="text"
              label="Designation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.designation}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.designation && formik.errors.designation
                  ? formik.errors.designation
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={formik.touched.proof_id && Boolean(formik.errors.proof_id)}
              id="proof_id"
              name="proof_id"
              type="text"
              label="Proof ID"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.proof_id}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.proof_id && formik.errors.proof_id
                  ? formik.errors.proof_id
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={
                formik.touched.hired_location &&
                Boolean(formik.errors.hired_location)
              }
              id="hired_location"
              name="hired_location"
              type="text"
              label="Hired Location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hired_location}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.hired_location && formik.errors.hired_location
                  ? formik.errors.hired_location
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={
                formik.touched.residential_address &&
                Boolean(formik.errors.residential_address)
              }
              id="residential_address"
              name="residential_address"
              type="text"
              label="Residential Address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.residential_address}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.residential_address &&
                formik.errors.residential_address
                  ? formik.errors.residential_address
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={
                formik.touched.work_status && Boolean(formik.errors.work_status)
              }
              id="work_status"
              name="work_status"
              type="text"
              label="Work Status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.work_status}
              fullWidth
              className="border border-black"
              helperText={
                formik.touched.work_status && formik.errors.work_status
                  ? formik.errors.work_status
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Grid
              container
              columnSpacing={3}
              rowSpacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={4}>
                <TextField
                  error={formik.touched.salary && Boolean(formik.errors.salary)}
                  id="salary"
                  name="salary"
                  type="number"
                  label="Salary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.salary}
                  fullWidth
                  className="border border-black"
                  helperText={
                    formik.touched.salary && formik.errors.salary
                      ? formik.errors.salary
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  error={
                    formik.touched.years_of_experience &&
                    Boolean(formik.errors.years_of_experience)
                  }
                  id="years_of_experience"
                  name="years_of_experience"
                  type="number"
                  label="Years of Experience"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.years_of_experience}
                  fullWidth
                  className="border border-black"
                  helperText={
                    formik.touched.years_of_experience &&
                    formik.errors.years_of_experience
                      ? formik.errors.years_of_experience
                      : ""
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
      {/* <button
        type="submit"
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Submit
      </button> */}
    </form>
  );
};

export default UpdateEmployee;
