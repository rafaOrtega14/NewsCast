var SkylinkDemo = new Skylink();
SkylinkDemo.init(config, function (error, success) {
  if (success) {
    SkylinkDemo.joinRoom({
      audio: false,
      video: false
    });
  }
});
//--------
SkylinkDemo.on('mediaAccessSuccess', function(stream) {
  console.log("mediaAccessSuccess");
});
//--------
SkylinkDemo.on('incomingStream', function(peerId, stream, isSelf, peerInfo) {
  if (!isSelf) {
    console.log("addPeerStream");
    DOMRemoteVideo = document.getElementById("remote_" + peerId);

    if (!DOMRemoteVideo) {
      DOMRemoteVideo = document.createElement('video');
      DOMRemoteVideo.className += "videito";
      if (window.webrtcDetectedBrowser !== 'IE') {
        DOMRemoteVideo.setAttribute("autoplay", "autoplay");
      }
      $.ajax({
        type: "GET",
        url: "https://journlism.herokuapp.com/getstreamid",
        success: function(id){
          DOMRemoteVideo.setAttribute("id", "remote_" + id);
          var DOMcontainer = document.getElementById("remoteContainer");
          DOMcontainer.appendChild(DOMRemoteVideo);
          DOMRemoteVideo.onclick = function() {
            SkylinkDemo.refreshConnection(msg);
          };
        }
      });

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
