<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "plantcare";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Please log in to view your orders"]);
    exit();
}

$user_id = $_SESSION['user_id'];

$sql = "SELECT o.order_id, s.service_name, s.price, o.order_date, o.status 
        FROM orders o 
        JOIN services s ON o.service_id = s.service_id 
        WHERE o.user_id = ? 
        ORDER BY o.order_date DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders);

$stmt->close();
$conn->close();
?>