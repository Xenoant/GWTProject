var npcData = {
    // TODO:
}

function displayNpcData(){

}

function createNpc(){

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
    document.getElementById("session-display").style.display = "block";
}

function displaySession(filename)
{
  window.location.href = "session-display.php?filename=" + filename;
}

document.addEventListener("DOMContentLoaded", function() {
  try{
    document.getElementById("ses-ident").addEventListener("change", function(){
      sessionData.ident = this.value;
    });
  }
  catch {}
});

function goToChar(user, char, ses){
  window.location.href = "../charsites/charFromServer-display.php?username=" + user + "&filename=" + char + "&session=" + ses;
}