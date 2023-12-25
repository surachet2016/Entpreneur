<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

include 'db_config.php';

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

// Retrieve the hashed password and user ID from the database based on the provided email
$result = mysqli_query($db, "SELECT * FROM user WHERE email='$email'");

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $hashedPassword = $row['password'];
        $userId = $row['user_id'];

        // Verify the provided password against the hashed password
        if (password_verify($password, $hashedPassword)) {
            // Generate a token
            $secret_key = "i4RN4KZuEe1a3F9Oc0YD5vVsjZrTtNb6"; // Replace with a secure secret key
            $payload = array("user_id" => $userId);
            $token = jwt_encode($payload, $secret_key); // Use a library like Firebase JWT to encode the token

            echo json_encode(["success" => 1, "token" => $token]);
        } else {
            echo json_encode(["success" => 0, "message" => "Invalid credentials."]);
        }
    } else {
        echo json_encode(["success" => 0, "message" => "Invalid credentials."]);
    }
} else {
    echo json_encode(["success" => 0, "message" => "Login failed."]);
}
?>
