

document.addEventListener('DOMContentLoaded', function() {
    $('#copy-link').hide();

    
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
            var url = tab.url;
            console.log(url);
        });
        console.log(url);

        var form = new FormData();
        form.append("title", "title");
        form.append("description", "from chrome desc");
        form.append("url", "https://dhcrain.com");

        var myToken = "Token " + $(document).data('mysite.option');
        $.ajax({
            url: "http://localhost:8000/api/short_links/",
            method: "POST",
            headers: {
            //   "authorization": myToken,
            },
            data: form,
            processData: false,
            contentType: false,
            success: function(resp) {
                console.log(resp);
                $('#copy-link').show();
                $('#website-link').val(resp.short_link);
              },
            error: function(req, status, err) {
                console.log('something went wrong', status, err);
            }
        });


    }, false);


    /*
      Copy text from any appropriate field to the clipboard
      By Craig Buckler, @craigbuckler
    */
    (function() {
      'use strict';
      // click events
      document.body.addEventListener('click', copy, true);
      // event handler
      function copy(e) {
        // find target element
        var
          t = e.target,
          c = t.dataset.copytarget,
          inp = (c ? document.querySelector(c) : null);
        // is element selectable?
        if (inp && inp.select) {
          // select text
          inp.select();
          try {
            // copy text
            document.execCommand('copy');
            inp.blur();
            // copied animation
            t.classList.add('copied');
            setTimeout(function() { t.classList.remove('copied'); }, 1500);
          }
          catch (err) {
            alert('please press Ctrl/Cmd+C to copy');
          }
        }
      }
    })();

}, false);
