<?php
//    $content = $_POST['content'];
//    $response = array("success" => true, "message" => $content);

//    echo json_encode($response);


//    echo $email;

//    header('Accept: application/json');
//    header('Access-Control-Allow-Methods: POST,GET,PUT,DELETE,OPTIONS');
//    header("Access-Control-Allow-Headers: eToken,X-Requested-With,Content-Type");
//    header('Content-Type: text/json; charset=utf+8; application/json; application/x-www-form-urlencoded');
//    header('Access-Control-Allow-Origin: *');

    $connection = mysqli_connect("localhost", "root", "", "loginapp");
    $username = $_POST['username'];
    $password = $_POST['password'];

    if(isset($_POST['submit'])) {
        $query = "INSERT INTO users(username, password) ";
        $query .= " VALUES('$username', '$password')";

        $result = mysqli_query($connection, $query);

        if (!$result) {
            die("Query failed" . mysqli_error($connection));
        } else {
            echo "check now";
        }
    }
?>