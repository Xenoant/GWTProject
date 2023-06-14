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

<body onload="initNewChar();">
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
                    echo "<button id='logoutbtn' onclick='logout();'>Logout</button><br>";
                    echo "Logged in as <strong>$username</strong>";
                }
                else {
                    echo "<a id='loginbtn' href='../login/login-page.php'>Login</a>";
                }
            ?>
        </div>
        <div id="Main">
            <form action="javascript:void(0)">
                <div class="flex-row-box">
                    <div class="flex-box">
                        <div class="flex-column-box">
                            <div class="flex-item">
                                <label class="form-label" for="name">Name: </label>
                                <div class="form-control-wrapper">
                                    <input class="inputfield" type="text" id="in_name" name="name" placeholder="your name..." onchange="writeInputData();">
                                </div>
                            </div>
                            <div class="flex-item">
                                <label class="form-label" for="gender">Gender: </label>
                                <div class="form-control-wrapper">
                                    <select class="selectfield" name="gender" id="in_gender" onchange="writeInputData();">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div> 
                            </div>
                            <div class="flex-item">
                                <label class="form-label" for="race">Race: </label>
                                <div class="form-control-wrapper">
                                    <input class="inputfield" type="text" id="in_race" name="race" placeholder="your race..." onchange="writeInputData();">
                                </div>
                            </div>
                            <div class="flex-item">
                                <label class="form-label" for="class">Class: </label>
                                <div class="form-control-wrapper">
                                    <input class="inputfield" type="text" id="in_class" name="class" placeholder="your class..." onchange="writeInputData();">
                                </div>
                            </div>
                            <div class="flex-item">
                                <label class="form-label" for="job">Job: </label>
                                <div class="form-control-wrapper">
                                    <input class="inputfield" type="text" id="in_job" name="job" placeholder="your job..." onchange="writeInputData();">
                                </div>
                            </div>
                            <div class="flex-item">
                                <label class="form-label" for="rank">Rank: </label>
                                <div class="form-control-wrapper">
                                    <input class="inputfield" type="text" id="in_rank" name="rank" placeholder="your rank..." onchange="writeInputData();">
                                </div>
                            </div>
                        </div>
                        <div class="flex-row-box">
                            <div class="flex-column-box">
                                <div class="flex-item">
                                    <label class="form-label" for="basestat">Base: </label>
                                    <div class="form-control-wrapper">
                                        <button class="valuebtn" onclick="addValue('base');">+</button>
                                        <span class="valuetext" id="base_disp">_placeholder</span>
                                        <button class="valuebtn" onclick="decValue('base');">-</button>
                                    </div>
                                </div>
                                <div class="flex-item">
                                    <label class="form-label" for="str">Str: </label>
                                    <div class="form-control-wrapper">
                                        <span class="basestat" name="str">0</span>
                                        <button class="valuebtn" onclick="addValue('str');">+</button>
                                        <span class="valuetext" id="str_disp">_placeholder</span>
                                        <button class="valuebtn" onclick="decValue('str');">-</button>
                                        <span class="valuetext" id="str_disp_extra">_placeholder</span>
                                    </div>
                                </div>
                                <div class="flex-item">
                                    <label class="form-label" for="agi">Agi: </label>
                                    <div class="form-control-wrapper">
                                        <span class="basestat" name="agi">0</span>
                                        <button class="valuebtn" onclick="addValue('agi');">+</button>
                                        <span class="valuetext" id="agi_disp">_placeholder</span>
                                        <button class="valuebtn" onclick="decValue('agi');">-</button>
                                        <span class="valuetext" id="agi_disp_extra">_placeholder</span>
                                    </div>
                                </div>
                                <div class="flex-item">
                                    <label class="form-label" for="chr">Chr: </label>
                                    <div class="form-control-wrapper">
                                        <span class="basestat" name="chr">0</span>
                                        <button class="valuebtn" onclick="addValue('chr');">+</button>
                                        <span class="valuetext" id="chr_disp">_placeholder</span>
                                        <button class="valuebtn" onclick="decValue('chr');">-</button>
                                        <span class="valuetext" id="chr_disp_extra">_placeholder</span>
                                    </div>
                                </div>
                                <div class="flex-item">
                                    <label class="form-label" for="wis">Wis: </label>
                                    <div class="form-control-wrapper">
                                        <span class="basestat" name="wis">0</span>
                                        <button class="valuebtn" onclick="addValue('wis');">+</button>
                                        <span class="valuetext" id="wis_disp">_placeholder</span>
                                        <button class="valuebtn" onclick="decValue('wis');">-</button>
                                        <span class="valuetext" id="wis_disp_extra">_placeholder</span>
                                    </div>
                                </div>
                                <div class="flex-item">
                                    <label class="form-label" for="lck">Lck: </label>
                                    <div class="form-control-wrapper">
                                        <span class="basestat" name="lck">0</span>
                                        <button class="valuebtn" onclick="addValue('lck');">+</button>
                                        <span class="valuetext" id="lck_disp">_placeholder</span>
                                        <button class="valuebtn" onclick="decValue('lck');">-</button>
                                        <span class="valuetext" id="lck_disp_extra">_placeholder</span>
                                    </div>
                                </div>
                            </div>
    
                            <div class="flex-column-box">
                                <div class="flex-item">
                                    <label class="form-label" for="freepoints">Free Points: </label>
                                    <div class="form-control-wrapper">
                                        <button class="valuebtn" onclick="addValue('free');">+</button>
                                        <span class="basestat" id="free_disp">0</span>
                                        <button class="valuebtn" onclick="decValue('free');">-</button>
                                    </div>
                                </div>
                                <div class="flex-item">
                                    <label class="form-label"  for="vit">Vit: </label>
                                    <div class="form-control-wrapper">
                                        <span class="basestat" name="vit">0</span>
                                        <button class="valuebtn" onclick="addValue('vit');">+</button>
                                        <span class="valuetext" id="vit_disp">_placeholder</span>
                                        <button class="valuebtn" onclick="decValue('vit');">-</button>
                                        <span class="valuetext" id="vit_disp_extra">_placeholder</span>
                                    </div>
                                </div>
                                <div class="flex-item">
                                    <label class="form-label" for="dex">Dex: </label>
                                    <div class="form-control-wrapper">
                                        <span class="basestat" name="dex">0</span>
                                        <button class="valuebtn" onclick="addValue('dex');">+</button>
                                        <span class="valuetext" id="dex_disp">_placeholder</span>
                                        <button class="valuebtn" onclick="decValue('dex');">-</button>
                                        <span class="valuetext" id="dex_disp_extra">_placeholder</span>
                                    </div>
                                </div>
                                <div class="flex-item">
                                    <label class="form-label" for="int">Int: </label>
                                    <div class="form-control-wrapper">
                                        <span class="basestat" name="int">0</span>
                                        <button class="valuebtn" onclick="addValue('int');">+</button>
                                        <span class="valuetext" id="int_disp">_placeholder</span>
                                        <button class="valuebtn" onclick="decValue('int');">-</button>
                                        <span class="valuetext" id="int_disp_extra">_placeholder</span>
                                    </div>
                                </div>
                                <div class="flex-item">
                                    <label class="form-label" for="fth">Fth: </label>
                                    <div class="form-control-wrapper">
                                        <span class="basestat" name="fth">0</span>
                                        <button class="valuebtn" onclick="addValue('fth');">+</button>
                                        <span class="valuetext" id="fth_disp">_placeholder</span>
                                        <button class="valuebtn" onclick="decValue('fth');">-</button>
                                        <span class="valuetext" id="fth_disp_extra">_placeholder</span>
                                    </div>
                                </div>
                                <div class="flex-item">
                                    <label class="form-label" for="per">Per: </label>
                                    <div class="form-control-wrapper">
                                        <span class="basestat" name="per">0</span>
                                        <button class="valuebtn" onclick="addValue('per');">+</button>
                                        <span class="valuetext" id="per_disp">_placeholder</span>
                                        <button class="valuebtn" onclick="decValue('per');">-</button>
                                        <span class="valuetext" id="per_disp_extra">_placeholder</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="flex-column-box">
                            <!-- TODO: her has to be the charackter traits, skills, items, ...-->
                            <!-- Skills -->
                            <div id="skill_disp">
                                <h3>Start Skills</h3>
                            </div>
                            <button id="addbtn" class="addbtn" onclick="addSkill(true);">Add Skill</button>
            
                            <!-- Traits -->
                            <div id="trait_disp">
                                <h3>Traits</h3>
                            </div>
                            <button id="addbtn" class="addbtn" onclick="addTrait(true);">Add Trait</button>
            
                            <!-- Knowledge -->
                            <div id="know_disp">
                                <h3>Knowledge</h3>
                            </div>
                            <button id="addbtn" class="addbtn" onclick="addKnowledge(true);">Add Knowledge</button>
            
                            <!-- Start Ring -->
                            <div id="ring_disp">
                                <h3>Rings</h3>
                            </div>
                            <button id="addbtn" class="addbtn" onclick="addRing(true);">Add Ring</button>
            
                            <!-- Start Item -->
                            <div id="item_disp">
                                <h3>Items</h3>
                            </div>
                            <button id="addbtn" class="addbtn" onclick="addItem(true);">Add Item</button>
            
                            <!-- Start Gear -->
                            <div id="gear_disp">
                                <h3>Gear</h3>
                                <div class="flex-row-box">
                                    <div class="gear-box">
                                        <select class="gear-select" onchange="changedGear(0 ,'gearselect1', 'gearname1', 'gearrarity1')" id="gearselect1"></select>
                                        <span class="gear-header" id="gearname1">None</span>
                                        <span class="gear-rarity" id="gearrarity1">-</span>
                                    </div>
                                    <div class="gear-box">
                                        <select class="gear-select" onchange="changedGear(1 ,'gearselect2', 'gearname2', 'gearrarity2')" id="gearselect2"></select>
                                        <span class="gear-header" id="gearname2">None</span>
                                        <span class="gear-rarity" id="gearrarity2">-</span>
                                    </div>
                                    <div class="gear-box">
                                        <select class="gear-select" onchange="changedGear(2, 'gearselect3', 'gearname3', 'gearrarity3')" id="gearselect3"></select>
                                        <span class="gear-header" id="gearname3">None</span>
                                        <span class="gear-rarity" id="gearrarity3">-</span>
                                    </div>
                                    <div class="gear-box">
                                        <select class="gear-select" onchange="changedGear(3, 'gearselect4', 'gearname4', 'gearrarity4')" id="gearselect4"></select>
                                        <span class="gear-header" id="gearname4">None</span>
                                        <span class="gear-rarity" id="gearrarity4">-</span>
                                    </div>
                                </div>
                            </div>
    
                            <!-- Start Notes -->
                            <div id="note_disp">
                                <h3>Notes</h3>
                            </div>
                            <button id="addbtn" class="addbtn" onclick="addNote(true);">Add Note</button>
                        </div>
                    </div>
                    <div class="flex-box" id="note-wrapper">
                    </div>
                </div>
                <input type="submit" value="Submit Char" class="submitbtn" onclick="submitCharData();">
                <button class="submitbtn" onclick="downloadCharacterData();" style="margin-top: 5em;">Get Jason Char Data Sheet</button>
            </div>
            </form>
        </div>
    </div>
</body>

</html>