import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IUser from "../interfaces/User";
import { queryRequest } from "../services/axiosWrapper";
import { IPayroll } from "../interfaces/Payroll";
import { log } from "console";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridColTypeDef } from "@mui/x-data-grid";
import storage from "../utility/storage";

interface IProps {
  user_id?: string;
}
const UserAccount = (props: IProps) => {
  // const { user_id } = prpos;
  const id = props.user_id;
  const token = storage.getToken();
  const object = JSON.parse(atob(token.split(".")[1]));
  // console.log(object);
  const role_id = object.role_id;
  const curr_user_id = object.id;
  // console.log(token);
  const [user, setUser] = useState<IUser>();
  const [payroll, setPayroll] = useState<IPayroll[]>();

  const column = [
    // {field: "user_id", headerName: "Id", width: 90 },
    { field: "salary", headerName: "Salary", width: 90 },
    {
      field: "net_pay_salary",
      headerName: "Net Salary",
      width: 150,
      editable: true,
    },
    { field: "pay_date", headerName: "Pay Date", width: 150, editable: true },
  ];

  const fetechpayroll = async () => {
    try {
      const data = await queryRequest("/getPayroll");
      setPayroll(data.data);
      // console.log("payroll",data.data)
      // console.log(payroll);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("id", id);

  let rows = [];

  // rows.forEach((row, index) => {
  //   row.serialNumber = index + 1; // Add 1 to index to start from 1 instead of 0
  // });
  if (payroll) {
    rows = payroll?.filter((item) => item.id === id);
  } else {
    rows = [{ id: "", salary: 0, net_pay_salary: 0, pay_date: "" }];
  }
  const modifiedRows = rows.map((row, index) => {
    // Modify the "salary" column (or any other existing column) as needed
    const modifiedDate = row.pay_date
      .toString()
      .split("T")[0]; /* your modification logic here */

    // Assign a unique ID to each row
    const id = `row_${index}`;

    // Return the modified row with the unique ID
    return { ...row, pay_date: modifiedDate, id };
  });

  // const rows=payroll?.filter((item) => item.id === id)
  console.log(rows);

  useEffect(() => {
    if (id) {
      queryRequest(`/getEmployeeByID?id=${id}`)
        .then((data) => setUser(data.data))
        .catch((error) => alert(error));
    }

    fetechpayroll();
  }, [id]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Welcome, User
              </Typography>
              <Typography gutterBottom>
                Name: {user?.first_name} {user?.middle_name} {user?.last_name}
              </Typography>
              <Typography gutterBottom>Email: {user?.email}</Typography>
              <Typography gutterBottom>
                Designation: {user?.designation}
              </Typography>
              <Typography gutterBottom>
                DOB: {user?.date_of_birth?.toString().split("T")[0]}
              </Typography>
              <Typography gutterBottom>
                Joining Date: {user?.date_of_joining?.toString().split("T")[0]}
              </Typography>
              <Typography gutterBottom>
                Location: {user?.hired_location}
              </Typography>
              <Typography gutterBottom>
                Address: {user?.residential_address}
              </Typography>
              {role_id === 1 || curr_user_id === id ? (
                <Typography gutterBottom>Salary: {user?.salary}</Typography>
              ) : (
                <></>
              )}
              <Typography gutterBottom>Status: {user?.work_status}</Typography>
              <Typography gutterBottom>
                Experience: {user?.years_of_experience}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {role_id === 1 || curr_user_id === id ? (
          <Grid item xs={12} md={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Payroll
                </Typography>
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={modifiedRows}
                    columns={column}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    // checkboxSelection
                    disableRowSelectionOnClick
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </div>
  );
};

export default UserAccount;
