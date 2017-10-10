

document.addEventListener('DOMContentLoaded', function() {

    var shortenUpButton = document.getElementById('shortenUp');

    shortenUpButton.addEventListener('click', function() {

      getCurrentTab().then(function(tab){
        var form = new FormData();
        form.append("title", tab.title);
        form.append("description", "Shortened with Chrome Extension");
        form.append("url", tab.url);

        $.ajax({
            url: "http://localhost:8000/api/short_links/",
            method: "POST",
            data: form,
            processData: false,
            contentType: false,
            success: function(resp) {
                $('#copy-link').show();
                $('#website-link').val(resp.short_link);
              },
            error: function(req, status, err) {
                console.log('something went wrong', status, err);
            }
        });
      });
    }, false);



    function getCurrentTab(){
      return new Promise(function(resolve, reject){
        chrome.tabs.query({
          // active: true,               // Select active tabs
          lastFocusedWindow: true     // In the current window
        }, function(tabs) {
          resolve(tabs[0]);
        });
      });
    }


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
