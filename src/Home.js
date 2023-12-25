import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";

const Home = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Check if email or password is empty
    if (!loginEmail || !loginPassword) {
      alert("Please fill in both email and password.");
      return;
    }

    try {
      const response = await fetch("localhost/api_user/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setLoggedIn(true);
        navigate("/Welcom", { state: { userEmail: loginEmail } });
      } else {
        alert("Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="gfg font-container pt-4 mt-4">
      <h3>
        ระบบฐานข้อมูลผู้ประกอบการ ผักและผลไม้ อำเภอสุไหงโกลก จังหวัดนราธิวาส
      </h3>
      <Form
        className="insertForm mt-4 pt-4 font-container gfg"
        
        onSubmit={handleLogin}
      >
        <Form.Group controlId="formGridEmail">
          <Row>
          <Col sm={4}></Col>
            <Col sm={4}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
               <Col sm={4}></Col>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="formGridPassword">
          <Row>
          <Col sm={4}></Col>
            <Col sm={4}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </Col>
            <Col sm={4}></Col>
          </Row>
        </Form.Group>
        <Row>
        <Col sm={4}></Col>
         <Col sm={4}>
        <Button  type="submit"  variant="primary">Login</Button>{" "}
        </Col>
        <Col sm={4}></Col>
        </Row>
      
      </Form>
    </div>
  );
};
Home.propTypes = {
  setLoggedIn: PropTypes.bool,
};
export default Home;
