/**
 * PWA in Windows!
 */
if ( 'Windows' in window )
{
  var WinRT_js_files = [
        '/j/WinRT/download.js',
        '/j/WinRT/toast.js'
      ],
      script = document.createElement('script');

  WinRT_js_files.forEach(function(filename){
    var js = script.cloneNode(true);
    js.src = filename;
    document.body.appendChild(js);
  });

}