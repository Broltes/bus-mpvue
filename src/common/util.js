/**
 * 函数去抖
 * 执行会被推迟到最后一次调用的空闲时间阀值后。
 * @param {Function} action
 * @param {Number} idle
 */
export function debounce(action, idle) {
  let tid;

  return function (...args) {
    clearTimeout(tid);
    tid = setTimeout(() => action.apply(this, args), idle);
  };
}

export async function locateCoordinates() {
  const { longitude, latitude } = await new Promise((resolve) => {
    wx.getLocation({
      success(res) {
        resolve(res);
      },
    });
  });

  return [longitude, latitude];
}
