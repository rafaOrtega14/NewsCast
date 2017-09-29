var SkylinkDemo = new Skylink(); //Stream library definition
/* Just to make stream full scream */
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
//hiding some stream elements
$("#wrapper").hide();
$("#myVideo").hide();
//--------
SkylinkDemo.on('mediaAccessSuccess', function(stream) { //media is avaliable so...
  console.log(stream);
  $("#vid").fadeOut(); //we hide content
  $("#myVideo").show(); //show video stream
  $("#wrapper").show(); //show button to end stream
  attachMediaStream(document.getElementById("myVideo"), stream);
});
//--------
SkylinkDemo.on('incomingStream', function(peerId, stream, isSelf, peerInfo) {

  if (!isSelf) {
    DOMRemoteVideo = document.getElementById("remote_" + peerId);

    if (!DOMRemoteVideo) {
      DOMRemoteVideo = document.createElement('video');
      DOMRemoteVideo.setAttribute("style", "width: 100%; height: 100%;");
      if (window.webrtcDetectedBrowser !== 'IE') {
        DOMRemoteVideo.setAttribute("autoplay", "autoplay");
      }
      DOMRemoteVideo.setAttribute("id", "remote_" + peerId);
      var DOMcontainer = document.getElementById("remoteContainer");
      DOMcontainer.appendChild(DOMRemoteVideo);
      DOMRemoteVideo.onclick = function() {
        SkylinkDemo.refreshConnection(peerId);
      };
    }
    attachMediaStream(DOMRemoteVideo, stream);
  }else{
    $.ajax({
      type: 'POST',
      url: 'https://journlism.herokuapp.com/InsertStreamid',
      data: {
          'id': stream.id,
          'room': peerInfo.room        /* AJAX Call to start stream pass info like id room */
      },
      success: function(msg){
          console.log(msg);
      }
  });
  }

});
//--------
SkylinkDemo.on('streamEnded', function(peerID, peerInfo, isSelf) {
  if (!isSelf) {
    var DOMvideo = document.getElementById("remote_" + peerID);
    // fix for domvideo not defined
    if (DOMvideo) {
      var DOMcontainer = document.getElementById("remoteContainer");
      DOMvideo.src = '';
      DOMcontainer.removeChild(DOMvideo);
    }
  }else{
    $.ajax({
      type: "GET",
      url: "https://journlism.herokuapp.com/EndStream",
      success: function(msg){
        console.log(msg)
      }
    });
  }


});
//--------
SkylinkDemo.on('peerLeft', function(peerID) {
  console.log("peerLeft");
  var DOMvideo = document.getElementById("remote_" + peerID);
  // fix for domvideo not defined
  if (DOMvideo) {
    var DOMcontainer = document.getElementById("remoteContainer");
    DOMvideo.src = '';
    DOMcontainer.removeChild(DOMvideo);
  }
});
//function to watch other's people streams
function watchStream(room){
  var url="https://journlism.herokuapp.com/watch?room="+room;
  var data=data{
  'To':'0034618227956',
  'From':'2B34911067304',
  'Body':'Terrible terremote on ireland'+url
}
$.ajax({
url:"https://AC375edcf5add139df1fb3c4b3d48943d6:e56eaee02ce230889aa65f7e18e443a1@tadhack.restcomm.com/restcomm/2012-04-24/Accounts/AC375edcf5add139df1fb3c4b3d48943d6/SMS/Messages",
type:"POST",
data:data,
contentType:"application/json",
dataType:"json",
success: function(msg){
  console.log(msg);
}
});
    window.location.replace(url);
}
//function to endStream just put live to false
function EndStream(){
  $.ajax({
    type: "GET",
    url: "https://journlism.herokuapp.com/EndStream",
    success: function(msg){
      window.location.replace("https://journlism.herokuapp.com/");
    }
  });
}
//Function to begin the process of streaming
function begintoStream(){
    $(".mdl-layout__content").hide();
  SkylinkDemo.init(config, function (error, success) {
    if (success) {
      SkylinkDemo.joinRoom({
        audio: true,
        video: true
      });
    }
  });
}
