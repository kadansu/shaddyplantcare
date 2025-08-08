<?php
session_start();
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
    if (!isset($_SESSION['user_id'])) {
        header("Location: services.html?error=Please log in to place an order");
        exit();
    }

    $service_id = $_POST['service_id'];
    $user_id = $_SESSION['user_id'];

    $sql = "INSERT INTO orders (service_id, user_id, status) VALUES (?, ?, 'Pending')";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $service_id, $user_id);

    if ($stmt->execute()) {
        header("Location: services.html?success=Order placed successfully!");
    } else {
        header("Location: services.html?error=Error placing order: " . $conn->error);
    }

    $stmt->close();
}

$conn->close();
?>