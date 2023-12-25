<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connect.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->preName)
    && isset($data->firstName)
    && isset($data->lastName)
    // Add other required fields here
) {
    $preName = mysqli_real_escape_string($db_conn, $data->preName);
    $firstName = mysqli_real_escape_string($db_conn, $data->firstName);
    $lastName = mysqli_real_escape_string($db_conn, $data->lastName);
    $homeNo = mysqli_real_escape_string($db_conn, $data->homeNo);
      $soilNo = mysqli_real_escape_string($db_conn, $data->soilNo);
    $street = mysqli_real_escape_string($db_conn, $data->street);
    $moo = mysqli_real_escape_string($db_conn, $data->moo);
    $tombol = mysqli_real_escape_string($db_conn, $data->tombol);
      $amphur = mysqli_real_escape_string($db_conn, $data->amphur);
    $province = mysqli_real_escape_string($db_conn, $data->province);
    $zipCode = mysqli_real_escape_string($db_conn, $data->zipCode);
    $tel = mysqli_real_escape_string($db_conn, $data->tel);
      $lat_ti = mysqli_real_escape_string($db_conn, $data->lat_ti);
    $long_ti = mysqli_real_escape_string($db_conn, $data->long_ti);
    $typeEnt = mysqli_real_escape_string($db_conn, $data->typeEnt);

	 $insertUser = mysqli_query($db_conn, "INSERT INTO `members`(`preName`,`firstName`,`lastName`,`homeNo`,`soilNo`,`street`,`moo`,`tombol`,`amphur`,`province`,`zipCode`,`tel`,`lat_ti`,`long_ti`,`typeEnt`) VALUES('$preName','$firstName','$lastName','$homeNo','$soilNo','$street','$moo','$tombol','$amphur','$province','$zipCode','$tel','$lat_ti','$long_ti','$typeEnt')");
	}else {
 echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
