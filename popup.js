document.addEventListener('DOMContentLoaded', function() {

var credentials = {
  username: "testuser",
  password: "testpass"
};

$.post("http://localhost:8000/api/api-token-auth/", credentials, function(auth) {
    console.log("Logged in, auth token: ", auth.token);
});

  var shortenUpButton = document.getElementById('shortenUp');

  shortenUpButton.addEventListener('click', function() {

    chrome.tabs.query({
        active: true,               // Select active tabs
        lastFocusedWindow: true     // In the current window
    }, function(array_of_Tabs) {
        var tab = array_of_Tabs[0];
        var url = tab.url;
        console.log(url);
    });

  }, false);

}, false);
