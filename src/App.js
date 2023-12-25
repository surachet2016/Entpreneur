import React, { useState } from "react";
import { Provider } from "./Context";
import UserList from "./components/UserList";
import { Actions } from "./Actions";
import Home from "./Home";
import Welcom from "./Welcom";
import Report from "./Report";
import UserPage from "./components/UserPage";
import MyFormEdit from "./MyFormEdit";
import "bootstrap/dist/css/bootstrap.min.css";
import MyForm from "./MyForm";
import Logout from "./Logout";
// import Register from "./Register";  //ปิดไว้ไม่ให้ใช้งาน ถ้าต้องการใช้ค่อยเปิด
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

function App() {
  const data = Actions();
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <div className="font-container  text-center">
        <Provider value={data}>
          <Router>
            <Navbar expand="sm" className="bg-body-tertiary">
              <Container>
                <img
                  src="logo.png"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                  alt="my-logo"
                />
                <Navbar.Brand
                  className="p-2"
                  href="https://www.google.com/maps?q=37.7749,-122.4194"
                  target="_blank"
                ></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Link
                      to="/"
                      className="p-1 text-left text-primary text-decoration-none "
                    >
                      หน้าหลัก
                    </Link>
                    <Link
                      to="/MyForm"
                      className="p-1 text-primary text-decoration-none"
                    >
                      เพิ่มข้อมูลผู้ประกอบการ
                    </Link>
                    <Link
                      to="/UserList"
                      className="p-1 text-primary text-decoration-none"
                    >
                      ค้นหาข้อมูลผู้ประกอบการ
                    </Link>

                    <Link
                      to="/UserPage"
                      className="p-1 text-primary text-decoration-none"
                    >
                      แสดงข้อมูลผู้ประกอบการ
                    </Link>
                    <Link
                      to="/Report"
                      className="p-1 text-primary text-decoration-none"
                    >
                      รายงานข้อมูลผู้ประกอบการ
                    </Link>
                    {/* <Link
                      to="/Register"
                      className="text-primary text-decoration-none"
                    >
                      สมัครสมาชิก
                    </Link> */}
                    <Link
                      to="/Logout"
                      className="p-1 text-primary text-decoration-none"
                    >
                      ออกจากระบบ
                    </Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <div>
              <Routes>
                <Route
                  path="/"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/Welcom" />
                    ) : (
                      <Home setLoggedIn={setLoggedIn} />
                    )
                  }
                />

                <Route
                  path="/MyForm"
                  element={isLoggedIn ? <MyForm /> : <Navigate to="/" />}
                />
                <Route
                  path="/Welcom"
                  element={isLoggedIn ? <Welcom /> : <Navigate to="/" />}
                />
                <Route
                  path="/MyFormEdit/:id"
                  element={isLoggedIn ? <MyFormEdit /> : <Navigate to="/" />}
                />
                <Route
                  path="/UserList"
                  element={isLoggedIn ? <UserList /> : <Navigate to="/" />}
                />
                <Route
                  path="/UserPage"
                  element={isLoggedIn ? <UserPage /> : <Navigate to="/" />}
                />
                <Route
                  path="/Report"
                  element={isLoggedIn ? <Report /> : <Navigate to="/" />}
                />
                <Route
                  path="/Logout"
                  element={<Logout setLoggedIn={setLoggedIn} />}
                />
                {/* <Route
                  path="/Register"
                  element={<Register setLoggedIn={setLoggedIn} />}
                /> */}
              </Routes>
            </div>
            <div>
              <div className="font-container bg-body-tertiary text-center mt-4 p-4 gfg">
                <div> @Copyright 2023 vfkolok.com</div>
              </div>
            </div>
          </Router>
        </Provider>
      </div>
    </>
  );
}

export default App;
