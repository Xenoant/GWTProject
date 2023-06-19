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
			<!-- displays basically all user chars that has been added to the session -->
			<div id="session-display">
				<div class="flex-row-box">
					<div class="flex-column-box session-box">
						<div class="flex-item">
							<?php
								if(isset($_SESSION['username'])) {
									// User logged in
									$username = $_SESSION['username'];
									$filename = $_GET['filename'];
									$ses_data = file_get_contents("../UserData/$username/master/$filename");
		
									// Decode the JSON data 
									$data = json_decode($ses_data, true);
		
									// Check if the 'players' array exists
									if(isset($data['players'])) {
										// Loop through the players and display the information
										foreach($data['players'] as $player) {
											$name = $player['username'];
											$char = $player['char'];
											echo "Name: $name<br>";
											echo "Character: $char<br>";
											echo "<button class='addbtn' onclick='goToChar(\"$username\", \"$char\", \"$filename\")'>Select Char</button>";
										}
									} else {
										echo "No player information found.";
									}
								} else {
									echo "Please log in to get access to your saved characters or register to save characters online.";
								}
							?>
						</div>
					</div>

					<div class="flex-column-box session-box">

						<div class="flex-column-box">
							<!-- NPC Select Part -->
								<?php
									// here will be the npcs from the session
									if(isset($_SESSION['username'])) {
										// User logged in
										$username = $_SESSION['username'];
										$dir = "../UserData/$username";

										if (is_dir($dir)){

											$files = scandir($dir);
											foreach ($files as $file) {
												if ($file == '.' || $file == '..' || $file == 'user_pw'){
													continue;
												}
												$f_path = $dir . '/' . $file;
												if (is_dir($f_path)){
													continue;
												}

												// process
												$jsonData = file_get_contents($f_path);
												$data = json_decode($jsonData);

												$isNpc = $data->isNpc;
												if (!$isNpc){
													continue;
												}

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
														<button class='addbtn' onclick='goToChar(\"$username\", \"$char\", \"$filename\")'>Select Char</button>
													</div>";
											}
										}
									}
									else {
										echo "Please log in to get acces to your saved chars or register to save chars online.";
									}
								?>
						</div>

					</div>		
				</div>
			</div>
		</div>
	</div>
</body>

<?php
	$jsonData = "";
	if(isset($_SESSION['username'])) {
		// User logged in
		$username = $_SESSION['username'];
		$filename = $_GET['filename'];
		$jsonData = file_get_contents("../UserData/$username/master/$filename");
	}
	else {
		echo "You are not Logged in. Please Log in and try again.";                                   
	}
?>

<script>
	var jsonData = <?php echo $jsonData ?>;
	console.log(jsonData);
	setSessionData(jsonData);
</script>

</html>