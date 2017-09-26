var SkylinkDemo = new Skylink();
SkylinkDemo.init(config, function (error, success) {
  if (success) {
    SkylinkDemo.joinRoom({
      audio: true,
      video: true
    });
  }
});
//--------
SkylinkDemo.on('mediaAccessSuccess', function(stream) {
  console.log("mediaAccessSuccess");
});
//--------
SkylinkDemo.on('incomingStream', function(peerId, stream, isSelf, peerInfo) {
$.ajax({
  type: "GET",
  url: "https://journlism.herokuapp.com/getstreamid",
  success: function(id){
    if (!isSelf) {
      DOMRemoteVideo = document.getElementsByClassName("vid")[0];

      if (!DOMRemoteVideo) {
        var DOMvideo = document.getElementById("video1");
        if (window.webrtcDetectedBrowser !== 'IE') {
          DOMRemoteVideo.setAttribute("autoplay", "autoplay");
        }
        console.log(id);
        DOMRemoteVideo.setAttribute("style", "width: 100%; height: 100%;");
        DOMRemoteVideo.setAttribute("id", id);
        DOMRemoteVideo.onclick = function() {
          SkylinkDemo.refreshConnection(peerId);
        };
      }
      console.log(stream);
      console.log(peerInfo);
      attachMediaStream(DOMRemoteVideo, stream);
  }
  }
});

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
