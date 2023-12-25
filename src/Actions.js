import { useEffect, useState } from "react";

export const Actions = () => {
  let [users, setUsers] = useState([]);

  //userLength is for showing the Data Loading message.
  let [userLength, setUserLength] = useState(null);

  useEffect(() => {
    fetch("https://vfkolok.com/entrepreneur1/all_users.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(data.users.reverse());
          setUserLength(true);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // fetch users
  const getUsers = () => {
    fetch("https://vfkolok.com/entrepreneur1/all_users.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(data.users.reverse());
          setUserLength(true);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Inserting a new user into the database.
  const insertUser = async (newUser) => {
    return fetch("https://vfkolok.com/entrepreneur1/add_users.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed user.
  const editMode = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = true;
        return user;
      }
      user.isEditing = false;
      return user;
    });
    setUsers(users);
  };

  // Cancel the edit mode.
  const cancelEdit = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = false;
        return user;
      }
      return user;
    });
    setUsers(users);
  };

  // Updating a user.
  const updateUser = (userData) => {
    fetch("https://vfkolok.com/entrepreneur1/update_users.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          users = users.map((user) => {
            if (user.id === userData.id) {
              user.isEditing = false;

              user.preName = userData.preName;
              user.firstName = userData.firstName;
              user.lastName = userData.lastName;
              user.company = userData.company;
              user.homeNo = userData.homeNo;
              user.soilNo = userData.soilNo;
              user.street = userData.street;
              user.moo = userData.moo;
              user.tombol = userData.tombol;
              user.amphur = userData.amphur;
              user.province = userData.province;
              user.zipCode = userData.zipCode;
              user.tel = userData.tel;
              user.lat_ti = userData.lat_ti;
              user.long_ti = userData.long_ti;
              user.typeEnt = userData.typeEnt;
              return user;
            }
            return user;
          });
          setUsers(users);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a user.
  const deleteUser = (theID) => {
    // filter outing the user.
    let userDeleted = users.filter((user) => {
      return user.id !== theID;
    });
    fetch("https://vfkolok.com/entrepreneur1/delete_users.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(userDeleted);
          if (users.length === 1) {
            setUserLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    users,
    editMode,
    cancelEdit,
    updateUser,
    insertUser,
    deleteUser,
    userLength,
    getUsers,
  };
};
