import "./App.css";
import React from "react";
import { Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Medicinal from "./pages/Medicinal";
import DiseaseGroup from "./pages/DiseaseGroup";
import MedicinalDetail from "./pages/DetailMedicinal";
import MedicinalWithDisease from "./pages/MedicinalWithDisease";
import Admin from "./pages/Admin";
import Signup from "./pages/SignUp";
import Signin from "./pages/SignIn";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ManagerTree from "./components/ManagerTree";
import Dasboard from "./components/Dasboard";
import User from "./components/User";
import NewsFeed from "./pages/NewsFeed";
import DetailsFeed from "./pages/DetailsFeed";
import AdminFeed from "./components/AdminFeed";
import AdminReject from "./components/AdminReject";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header />
          <Layout.Content style={{ flex: "1 0 auto" }}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/news" element={<NewsFeed />} />
              <Route exact path="/news/:id" element={<DetailsFeed />} />
              <Route exact path="/list" element={<Medicinal />} />
              <Route exact path="/disease" element={<DiseaseGroup />} />
              <Route
                exact
                path="/medicinal/:id"
                element={<MedicinalDetail />}
              />
              <Route
                exact
                path="/medicinalwithdisease/:id"
                element={<MedicinalWithDisease />}
              />
              <Route exact path="/admin" element={<Dasboard />}>
                <Route path="tree" element={<ManagerTree />} />
                <Route path="add-tree" element={<Admin />} />
                <Route path="user" element={<User />} />
                <Route path="feeds" element={<AdminFeed />} />
                <Route path="feeds-reject" element={<AdminReject />} />
              </Route>
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Signin />} />
            </Routes>
          </Layout.Content>
          <Footer />
        </Layout>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
