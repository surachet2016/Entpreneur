import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./Context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useParams, useNavigate } from "react-router-dom";

const MyFormEdit = () => {
  const { updateUser, users } = useContext(AppContext);
  const [newUser, setNewUser] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let user = users.find((u) => u.id === params.id);
      console.log(user);
      if (!user) {
        navigate("/UserList");
        return;
      }
      setNewUser(user);
      // users.find()

      // fetch provinces
      let rsp = await fetch("/json/thai_provinces.json").then((res) =>
        res.json()
      );
      setProvinces(rsp.RECORDS);

      // find province object
      let province = rsp.RECORDS.find((p) => p.name_th === user.province);

      // fetch amphurs
      let am_rsp = await fetch("/json/thai_amphures.json").then((res) =>
        res.json()
      );

      // filter amphures with province_id
      let amps = am_rsp.RECORDS.filter((r) => r.province_id === province.id);
      setAmphures(amps);

      // fetch tambol
      let tm_rsp = await fetch("/json/thai_tambons.json").then((res) =>
        res.json()
      );

      // find amphur object
      let amphur = am_rsp.RECORDS.find((r) => r.name_th === user.amphur);

      // filter tambons with amphure_id
      let tmbs = tm_rsp.RECORDS.filter((r) => r.amphure_id === amphur.id);
      setTambons(tmbs);
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
  const submitUser = (e) => {
    e.preventDefault();
    updateUser(newUser);
    // Reset the form
    // e.target.reset();
    setNewUser({});
    navigate("/UserList");
  };
  //console.log(provinces);
  return (
    <div>
      <Form
        className="insertForm mt-4 pt-4 font-container gfg"
        onSubmit={submitUser}
      >
        <h3>แก้ไขข้อมูลผู้ประกอบการ</h3>
        <Form.Group as={Col} controlId="formGridPreName">
          <Form.Label>คำนำหน้านาม</Form.Label>
          <Form.Select
            onChange={(e) => addNewUser(e, "preName")}
            autoComplete="off"
            required
            value={newUser.preName}
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
            value={newUser.firstName}
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
            value={newUser.lastName}
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
            value={newUser.company}
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
            value={newUser.homeNo}
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
            value={newUser.soilNo}
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
            value={newUser.street}
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
            value={newUser.moo}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridProvince">
          <Form.Label>จังหวัด</Form.Label>

          <Form.Select
            onChange={(e) => selectProvinces(e)}
            autoComplete="off"
            required
            value={newUser.province}
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
            onChange={(e) => selectAmphures(e)}
            autoComplete="off"
            required
            value={newUser.amphur}
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
            onChange={(e) => selectTambons(e)}
            autoComplete="off"
            required
            value={newUser.tombol}
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
            value={newUser.tel}
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
            value={newUser.lat_ti}
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
            value={newUser.long_ti}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridTypeEnt">
          <Form.Label>ประเภทผู้ประกอบการ</Form.Label>
          <Form.Select
            onChange={(e) => addNewUser(e, "typeEnt")}
            value={newUser.typeEnt}
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
        <Button as="input" type="submit" value="บันทึก" />
      </Form>
    </div>
  );
};

export default MyFormEdit;
