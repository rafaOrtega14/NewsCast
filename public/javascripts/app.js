var SkylinkDemo = new Skylink();
document.body.requestFullscreen();
$("#myVideo").hide();
//--------
SkylinkDemo.on('mediaAccessSuccess', function(stream) {
  console.log(stream);
  $("#vid").fadeOut();
  $("#myVideo").show();
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
        'room': peerInfo.room // <-- the $ sign in the parameter name seems unusual, I would avoid it
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
//--------
SkylinkDemo.on('streamEnded', function(peerID, peerInfo, isSelf) {
  if (!isSelf) {
    console.log("streamEnded");
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
  SkylinkDemo.init(config, function (error, success) {
    if (success) {
      SkylinkDemo.joinRoom({
        audio: true,
        video: true
      });
    }
  });
}
