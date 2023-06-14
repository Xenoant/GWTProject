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

<body onload="initLoadChar()">
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
                    <a href="charFromFile.php">Open from file</a>
                    <a href="charFromServer-select.php">Open from Server</a>
                    <a href="charNew.php">New Character</a>
                </div>
            </div>

            <span class="headerspace"></span>

            <div class="dropdown">
                <button class="headerbtn">Session</button>
                <div class="dropdown-content">
                    <a href="../sessions/session-create.php">Create</a>
                    <a href="../sessions/session-select.php">Open from Server</a>
                </div>
            </div>
        </header>
        <div id="Login">
            <?php
                if(isset($_SESSION['username'])) {
                    // User logged in
                    $username = $_SESSION['username'];
                    echo "<button id='logoutbtn' onclick='logout();'>Logout</button><br>";
                    echo "Logged in as <strong>$username</strong>";
                }
                else {
                    echo "<a id='loginbtn' href='../login/login-page.php'>Login</a>";
                }
            ?>
        </div>
        <div id="Main">
            <?php
                // here will be the charackters from the user
                if(isset($_SESSION['username'])) {
                    // User logged in
                    $username = $_SESSION['username'];
                    $dir = "../UserData/$username";

                    if (is_dir($dir)){

                        $files = scandir($dir);
                        foreach ($files as $file) {
                            if ($file == 'user_pw'){
                                continue;
                            }
                            elseif ($file != '.' && $file != '..'){
                                $f_path = $dir . '/' . $file;

                                // process
                                $jsonData = file_get_contents($f_path);
                                $data = json_decode($jsonData);

                                $name = $data->name;
                                $race = $data->race;
                                $class = $data->class;

                                echo "
                                    <div class='char-display-box'>
                                        <div class='flex-row-box'>
                                            <div class='char-display-text'>
                                                Name: $name
                                            </div>
                                            <div class='char-display-text'>
                                                Race: $race
                                            </div>
                                            <div class='char-display-text'>
                                                Class: $class
                                            </div>
                                        </div>
                                        <button class='char-display-btn' onclick='displayChar(\"$file\");'>Select Char</button>
                                    </div>";
                            }
                        }
                    }
                }
                else {
                    echo "Please log in to get acces to your saved chars or register to save chars online.";
                }
            ?>
        </div>
    </div>
</body>

</html>