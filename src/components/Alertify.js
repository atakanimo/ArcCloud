import alertify from 'alertifyjs';

class Alertify {
  SuccessNotifications = (message, time = 2.5) => {
    alertify.set('notifier', 'delay', time);
    return alertify.success(message);
  };
  ErrorNotifications = (message, time = 2.5) => {
    alertify.set('notifier', 'delay', time);
    return alertify.error(message);
  };
  ConfirmNotification = (title, message, confirmOK, confirmCancel) => {
    return alertify.confirm(
      title,
      message,
      function () {
        return confirmOK();
      },
      function () {
        return confirmCancel();
      },
    );
  };
}

export default new Alertify();
