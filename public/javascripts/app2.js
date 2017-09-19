var SkylinkDemo = new Skylink();

//--------
SkylinkDemo.on('mediaAccessSuccess', function(stream) {
  console.log("mediaAccessSuccess");
  attachMediaStream(document.getElementById("myVideo"), stream);
});
//--------
/*SkylinkDemo.on('incomingStream', function(peerId, stream, isSelf, peerInfo) {
    if (!isSelf) {
      DOMRemoteVideo = document.getElementById("remote_" + peerId);

      if (!DOMRemoteVideo) {
        DOMRemoteVideo = document.createElement('video');
        DOMRemoteVideo.setAttribute("style", "width: 100%; height: 100%");
        if (window.webrtcDetectedBrowser !== 'IE') {
          DOMRemoteVideo.setAttribute("autoplay", "autoplay");
        }
        DOMRemoteVideo.setAttribute("id", "remote_" + peerId);
        var DOMcontainer = document.getElementById("remoteContainer");
        DOMcontainer.setAttribute("style", "width: 100%; height: 100%");
        DOMcontainer.appendChild(DOMRemoteVideo);
        DOMRemoteVideo.onclick = function() {
          SkylinkDemo.refreshConnection(peerId);
        };
      }
      attachMediaStream(DOMRemoteVideo, stream);
  }
});*/
skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
  if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
  var vid = document.createElement('video');
  vid.autoplay = true;
  vid.muted = true; // Added to avoid feedback when testing locally
  vid.id = peerId;
  document.body.appendChild(vid);
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

  SkylinkDemo.init(config, function (error, success) {
    if (success) {
      SkylinkDemo.joinRoom({
        audio: true,
        video: true
      });
    }
  });
