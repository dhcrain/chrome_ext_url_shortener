


document.addEventListener('DOMContentLoaded', function() {

    var credentials = {
      username: "testuser",
      password: "testpass"
    };

    // $.post("http://localhost:8000/api/api-token-auth/", credentials, function(auth) {
    //     console.log("Logged in, auth token: ", auth.token);
    //     chrome.storage.local.set({'token': auth.token}, function() {
    //       console.log('Settings saved');
    //     });
    // });


    function workWithToken(val) {
        console.log(val);
    }

    function getToken(callback) {
        var token = "";
        chrome.storage.local.get('token', function(obj){
            token = obj.token;
            callback(token);
        });
    }

    getToken(workWithToken);

    // var settings = {
    //   "url": "http://localhost:8000/api/short_links/",
    //   "method": "POST",
    //   "headers": {
    //     "authorization": '875f7d1cb1f9f748f5e30bfea1ffdd51ed396504',
    //   },
    //   "data": form
    // };

    var shortenUpButton = document.getElementById('shortenUp');

    shortenUpButton.addEventListener('click', function() {
        var tab;
        chrome.tabs.query({
            active: true,               // Select active tabs
            lastFocusedWindow: true     // In the current window
        }, function(array_of_Tabs) {
            tab = array_of_Tabs[0];
            // var url = tab.url;
            // console.log(url);
        });

        var form = new FormData();
        form.append("title", "title");
        form.append("description", "from chrome desc");
        form.append("url", "https://dhcrain.com");


        $.ajax({
            url: "http://localhost:8000/api/short_links/",
            method: "POST",
            headers: {
              "authorization": "Token 875f7d1cb1f9f748f5e30bfea1ffdd51ed396504",
            },
            data: form,
            processData: false,
            contentType: false,
            success: function(resp) {
                console.log(resp);
                console.log(resp.short_link);
              },
            error: function(req, status, err) {
                console.log('something went wrong', status, err);
            }
        });


    }, false);

}, false);
