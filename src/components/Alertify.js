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
}

export default new Alertify();
