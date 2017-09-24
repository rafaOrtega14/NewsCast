var SkylinkDemo = new Skylink();
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
$("#wrapper").hide();
$("#myVideo").hide();
//--------
SkylinkDemo.on('mediaAccessSuccess', function(stream) {
  console.log(stream);
  $("#vid").fadeOut();
  $("#myVideo").show();
  $("#wrapper").show();
  attachMediaStream(document.getElementById("myVideo"), stream);
});
//--------
SkylinkDemo.on('incomingStream', function(peerId, stream, isSelf, peerInfo) {
  console.log(peerInfo.room);
  $.ajax({
    type: 'POST',
    url: 'https://journlism.herokuapp.com/InsertStreamid',
    data: {
        'id': peerId,
        'room': peerInfo.room //
    },
    success: function(msg){
        console.log('wow' + msg);
    }
});
  if (!isSelf) {
    DOMRemoteVideo = document.getElementById("remote_" + peerId);

    if (!DOMRemoteVideo) {
      DOMRemoteVideo = document.createElement('video');
      DOMRemoteVideo.setAttribute("style", "width: 320px; height: 240px;");
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
  }

});
function EndStream(){
  $.ajax({
    type: "GET",
    url: "https://journlism.herokuapp.com/EndStream",
    success: function(msg){
      console.log(msg);
    }
  });
}
//--------
SkylinkDemo.on('streamEnded', function(peerID, peerInfo, isSelf) {
  if (!isSelf) {
    $.ajax({
      type: "GET",
      url: "https://journlism.herokuapp.com/EndStream",
      success: function(msg){
        console.log(msg)
      }
    });
    var DOMvideo = document.getElementById("remote_" + peerID);
    // fix for domvideo not defined
    if (DOMvideo) {
      var DOMcontainer = document.getElementById("remoteContainer");
      DOMvideo.src = '';
      DOMcontainer.removeChild(DOMvideo);
    }
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
