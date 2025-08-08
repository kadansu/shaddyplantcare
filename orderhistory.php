<?php
session_start();

// Database connection
$servername = "localhost";
$username = "root"; // Change to your database username
$password = ""; // Change to your database password
$dbname = "plantcare";

if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit();
}

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $user_id = $_SESSION['user_id'];
    
    $stmt = $conn->prepare("
        SELECT o.order_id, o.order_date, o.status, s.service_name, s.price
        FROM orders o
        JOIN services s ON o.service_id = s.service_id
        WHERE o.user_id = :user_id
        ORDER BY o.order_date DESC
    ");
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
    exit();
}
?>
