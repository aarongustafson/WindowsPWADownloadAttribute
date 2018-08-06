(function(window, Windows){

  var Notifications = Windows.UI.Notifications,
      NotificationManager = Notifications.ToastNotificationManager,
      template = Notifications.ToastTemplateType.toastText01,
      toastXML = NotificationManager.getTemplateContent(Notifications.ToastTemplateType[template]);

  window.toast = function( msg ){
    toastXML.getElementsByTagName("text")[0].innerText = msg;
    var notification = new Notifications.ToastNotification(toastXML);
    NotificationManager.createToastNotifier().show(notification);
  }

}(this, this.Windows));