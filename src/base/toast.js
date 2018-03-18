function show({ icon = 'none', message, duration = 2e3 }) {
  wx.showToast({
    message,
    icon,
    duration,
  });
}

export default {
  show,
  success(message, duration) {
    show({
      icon: 'success',
      message,
      duration,
    });
  },
  message(message, duration) {
    show({
      message,
      duration,
    });
  },
};
