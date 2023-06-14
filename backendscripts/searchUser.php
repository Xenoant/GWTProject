<?php
// Retrieve the query parameters
$username = $_GET['username'];
$charname = $_GET['charname'];

// Perform the search logic
// Assuming $db is a valid database connection object
$datapath = "../UserData/$username/$charname";

$response = array();
if (file_exists($datapath)){
    $response['exists'] = true;
    $httpStatus = 200;
}
else {
    // User and/or character do not exist
    $response['exists'] = false;
    $httpStatus = 404;
}

http_response_code($httpStatus);

// Send the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
