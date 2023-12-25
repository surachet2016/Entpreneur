import React, { useContext, useState } from "react";
import { AppContext } from "../Context";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const { users, userLength, cancelEdit, updateUser, deleteUser } =
    useContext(AppContext);

  const navigate = useNavigate();
  const [newData, setNewData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const recordNumber = (currentPage - 1) * usersPerPage;

  const saveBtn = async () => {
    try {
      await updateUser(newData);

      // Perform any additional actions after the update is complete, such as resetting state or updating UI
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

  return !userLength ? (
    <p>{userLength === null ? "Loading..." : "Please insert some users."}</p>
  ) : (
    <>
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
                {currentUsers.map(
                  (
                    {
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
                    },
                    index
                  ) => {
                    const currentRecordNumber = recordNumber + index + 1;
                    return isEditing === true ? (
                      <tr key={id}>
                        <td>{currentRecordNumber}</td>
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
                        <td>{currentRecordNumber}</td>
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
                            className="p-2"
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
      <Container fluid>
        <Row>
          <Col>
            <Pagination>
              {Array.from({
                length: Math.ceil(users.length / usersPerPage),
              }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserPage;
