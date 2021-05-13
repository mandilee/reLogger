// ==UserScript==
// @name         NPC Random Event Logger
// @version      0.4
// @description  Sends random events in real time to the NPC Logs Discord Server
// @author       plushies
// @include      https://neopetsclassic.com/*
// @include      https://www.neopetsclassic.com/*
// @noframes
// @grant        none
// @namespace https://greasyfork.org/users/759679
// ==/UserScript==

/////////////////////////////////////////////////


/// CHANGE THIS URL TO SET A CUSTOM AVATAR FOR YOUR RE LOGS! ///

var profilePic = "https://neopetsclassic.com/images/items/petpet_kiko.gif"

/////////////////////////////////////////////////

var storage;
localStorage.getItem("reLogs==") != null ? storage = JSON.parse(localStorage.getItem("reLogs==")) : storage = {user: ""};

function sendMessage()
    {
        console.log("starting function sendMessage()");
        var destination = "https://discord.com/api/webhooks/842068036093870140/j7ArqsOyrR9gxihHMXqB7dsi9vEDbPoKOo1LindlJvs-NSfmm4b9Hzp0lYT_reJXzjab"
        var request = new XMLHttpRequest();

        request.open("POST", destination);
        request.setRequestHeader('Content-type', 'application/json');
        console.log("request open!");
        var params =
          {
              "content": null,
              "embeds":
              [
                  {
                      "title": "Something has happened!",
                      "description": re,
                      "color": 16777164,

                      "author":
                      {
                          "name": storage.user,
                          "url": "https://neopetsclassic.com/userlookup/?user=" + storage.user,
                          "icon_url": profilePic
                      },

                      "thumbnail":
                      {
                          "url": rePic
                      },
                      "footer": {
                          "text": ""
                      },
                      "timestamp": date,

                  }
              ]
          }


      request.send(JSON.stringify(params));
        console.log("request sent!");
    }


/////////////////////////////////////////////////

var date = new Date();
var pageHTML = document.body.innerHTML;
var re = "";
var rePic = "";
var user = "";


//On the re result page, collect info and push it to the bot.


if(pageHTML.indexOf("Something has happened!") !== -1)
{
    console.log("RE detected!!");
      user = document.getElementsByClassName("tt");
      user = user[0];
      user = user.getElementsByTagName("a")[0].getAttribute('href');
      user = user.replace("/userlookup/?user=", "");
      console.log("current user = " + user);

    if (user !== storage.user)
    {
      storage.user = user
      localStorage.setItem("reLogs==", JSON.stringify(storage));
      console.log(storage.user + " saved as username.");
    }
    else
    {
        console.log(storage.user + " is already saved as username.");
    }


    re = document.querySelector(".txt").innerText
    console.log(re + " (re text)");
    rePic = document.getElementsByClassName("rimg")[0]
    rePic = rePic.getElementsByTagName("img")[0].getAttribute('src');
    console.log(rePic + " (re image");

    if (rePic.indexOf("neopetsclassic.com") !== -1)
    {
        console.log("re pic unchanged, keeping as " + rePic);
    }
    else
    {
        console.log("re pic missing the neopetsclassic.com part. before: " + rePic);

        rePic = "https://neopetsclassic.com" + rePic

        console.log("rePic url changed to " + rePic);
    }

sendMessage();


}
else
{
    console.log("no RE to send!")
}

    


