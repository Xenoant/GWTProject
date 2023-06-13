<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="styles/style.css" rel="stylesheet">
    <script language="javascript" type="text/javascript" src="scripts/script.js">
        window.onload = init;
    </script>
    <title>Dungeons and Dragons</title>

    

</head>

<body>
    <div id="Center">
        <div id="Logo">
            <img class="pageLogo" src="Images/logo.png" alt="D & D" style="color: rgb(156, 0, 0);">
        </div>
        <header id="Head">
            <div class="dropdown">
                <button class="headerbtn">Home</button>
                <div class="dropdown-content">
                  <div onclick="switchHomeElements(1);">Information</div>
                  <div onclick="switchHomeElements(2);">How to use</div>
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
        </header>
        <div id="Login">
            <?php
                session_start();
                if(isset($_SESSION['username'])) {
                    // User logged in
                    $username = $_SESSION['username'];
                    echo "<button id='logoutbtn' onclick='logout_index();'>Logout</button><br>";
                    echo "Logged in as <strong>$username</strong>";
                }
                else {
                    echo "<a id='loginbtn' href='login/login-page.php'>Login</a>";
                }
            ?>
        </div>
        <div id="Main">
            <div id="part1" style="display: block;">
                <p class="textheader">Informations to the Website</p>
                <p class="textnormal">
                    Sooooo. Basically this is pretty cool. We only save your Username and Password. 
                    You dont have to login for the Website to work. You can roll dices and also create/read char-papers 
                    from files. Have fun.
                </p>
            </div>
            <div id="part2" style="display: none;">
                <p class="textheader">How it works</p>
                <p class="textnormal">
                    _how it works text
                </p>
            </div>
            <div id="part3" style="display: none;">
                <div class="dice-select-box">
                    <h3>The Dice</h3>
                    <div class="flex-row-box">
                        <!-- Put the dice stuff here (Select Dice, dice count, with gear?) -->
                        <select class="selectfield" id="in_sides">
                            <option value="d2">2 Seiten</option>
                            <option value="d4">4 Seiten</option>
                            <option value="d6">6 Seiten</option>
                            <option value="d8">8 Seiten</option>
                            <option value="d12">12 Seiten</option>
                            <option value="d20">20 Seiten</option>
                        </select>
                    </div>
                    <div id="rollOutput" class="rollOutputDisp">
                    </div>
                    <img src="Images/dice-icon.png" class="dice-roll-btn" onclick="justADice();">
                </div>
            </div>
        </div>
    </div>
</body>

</html>