import './App.css'
import Layout from "./Components/Layout/Layout.jsx";
import { Route, Routes } from "react-router-dom";
import Login from "./Containers/Login/Login.jsx";
import ProtectedRoute from "./Components/ProtactedRoute/ProtactedRoute.jsx";
import {useAppSelector} from "./app/hooks.js";
import {selectUser} from "./features/user/userSlice.js";
import {Typography} from "@mui/material";
import Efficiency from "./Containers/Efficiency/Efficiency.jsx";

const App = ()=> {

    const user = useAppSelector(selectUser);

  return (
    <>
      <Layout>
          <Routes>
              <Route
                  path='/sign-in'
                  element={
                      <>
                        <Login></Login>
                      </>
                  }
              />
              <Route
                  path='/'
                  element={
                      <>
                          <ProtectedRoute isAllowed={user}>
                            <Efficiency></Efficiency>
                          </ProtectedRoute>
                      </>
                  }
              />
              <Route
                  path='*'
                  element={
                      <Typography
                          variant={"h1"}
                          sx={{
                              textAlign: "center",
                              margin: "20px 0",
                          }}
                      >
                          Not found
                      </Typography>
                  }
              />
          </Routes>
      </Layout>
    </>
  )
}

export default App
