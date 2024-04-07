import { ChangeEvent, useEffect, useMemo, useState } from "react";
import dp from "../images/dp.jpg";
import {
  createPayroll,
  deleteEmployee,
  queryRequest,
} from "../services/axiosWrapper";
import IUser from "../interfaces/User";
import {
  Card,
  CardActions,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import UserAccount from "./UserAccount";
import CombinedAppBar from "./CombinedAppBar";
import storage from "../utility/storage";
// import TransitionsModal from "./Modtry";
// import Modtry from "./Modtry";
// import { Modal } from "antd";
// import UserAccount from "./UserAccount";

interface Iprops {
  searchKey: string;
}

const ListUsers = (props: Iprops) => {
  const { searchKey } = props;
  const [user, setUser] = useState<IUser[]>([]);
  const navigate = useNavigate();
  // const [searchKey, setSearchKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const token = storage.getToken();
  const object = JSON.parse(atob(token.split(".")[1]));
  // console.log(object);
  const role_id = object.role_id;
  const curr_user_id = object.id;
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSearchKey(e.target.value);
  //   console.log("key", searchKey);
  // };

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

  const visibleUsers: IUser[] = useMemo(() => {
    return user.filter((item) => item.email.includes(searchKey));
  }, [user, searchKey]);

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

  const createEmployeePayroll = async (key: string) => {
    console.log(key);
    try {
      await createPayroll({ id: key });
      // console.log(data);
      console.log("Created payroll Successfully");
    } catch (error) {
      console.log("in catch");
      console.log(error);
    }
  };

  console.log(user);

  return (
    <div>
      {/* <CombinedAppBar/> */}
      <Box sx={{ marginLeft: "100px", marginTop: "50px" }}>
        {/* <Modtry/> */}
        <Grid container rowSpacing={3} columnSpacing={0}>
          {visibleUsers.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card sx={{ maxWidth: 345, marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "10px",
                  }}
                >
                  {/* Your dropdown button code goes here */}
                </div>
                <CardActions
                  style={{ justifyContent: "center" }}
                  onClick={() => {
                    setUserId(item.id);
                    showModal();
                    // TransitionsModal()
                    // <Modtry/>
                    // navigate(`/userAccount/${item.id}`);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row ",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={dp}
                        alt="no dp"
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </div>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column ",
                        alignItems: "flex-start",
                        paddingLeft: "20px",
                        marginTop: "0px",
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ mt: 2, mb: 1, marginTop: "0px" }}
                      >
                        {item.first_name} {item.last_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.email}
                      </Typography>
                    </Box>
                  </Box>
                </CardActions>
                {role_id === 1 ? (
                  <CardActions style={{ justifyContent: "center" }}>
                    <Button
                      onClick={() => createEmployeePayroll(item.id)}
                      // variant="outlined"
                      color="primary"
                    >
                      Create Payroll
                    </Button>
                    <Button
                      // onClick={() => createEmployeePayroll(item.id)}
                      // variant="outlined"
                      color="primary"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => deleteUser(item.id)}
                      // variant="contained"
                      color="primary"
                      // sx={{ mr: 2 }}
                      sx={{ mr: 2, color: "red" }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                ) : (
                  <></>
                )}
              </Card>
            </Grid>
          ))}
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <UserAccount user_id={userId} />
          </Modal>
        </Grid>
      </Box>
    </div>
  );
};
export default ListUsers;
// export function handleSearch(){}
