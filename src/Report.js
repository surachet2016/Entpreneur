import React, { useContext } from "react";
import { AppContext } from "./Context";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Report() {
  const { users, userLength } = useContext(AppContext);

  // Function to count the occurrences of each TypeEnt in each Amphur
  const getCountByTypeEntAndAmphur = () => {
    const countMap = {};

    users.forEach((user) => {
      const key = `${user.amphur}-${user.typeEnt}`;

      if (countMap[key]) {
        countMap[key].count++;
      } else {
        countMap[key] = {
          amphur: user.amphur,
          typeEnt: user.typeEnt,
          count: 1,
        };
      }
    });

    return countMap;
  };
  

  const countByTypeEntAndAmphur = getCountByTypeEntAndAmphur();

  // Function to calculate the total count of each typeEnt
  const getTotalByTypeEnt = () => {
    const totalMap = {};

    users.forEach((user) => {
      const typeEnt = user.typeEnt;

      if (totalMap[typeEnt]) {
        totalMap[typeEnt]++;
      } else {
        totalMap[typeEnt] = 1;
      }
    });

    return totalMap;
  };
  const totalByTypeEnt = getTotalByTypeEnt();

  return (
    <>
      <br />
      <Container fluid>
        <Row>
          <Col>
            <h2>ตารางสรุปผลข้อมูลจำนวนผู้ประกอบการ</h2>
          </Col>
        </Row>
      </Container>

      {userLength === null ? (
        <p>Loading...</p>
      ) : userLength === 0 ? (
        <p>No users found. Please insert some users.</p>
      ) : (
        <Container fluid>
          <Row>
            <Col>
              <Table responsive striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>อำเภอ</th>
                    <th>ประเภทผู้ประกอบการ</th>
                    <th>จำนวน(ราย)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(countByTypeEntAndAmphur).map(
                    ({ amphur, typeEnt, count }, index) => (
                      <tr key={index}>
                        <td>{amphur}</td>
                        <td>{typeEnt}</td>
                        <td>{count}</td>
                      </tr>
                    )
                  )}

                   {/* Total row */}
                   <tr>
                    <td colSpan="2">Total</td>
                    <td>
                      {Object.values(totalByTypeEnt).reduce(
                        (total, count) => total + count,
                        0
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Report;
