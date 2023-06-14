var sessionData = {
    master: "",
    players: []
}

function addPlayer(){

    var playerContainer = document.createElement("div");
    playerContainer.className = "player";

    // player name input
    var nameContainer = document.createElement("div");
        nameContainer.className = "flex-item";
    var labelName = document.createElement("div");
        labelName.innerHTML = "Player name: ";
        labelName.className = "char-display-text";
    var inputName = document.createElement("input");
        inputName.className = "char-input-field";
        inputName.placeholder = "Enter name...";

    nameContainer.appendChild(labelName);
    nameContainer.appendChild(inputName);

    // player char id input
    var charContainer = document.createElement("div");
        charContainer.className = "flex-item";
    var charName = document.createElement("div");
        charName.innerHTML = "Char ID: ";
        charName.className = "char-display-text";
    var inputChar = document.createElement("input");
        inputChar.className = "char-input-field";
        inputChar.placeholder = "Enter ID...";

    charContainer.appendChild(charName);
    charContainer.appendChild(inputChar);

    var checkBtn = document.createElement("button");
        checkBtn.innerHTML = "Validate";


    playerContainer.appendChild(nameContainer);
    playerContainer.appendChild(charContainer);
    playerContainer.appendChild(checkBtn);

    document.getElementById("user").appendChild(playerContainer);

    var playerData = {
        username: "", // username
        char: "" // char ID (username + uniq() code)
    }

    inputName.addEventListener("change", function(){
        
    });

    checkBtn.addEventListener("click", function(){
        checkForUser(playerData.username, playerData.username);
    });

    sessionData.players.push(playerData);
}

function checkForUser(username, charname) {
    var xhr = new XMLHttpRequest();
    var url = '/searchUser?username=' + encodeURIComponent(username) + '&charname=' + encodeURIComponent(charname);
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.exists) {
          console.log('Der Benutzer und der Charakter existieren.');
        } else {
          console.log('Der Benutzer und/oder der Charakter existieren nicht.');
        }
      } else {
        console.log('Fehler bei der Serveranfrage. Status: ' + xhr.status);
      }
    };
    
    xhr.open('GET', url, true);
    xhr.send();
}
  

// send data to server
function submitSessionData(filename) {
    console.log("Initiate Char Data submit...");
  
    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();
  
    var url = "../backendscripts/ses_create.php";
  
    // Specify the URL of the PHP script that will handle the data
    if (filename != undefined && filename != null){
      url = "../backendscripts/ses_create.php?filename=" + filename;
    }
  
    console.log(url);
  
    // Open a POST request to the specified URL
    xhr.open("POST", url, true);
  
    // Set the content type header
    xhr.setRequestHeader("JSONData", "application/json");
  
    // Convert the charData object to JSON
    var jsonData = JSON.stringify(sessionData);
  
    // Send the JSON data in the request body
    xhr.send(jsonData);
  
    // Define the callback function to handle the response
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          //console.log("Char Data submitted successfully!");
          // Show success alert
          alert("Session data submitted successfully!");
        } else {
          //console.log("Error submitting Char Data!");
          // Show error alert
          alert("Error submitting session data. Please try again later.");
        }
      }
    };
}
  
function setSessionData(jsonData){
    sessionData = jsonData;
    document.getElementById("session_display").style.display = "block";
    displaySessionData(true);
}