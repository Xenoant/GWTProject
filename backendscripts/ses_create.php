<?php
session_start();

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the raw POST data
    $postData = file_get_contents("php://input");

    // Decode the JSON data
    $jsonData = json_decode($postData, true);

    // Check if the JSON data is valid
    if ($jsonData !== null) {
        // Check if the user is already logged in
        if(isset($_SESSION['username'])) {
            // User is logged in 
            // Prepare the file path
            $username = $_SESSION['username'];
            $directory = "../UserData/" . $username . "/master";
            if (!file_exists($directory)){
                mkdir($directory);
            }

            $filename = 'session-' . $_SESSION['username'] . uniqid() . '.json';
            echo "$filename <br>";

            if (isset($_GET['filename'])){
                $filename = $_GET['filename'];
                echo "$filename <br>";
            }

            $filePath = $directory . '/' . $filename;
            if (file_exists($filePath)){
                unlink($filePath);
            }

            // Save the JSON data to the file
            $result = file_put_contents($filePath, $postData);

            if ($result !== false) {
                // Send a success response
                http_response_code(200);
                echo "Character data saved successfully!";
            } else {
                // Send an error response if the file could not be saved
                http_response_code(500);
                echo "Failed to save character data";
            }
        }
        else{
            $error = "You are not logged in. You cant save your char online.";
        }
    }
} 
else {
    // Send an error response for non-POST requests
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
