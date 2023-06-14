<?php 
session_start();
?>

<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../styles/style.css" rel="stylesheet">
    <script language="javascript" type="text/javascript" src="../scripts/script.js">
        window.onload = init;
    </script>
    <title>Dungeons and Dragons</title>
</head>

<body>
    <div id="Center">
        <div id="Logo">
            <img class="pageLogo" src="../Images/logo.png" alt="D & D" style="color: rgb(156, 0, 0);">
        </div>
        <header id="Head">
            <span class="headerspace"></span>

            <div class="dropdown">
                <button class="headerbtn">Home</button>
                <div class="dropdown-content">
                  <div onclick="switchHomeElements(1);">Information</div>
                  <div onclick="switchHomeElements(2);">Whats New?</div>
                  <div onclick="switchHomeElements(3);">Just a dice</div>
                </div>
            </div>
        
            <span class="headerspace"></span>
            
            <div class="dropdown">
                <button class="headerbtn">Character</button>
                <div class="dropdown-content">
                  <a href="CharSites/charFromFile.php">Open from file</a>
                  <a href="CharSites/charFromServer-select.php">Open from Server</a>
                  <a href="CharSites/charNew.php">New Character</a>
                </div>
            </div>

            <span class="headerspace"></span>

            <div class="dropdown">
                <button class="headerbtn">Session</button>
                <div class="dropdown-content">
                    <a href="sessions/session-create.php">Create</a>
                    <a href="sessions/session-select.php">Open from Server</a>
                </div>
            </div>
        </header>
        <div id="Login">
            <?php
                if(isset($_SESSION['username'])) {
                    // User logged in
                    $username = $_SESSION['username'];
                    echo "Logged in as $username";
                    echo "<button id='logoutbtn' onclick='logout();'>Logout</button>";
                }
                else {
                    echo "<a id='loginbtn' href='../login/login-page.php'>Login</a>";
                }
            ?>
        </div>
        <div id="Main">
            <form action="../backendscripts/login.php" class="form-container" id="login-form" method="post">
                <h1>Login</h1>
                <label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Username" name="username" required>
          
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required>
          
                <button type="submit" class="btn" name="login" id="login">Login</button>
                <button type="submit" class="btn" name="register" id="register">Register</button>
                <button class="btn" onclick="window.open('../index.html', '_self')">Continue without login</button>
            </form>
            <?php
                if (isset($_GET["error"])){
                    $err = $_GET["error"];
                    echo "$err | Please try again!";
                }
            ?>
        </div>
    </div>
</body>

</html>