import './App.css';
import UserTable from "./getUsers/getUsers"
import AddUser from "./addUser/addUser"
import UpdateUser from "./updateUser/updateUser"
import {RouterProvider, createBrowserRouter} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserTable />
    },
    {
      path: "/add-user",
      element: <AddUser />
    },
    {
      path: "/update-user/:id",
      element: <UpdateUser />
    },
  ]);
  return (
    <div className="App">
      <div className="sidebar">
      </div>
      <RouterProvider router = {router}></RouterProvider>
    </div>
  );
}

export default App;
