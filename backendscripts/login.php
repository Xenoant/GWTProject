<?php
session_start(); // Start the session

// Handle logout
if(isset($_GET['logout'])) {
    // Destroy the session and redirect to the login page
    session_destroy();
    header("Location: ../index.php");
    exit;
}

// Check if the user is already logged in
if(isset($_SESSION['username'])) {
    // User is already logged in, redirect them to another page
    header("Location: ../index.php");
    exit;
}

$error = "";

// Check if the form is submitted
if(isset($_POST['login'])) {
    // Perform login authentication
    $username = $_POST['username'];
    $password = $_POST['psw'];

    // Check if UserData folder exists
    $userDataPath = '../UserData';
    if(file_exists($userDataPath)) {

        // Check if user folder exists
        $userFolderPath = $userDataPath . '/' . $username;
        if(file_exists($userFolderPath)) {
            // Check the user_pw file for the password
            $userPasswordFile = $userFolderPath . '/user_pw';
            if(file_exists($userPasswordFile) && trim(file_get_contents($userPasswordFile)) === $password) {
                // Authentication successful, store the username in the session
                $_SESSION['username'] = $username;

                // Redirect to the welcome page // TODO:
                header("Location: ../index.php");
                exit;
            }else{
                $error = 'Wrong <strong>password</strong>...';
                header("Location: ../login/login-page.php?error=$error");
                exit;
            }
        }
        else{
            $error = 'No such <strong>User</strong>...';
            header("Location: ../login/login-page.php?error=$error");
            exit;
        }
    }
}

// Check if the registration form is submitted
if(isset($_POST['register'])) {
    // Perform registration logic
    $username = $_POST['username'];
    $password = $_POST['psw'];

    // Check if UserData folder exists, create it if not
    $userDataPath = '../UserData';
    if(!file_exists($userDataPath)) {
        mkdir($userDataPath);
    }

    // Create a folder for the user
    $userFolderPath = $userDataPath . '/' . $username;
    if(!file_exists($userFolderPath)) {
        mkdir($userFolderPath);
    }

    // Create the user_pw file with the password
    $userPasswordFile = $userFolderPath . '/user_pw';
    file_put_contents($userPasswordFile, $password);

    // Redirect to the welcome page after successful registration TODO:
    header("Location: ../index.php");
    echo $_SESSION['username'];

    // Check if UserData folder exists
    if(file_exists($userDataPath)) {

        // Check if user folder exists
        $userFolderPath = $userDataPath . '/' . $username;
        if(file_exists($userFolderPath)) {
            // Check the user_pw file for the password
            $userPasswordFile = $userFolderPath . '/user_pw';
            if(file_exists($userPasswordFile) && trim(file_get_contents($userPasswordFile)) === $password) {
                // Authentication successful, store the username in the session
                $_SESSION['username'] = $username;

                // Redirect to the welcome page // TODO:
                header("Location: ../index.php");
                exit;
            }else{
                $error = 'Wrong <strong>password</strong>...';
                header("Location: ../login/login-page.php?error=$error");
                exit;
            }
        }
        else{
            $error = 'No such <strong>User</strong>...';
            header("Location: ../login/login-page.php?error=$error");
            exit;
        }
    }

    exit;
}
?>
