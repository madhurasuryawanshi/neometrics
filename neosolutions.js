var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

window.onload = function(){
   $.ajax('https://geoip-db.com/json/')
  .then(
      function success(response) {
          sendData({pageview:document.title,time: new Date().toUTCString(),location:response})
          return response;
      },

      function fail(data, status) {
          console.log('Request failed.  Returned status of',
                      status);
      }
  );

}
function onClick (tags) {

  $.ajax('https://geoip-db.com/json/')
  .then(
      function success(response) {
             sendData({tag:tags,time: new Date().toUTCString(),location:response});
          return response;
      },

      function fail(data, status) {
          console.log('Request failed.  Returned status of',
                      status);
      }
  );
}
function clickOrigin(e){
    var target = e.target;
    var tag = [];
    tag.tagType = target.tagName.toLowerCase();
    tag.tagClass = target.className;
    tag.id = target.id;
    tag.parent = target.parentNode.tagName.toLowerCase();
    tag.attr =target.textContent 
    console.log(target)
    return tag;
}

document.onclick = function(e){
    elem = clickOrigin(e);
    onClick(elem.attr)
};

function sendData(d){
$.ajax({
  method: "POST",
  url: "https://3.87.172.159:443",
  data: JSON.stringify(d),
  contentType: 'application/json',
}).then(
      function success(response) {
         return ;
      },

      function fail(data, status) {
          console.log('Request failed.  Returned status of',
                      status);
      }
  );

}


