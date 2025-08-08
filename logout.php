<?php
session_start();
session_destroy(); // End the session

// Return success response
echo json_encode(["success" => true]);
exit();
?>
