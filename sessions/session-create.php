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
    <script language="javascript" type="text/javascript" src="../scripts/session-manager.js"></script>
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
                  <a href="../CharSites/charFromFile.php">Open from file</a>
                  <a href="../CharSites/charFromServer-select.php">Open from Server</a>
                  <a href="../CharSites/charNew.php">New Character</a>
                </div>
            </div>

            <span class="headerspace"></span>

            <div class="dropdown">
                <button class="headerbtn">Session</button>
                <div class="dropdown-content">
                    <a href="session-create.php">Create</a>
                    <a href="session-select.php">Open from Server</a>
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
            <!-- Basically: create new session: 
                - search for members and their chars
                - add member with char to session -> create folder with name gamemaster -> folder sessionID -> file user -> input charID
            -->
            <form action="javascript:void(0)">

            <div class="flex-column-box">
                <div>Session create system</div><br><br>
                <div class="flex-row-box">
                    <div>Session identifier: </div>
                    <input type="text" class="inputfield" id="ses-ident">
                </div>
                <div class="flex-column-box" class="user" id="user">
                    
                </div>
                <button class="addbtn" onclick="addPlayer();">Add Player</button>
            </div>
            <input type="submit" id="create" class="addbtn" onclick="submitSessionData();">

            </form>
        </div>
    </div>
</body>

</html>