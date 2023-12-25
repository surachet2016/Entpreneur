import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Welcom() {
  const location = useLocation();
  const userEmailFromState = location.state ? location.state.userEmail : null;

  // Use state to hold the userEmail value
  const [userEmail, setUserEmail] = useState(userEmailFromState);

  // Save userEmail to localStorage when the component mounts or userEmail changes
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    }
  }, [userEmail]);

  // Retrieve userEmail from localStorage when the component mounts
  useEffect(() => {
    const userEmailFromLocalStorage = localStorage.getItem('userEmail');
    if (userEmailFromLocalStorage) {
      setUserEmail(userEmailFromLocalStorage);
    }
  }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

  return (
    <>
      <h2>Welcome</h2>
      <div>{userEmail}</div>
    </>
  );
}

export default Welcom;
