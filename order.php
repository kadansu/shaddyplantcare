<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "plantcare";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $service_id = $_POST['service_id'];
    $user_email = $_POST['email'];

    $sql = "INSERT INTO orders (service_id, user_email) VALUES ('$service_id', '$user_email')";

    if ($conn->query($sql) === TRUE) {
        echo "Order placed successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
