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
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
SkylinkDemo.on('incomingStream', function(peerId, stream, isSelf, peerInfo) {
$.ajax({
  type: "GET",
  url: "https://journlism.herokuapp.com/getstreamid",
  success: function(id){
    if (isSelf) {
      var newObject = clone(stream);
      newObject.id=id;
      console.log(stream);
      console.log(newObject);
      DOMRemoteVideo = document.getElementsByClassName('vid')[0];
      DOMRemoteVideo.setAttribute("id", "remote_" + id);
      if (!DOMRemoteVideo) {
        if (window.webrtcDetectedBrowser !== 'IE') {
          DOMRemoteVideo.setAttribute("autoplay", "autoplay");
        }
        DOMRemoteVideo = document.getElementsByClassName('vid')[0];
        DOMRemoteVideo.setAttribute("id", "remote_" + id);
        var DOMcontainer = document.getElementById("remoteContainer");
        DOMcontainer.appendChild(DOMRemoteVideo);
        DOMRemoteVideo.onclick = function() {
          SkylinkDemo.refreshConnection(peerId);
        };
      }
      attachMediaStream(DOMRemoteVideo, newObject);
    }

  },error:function(err){
  console.log(err);
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
