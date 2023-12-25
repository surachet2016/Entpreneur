import React, { useContext, useState } from "react";
import { AppContext } from "../Context";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { users, userLength, cancelEdit, updateUser, deleteUser } =
    useContext(AppContext);

  const navigate = useNavigate();
  const [newData, setNewData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  let recordNumber = 1;

  const saveBtn = async () => {
    try {
      await updateUser(newData);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (
    id,
    preName,
    firstName,
    lastName,
    company,
    homeNo,
    soilNo,
    street,
    moo,
    tombol,
    amphur,
    province,
    zipCode,
    tel,
    lat_ti,
    long_ti,
    typeEnt
  ) => {
    setNewData({
      id,
      preName,
      firstName,
      lastName,
      company,
      homeNo,
      soilNo,
      street,
      moo,
      tombol,
      amphur,
      province,
      zipCode,
      tel,
      lat_ti,
      long_ti,
      typeEnt,
    });
    // editMode(id);
    navigate("/MyFormEdit/" + id);
  };

  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteUser(id);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.preName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.soilNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.amphur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.tombol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.tel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lat_ti.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.long_ti.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.typeEnt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return !userLength ? (
    <p>{userLength === null ? "Loading..." : "Please insert some users."}</p>
  ) : (
    <>
    <br />
    <Container fluid>
      <Row>
        <Col>
          <Form.Group controlId="formGridSerach">
            <Form.Label>ค้นหา</Form.Label>
            <Form.Control
              type="search"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      </Container>
      <br />
      <Container fluid>
      <Row>
        <Col>
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ลำดับที่</th>
                <th>คำนำหน้านาม</th>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>บริษัท/ร้าน</th>
                <th>บ้านเลขที่</th>
                <th>ซอย</th>
                <th>ถนน</th>
                <th>หมู่</th>
                <th>ตำบล</th>
                <th>อำเภอ</th>
                <th>จังหวัด</th>
                <th>รหัสไปรษณีย์</th>
                <th>โทรศัพท์</th>
                <th>ละติจูด</th>
                <th>ลองติจูด</th>
                <th>ผู้ประกอบการ</th>
                <th>แก้ไข/ลบ</th>
                <th>แผนที่</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(
                ({
                  id,
                  preName,
                  firstName,
                  lastName,
                  company,
                  homeNo,
                  soilNo,
                  street,
                  moo,
                  tombol,
                  amphur,
                  province,
                  zipCode,
                  tel,
                  lat_ti,
                  long_ti,
                  typeEnt,
                  isEditing,
                }) => {
                  return isEditing === true ? (
                    <tr key={id}>
                      <td>{recordNumber++}</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={preName}
                          onChange={(e) => updateNewData(e, "preName")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={firstName}
                          onChange={(e) => updateNewData(e, "firstName")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={lastName}
                          onChange={(e) => updateNewData(e, "lastName")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={company}
                          onChange={(e) => updateNewData(e, "company")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={homeNo}
                          onChange={(e) => updateNewData(e, "homeNo")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={soilNo}
                          onChange={(e) => updateNewData(e, "soilNo")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={street}
                          onChange={(e) => updateNewData(e, "street")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={moo}
                          onChange={(e) => updateNewData(e, "moo")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={tombol}
                          onChange={(e) => updateNewData(e, "tombol")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={amphur}
                          onChange={(e) => updateNewData(e, "amphur")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={province}
                          onChange={(e) => updateNewData(e, "province")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={zipCode}
                          onChange={(e) => updateNewData(e, "zipCode")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={tel}
                          onChange={(e) => updateNewData(e, "tel")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={lat_ti}
                          onChange={(e) => updateNewData(e, "lat_ti")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={long_ti}
                          onChange={(e) => updateNewData(e, "long_ti")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={typeEnt}
                          onChange={(e) => updateNewData(e, "typeEnt")}
                        />
                      </td>
                      <td>
                        <button
                          className="btn green-btn"
                          onClick={() => saveBtn()}
                        >
                          <SaveIcon fontSize="small" color="success" />
                        </button>
                        <button
                          className="btn default-btn"
                          onClick={() => cancelEdit(id)}
                        >
                          <CancelIcon fontSize="small" color="primary" />
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={id}>
                      <td>{recordNumber++}</td>
                      <td>{preName}</td>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>{company}</td>
                      <td>{homeNo}</td>
                      <td>{soilNo}</td>
                      <td>{street}</td>
                      <td>{moo}</td>
                      <td>{tombol}</td>
                      <td>{amphur}</td>
                      <td>{province}</td>
                      <td>{zipCode}</td>
                      <td>{tel}</td>
                      <td>{lat_ti}</td>
                      <td>{long_ti}</td>
                      <td>{typeEnt}</td>
                      <td>
                        <button
                          className="btn default-btn"
                          onClick={() =>
                            enableEdit(
                              id,
                              preName,
                              firstName,
                              lastName,
                              company,
                              homeNo,
                              soilNo,
                              street,
                              moo,
                              tombol,
                              amphur,
                              province,
                              zipCode,
                              tel,
                              lat_ti,
                              long_ti,
                              typeEnt
                            )
                          }
                        >
                          <EditIcon fontSize="small" color="success" />
                        </button>
                        <button
                          className="btn red-btn"
                          onClick={() => deleteConfirm(id)}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </button>
                      </td>
                      <td>
                        <a
                          href={`https://www.google.com/maps?q=${lat_ti},${long_ti}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LocationOnIcon fontSize="large" color="warning" />
                        </a>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      </Container>
    </>
  );
};

export default UserList;
