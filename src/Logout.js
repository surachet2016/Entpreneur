import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';

const Logout = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logic for logging out, such as clearing authentication tokens, etc.
    // Replace the following line with your actual logout logic.

    // For demonstration purposes, let's assume clearing tokens and updating the isLoggedIn state.
    // clearTokens();
    setLoggedIn(false);

    // Navigate to the login page
    navigate("/");
  };

  return (
    <div>
      <h1>Logout</h1>
      <Button onClick={handleLogout} variant="primary">Logout</Button>{' '}
     
    </div>
  );
};
Logout.propTypes = {
  setLoggedIn: PropTypes.bool
}
export default Logout;
