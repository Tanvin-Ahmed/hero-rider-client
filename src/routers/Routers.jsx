import { Route, Routes } from "react-router-dom";
import NavBar from "../components/shared/NavBar";
import Admin from "../pages/Admin";
import Authentication from "../pages/Authentication";
import Home from "../pages/Home";
import Packages from "../pages/Packages";
import PageNotFound from "../pages/PageNotFound";
import Payment from "../pages/Payment";
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
          path="/login"
          element={
            <Layout>
              <Authentication />
            </Layout>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="admin"
          element={
            <PrivateRoute>
              <Layout>
                <Admin />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="packages">
          <Route
            index
            element={
              <PrivateRoute>
                <Layout>
                  <Packages />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="single/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <Payment />
                </Layout>
              </PrivateRoute>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Routers;
