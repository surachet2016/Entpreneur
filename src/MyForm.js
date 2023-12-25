import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./Context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const MyForm = () => {
  const { insertUser, getUsers } = useContext(AppContext);


  const [newUser, setNewUser] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);

  useEffect(() => {
    (async () => {
      let rsp = await fetch("/json/thai_provinces.json").then((res) =>
        res.json()
      );
      setProvinces(rsp.RECORDS);
    })();
  }, []);
  const selectProvinces = async (e) => {
    let province = provinces.find((p) => p.name_th === e.target.value);
    let rsp = await fetch("/json/thai_amphures.json").then((res) => res.json());
    let amps = rsp.RECORDS.filter((r) => r.province_id === province.id);
    setAmphures(amps);
    setNewUser({
      ...newUser,
      province: province.name_th,
    });
  };

  const selectAmphures = async (e) => {
    let amphur = amphures.find((p) => p.name_th === e.target.value);
    let rsp = await fetch("/json/thai_tambons.json").then((res) => res.json());
    let tams = rsp.RECORDS.filter((r) => r.amphure_id === amphur.id);
    setTambons(tams);
    setNewUser({
      ...newUser,
      amphur: amphur.name_th,
    });
  };

  const selectTambons = async (e) => {
    let tamb = tambons.find((p) => p.name_th === e.target.value);
    setNewUser({
      ...newUser,
      tombol: tamb.name_th,
      zipCode: tamb.zip_code,
    });
  };

  // Storing the Insert User Form Data.
  const addNewUser = (e, field) => {
    const value = e.target.value;
    setNewUser({
      ...newUser,
      [field]: value,
    });
  };

  // Submit to the Database.
  const submitUser = async (e) => {
    e.preventDefault();
    await insertUser(newUser);
    // Reset the form
    e.target.reset();
    setNewUser({});
    await getUsers();
  };

  return (
    <div>
      <Form
        className="insertForm mt-4 pt-4 font-container gfg"
        onSubmit={submitUser}
      >
        <h3>เพิ่มข้อมูลผู้ประกอบการ</h3>
       

        <Form.Group as={Col} controlId="formGridPreName">
          <Form.Label>คำนำหน้านาม</Form.Label>
          <Form.Select
            onChange={(e) => addNewUser(e, "preName")}
            autoComplete="off"
            required
          >
            <option value="">เลือกคำนำหน้านาม</option>
            <option value="นาย">นาย</option>
            <option value="นางสาว">นางสาว</option>
            <option value="นาง">นาง</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>ชื่อ</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => addNewUser(e, "firstName")}
            placeholder="ชื่อ"
            autoComplete="off"
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridLastname">
          <Form.Label>นามสกุล</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => addNewUser(e, "lastName")}
            placeholder="นามสกุล"
            autoComplete="off"
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCompane">
          <Form.Label>บริษัท/ร้าน</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => addNewUser(e, "company")}
            placeholder="บริษัท/ร้าน"
            autoComplete="off"
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridHome">
          <Form.Label>บ้านเลขที่</Form.Label>
          <Form.Control
            type="text"
            id="homeNo"
            onChange={(e) => addNewUser(e, "homeNo")}
            placeholder="บ้านเลขที่"
            autoComplete="off"
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formSoil">
          <Form.Label>ซอย</Form.Label>
          <Form.Control
            type="text"
            id="soilNo"
            onChange={(e) => addNewUser(e, "soilNo")}
            placeholder="ซอย"
            autoComplete="off"
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formStreet">
          <Form.Label>ถนน</Form.Label>
          <Form.Control
            type="text"
            id="street"
            onChange={(e) => addNewUser(e, "street")}
            placeholder="ถนน"
            autoComplete="off"
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridHome">
          <Form.Label>หมู่ที่</Form.Label>
          <Form.Control
            type="text"
            id="moo"
            onChange={(e) => addNewUser(e, "moo")}
            placeholder="หมู่ที่"
            autoComplete="off"
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridProvince">
          <Form.Label>จังหวัด</Form.Label>

          <Form.Select
            onChange={(e) => selectProvinces(e, "province")}
            autoComplete="off"
            required
          >
            <option value="">จังหวัด</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.name_th}>
                {p.name_th}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAmphur">
          <Form.Label>อำเภอ</Form.Label>

          <Form.Select
            onChange={(e) => selectAmphures(e, "province")}
            autoComplete="off"
            required
          >
            <option value="">อำเภอ</option>
            {amphures.map((p) => (
              <option key={p.id} value={p.name_th}>
                {p.name_th}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridTombol">
          <Form.Label>ตำบล</Form.Label>

          <Form.Select
            onChange={(e) => selectTambons(e, "tambons")}
            autoComplete="off"
            required
          >
            <option value="">ตำบล</option>
            {tambons.map((p) => (
              <option key={p.id} value={p.name_th}>
                {p.name_th}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZipCode">
          <Form.Label>รหัสไปรษณีย์</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => addNewUser(e, "zipCode")}
            placeholder="รหัสไปรษณีย์"
            autoComplete="off"
            required
            value={newUser.zipCode}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridTel">
          <Form.Label>เบอร์โทรศัพท์</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => addNewUser(e, "tel")}
            placeholder="เบอร์โทรศัพท์"
            autoComplete="off"
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridLat">
          <Form.Label>ละติจูด</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => addNewUser(e, "lat_ti")}
            placeholder="ละติจูด"
            autoComplete="off"
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridLong">
          <Form.Label>ลองติจูด</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => addNewUser(e, "long_ti")}
            placeholder="ลองติจูด"
            autoComplete="off"
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridTypeEnt">
          <Form.Label>ประเภทผู้ประกอบการ</Form.Label>
          <Form.Select
            onChange={(e) => addNewUser(e, "typeEnt")}
            value={newUser.typeEnt || ""}
            autoComplete="off"
            required
          >
            <option value="">เลือกประเภทผู้ประกอบการ</option>
            <option value="ผัก">ผัก</option>
            <option value="ผลไม้">ผลไม้</option>
            <option value="ผัก,ผลไม้">ผัก,ผลไม้</option>
            <option value="ผัก,เห็ด">ผัก,เห็ด</option>
          </Form.Select>
        </Form.Group>
        <Button
          as="input"
          type="submit"
          value="บันทึก"
          variant="primary"
          size="sm"
        />
      </Form>
    </div>
  );
};

export default MyForm;
