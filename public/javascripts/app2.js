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
      console.log(id);
      console.log(peerId);
      $(".vid").attr("id","remote_"+ id);
      }
      attachMediaStream($(".vid"), stream);
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
