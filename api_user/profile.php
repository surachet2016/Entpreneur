<?php
 
include 'db_config.php';
 
$email = $_GET['email'];

$Sql_Query = "SELECT * FROM user WHERE email = '$email' ";

$sqlPro = mysqli_fetch_array(mysqli_query($dbcon,$Sql_Query));


 
$Profile = json_encode($sqlPro);
 
 echo $Profile ; 
 
 mysqli_close($dbcon);
?>
