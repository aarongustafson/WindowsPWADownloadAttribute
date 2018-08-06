/**
 * PWA in Windows!
 */
if ( 'Windows' in window )
{
  var WinRT_js_files = [
        '/j/WinRT/download.js'
      ],
      script = document.createElement('script');

  WinRT_js_files.forEach(function(filename){
    var js = script.cloneNode(true);
    js.src = filename;
    document.body.appendChild(js);
  });

}

// notifications
function notify(msg)
{
  if ( "Notification" in window) {
    notify = function(){ return; };
    return;
  }
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    new Notification(msg);
  }
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        new Notification(msg);
      }
    });
  }
}