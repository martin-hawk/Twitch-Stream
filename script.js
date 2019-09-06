// streamers list
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "martin_hawk"];
// function to get Channels
function getStreams() {
  // for each list item (streamer channel)
  streamers.forEach(function(streamer) {
    // build url for channel / stream + streamer name
    function urlBuild(type, name) {
      return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?callback=?';
    };
    // gets JSON with streaming channels
    $.getJSON(urlBuild("streams", streamer), function(data) {
      var status;
      if (data.stream === null) {
        status = "offline";
        console.log(status);
      } else if (data.stream === undefined) {
        status = "closed"
        console.log(status);
      } else {
        status = "online";
        console.log(status);
      };
      // gets JSON with channel information
      $.getJSON(urlBuild("channels", streamer), status, function(data) {
        var description;
        var url = data.url;
        // check if logo exists
        var logo = (data.logo != null) ? data.logo : 'https://dl.dropboxusercontent.com/u/93114194/6.%20Twitch%20stream/img/unknown-user.png';
        // check if display name exists
        var name = (data.display_name !== null) ? data.display_name : streamer;
        // show corresponding description
        if (status == "online") {
          description = data.game + " -- " + data.status;
        } else if (status == "offline") {
          description = "Offline";
        } else {
          description = "Account closed";
        }
        // construct the entry with information
        var html = '<div id="' + status + '" class="container entry"><div class="row"> <div class="col-md-2"> <img class="avatar" src="' + logo + '" alt="User avatar"> </div><div class="col-md-3 user"> <a href="' + url + '" target="_blank"><b>' + streamer + '</b></a></div><div class="col-md-6 description">' + description + '</div> </div> </div>';
        // append html code with entry code (if online - use prepend)
        status === "online" ? $(".contents").prepend(html) : $(".contents").append(html);
      });
    });
  });
}
// $(document).ready function
$(document).ready(function() {
  // get channels from server
  getStreams();
  // show online users
  $(".circle-green").click(function() {
    $(".circle").removeClass("hover");
    $(this).addClass("hover");
    $("#closed.entry").animate({ height: 'hide' }, "slow");
    $("#offline.entry").animate({ height: 'hide' }, "slow");
    $("#online.entry").animate({ height: 'show' }, "slow");
  });
  // show offline users
  $(".circle-red").click(function() {
    $(".circle").removeClass("hover");
    $(this).addClass("hover");
    $("#online.entry").animate({ height: 'hide' }, "slow");
    $("#closed.entry").animate({ height: 'hide' }, "slow");
    $("#offline.entry").animate({ height: 'show' }, "slow");
  });
  // show all users (including closed)
  $(".circle-grey").click(function() {
    $(".circle").removeClass("hover");
    $(this).addClass("hover");
    $("#online.entry").animate({ height: 'show' }, "slow");
    $("#closed.entry").animate({ height: 'show' }, "slow");
    $("#offline.entry").animate({ height: 'show' }, "slow");
  });
});