<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'); 

include 'db_config.php';

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT);

$result = mysqli_query($db, "INSERT INTO user (name, email, password) VALUES ('$name', '$email', '$password')");

if ($result) {
    echo json_encode(["success" => 1]);
} else {
    echo json_encode(["success" => 0, "message" => "Registration failed."]);
}
?>
