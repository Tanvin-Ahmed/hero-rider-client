import { Route, Routes } from "react-router-dom";
import NavBar from "../components/shared/NavBar";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

const Routers = () => {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="profile/:id"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default Routers;
