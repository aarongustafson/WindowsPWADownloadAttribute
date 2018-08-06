(function(window, Windows){

  // modern Edge engine only
  if ( ! ('matches' in document.body ) ) return;
  
  document.body.addEventListener('click',function(e){
    if (e.target.matches('a[download]'))
    {
      e.preventDefault();
      download(e.target.href);
    }
  }, false);

  var downloader = new Windows.Networking.BackgroundTransfer.BackgroundDownloader();

  function download(uri)
  {
    console.log('trying to download', uri);

    var filename = uri.split('/').pop(),
        requestOperations = [],
        download;
    
    if ( ! filename || filename == '' )
    {
      filename = 'download-' + (new Date).getTime();
      console.log('created a filename', filename);
    }
    
    // Create the new file to download
    Windows.Storage.DownloadsFolder.createFileAsync(filename, Windows.Storage.CreationCollisionOption.generateUniqueName)
      .done(function(newFile){
        console.log('new file', newFile);

        // set up the download
        download = downloader.createDownload(uri, newFile);
        download.priority = Windows.Networking.BackgroundTransfer.BackgroundTransferPriority.high;
        requestOperations.push(download);

        var requestPromise,
            notImplementedException = -2147467263;

        try {
          requestPromise = Windows.Networking.BackgroundTransfer.BackgroundDownloader.requestUnconstrainedDownloadsAsync(requestOperations);
        }
        catch (error)
        {
          if (error.number === notImplementedException) {
            displayError("BackgroundDownloader.requestUnconstrainedDownloadsAsync is not supported in Windows Phone.");
            return;
          }
          throw error;
        }

        requestPromise.done(function(){
          promise = download.startAsync().then(function(){
            console.log('download complete');
          });
        });

      });

  }

}(this, this.Windows));