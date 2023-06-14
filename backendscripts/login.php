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

// Login function
function login($username, $password) {
    // Check if UserData folder exists
    $userDataPath = '../UserData';
    if(file_exists($userDataPath)) {
        // Check if user folder exists
        $userFolderPath = $userDataPath . '/' . $username;
        if(file_exists($userFolderPath)) {
            // Check the user_pw file for the hashed password
            $userPasswordFile = $userFolderPath . '/user_pw';
            if(file_exists($userPasswordFile)) {
                $storedPassword = trim(file_get_contents($userPasswordFile));
                if(password_verify($password, $storedPassword)) {
                    // Authentication successful, store the username in the session
                    $_SESSION['username'] = $username;

                    // Redirect to the welcome page // TODO:
                    header("Location: ../index.php");
                    exit;
                } else {
                    $error = 'Wrong <strong>password</strong>...';
                    header("Location: ../login/login-page.php?error=$error");
                    exit;
                }
            } else {
                $error = 'No password set for this user...';
                header("Location: ../login/login-page.php?error=$error");
                exit;
            }
        } else {
            $error = 'No such <strong>User</strong>...';
            header("Location: ../login/login-page.php?error=$error");
            exit;
        }
    }
}

// Register function
function register($username, $password) {
    // Check if UserData folder exists, create it if not
    $userDataPath = '../UserData';
    if(!file_exists($userDataPath)) {
        mkdir($userDataPath);
    }

    // Create a folder for the user
    $userFolderPath = $userDataPath . '/' . $username;
    if(!file_exists($userFolderPath)) {
        mkdir($userFolderPath);
    } else {
        $error = 'Username already <strong>exists</strong>...';
        header("Location: ../login/login-page.php?error=$error");
        exit;
    }

    // Create the user_pw file with the hashed password
    $userPasswordFile = $userFolderPath . '/user_pw';
    if (file_exists($userPasswordFile)){
        $error = 'Password already set. Please ask the admin for a <strong>password change</strong> at jeannot.lukatsch@gmail.com...';
        header("Location: ../login/login-page.php?error=$error");
        exit;
    }
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    file_put_contents($userPasswordFile, $hashedPassword);

    // Redirect to the login page after successful registration
    login($username, $password);
    exit;
}

// Check if the form is submitted
if(isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['psw'];
    login($username, $password);
}

// Check if the registration form is submitted
if(isset($_POST['register'])) {
    $username = $_POST['username'];
    $password = $_POST['psw'];
    register($username, $password);
}
?>
