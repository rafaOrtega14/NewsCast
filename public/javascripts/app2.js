var SkylinkDemo = new Skylink();

//--------
SkylinkDemo.on('mediaAccessSuccess', function(stream) {
  console.log("mediaAccessSuccess");
});
//--------
SkylinkDemo.on('incomingStream', function(peerId, stream, isSelf, peerInfo) {
var http = new XMLHttpRequest();
var url = "https://journlism.herokuapp.com/getstreamid";
http.open("GET", url, true);

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
      if (!isSelf) {
        DOMRemoteVideo = document.getElementById("remote_" + peerId);

        if (!DOMRemoteVideo) {
          DOMRemoteVideo = document.getElementsByClassName("vid")[0];
          if (window.webrtcDetectedBrowser !== 'IE') {
            DOMRemoteVideo.setAttribute("autoplay", "autoplay");
          }
          console.log(http.responseText);
          DOMRemoteVideo.setAttribute("id", http.responseText);
          DOMRemoteVideo.onclick = function() {
            SkylinkDemo.refreshConnection(peerId);
          };
        }
        attachMediaStream(DOMRemoteVideo, stream);
    }
    }
}
http.send();
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
        audio: false,
        video: false
      });
    }
  });
