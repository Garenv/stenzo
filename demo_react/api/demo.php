<?php
//    $content = $_POST['content'];
//    $response = array("success" => true, "message" => $content);

//    echo json_encode($response);


//    echo $email;
//    header('Content-Type: application/text');

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
            echo "Data sent with no problems";
        }
    }

    $query = "SELECT * FROM users";
    $select_all_posts_query = mysqli_query($connection, $query);

    while($row = mysqli_fetch_assoc($select_all_posts_query)) {
        $post_image = $row['post_image'];
        echo $post_image;
    }




//function hey() {
//    echo "Will I see this?";
//}
//
//$test = $_GET['do'];
//
//if($test === "hey") {
//    hey();
//}


//    echo json_encode(array('ping' => 'pong'));

?>