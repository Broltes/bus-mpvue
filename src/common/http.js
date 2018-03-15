import loading from '@/base/loading';

const defaultConfig = {
  host: '',
  method: 'get',
};

/**
 * Simply serialize an object to a URL-encoded query string
 */
export function param(obj) {
  const params = [];

  Object.keys(obj).forEach((key) => {
    params.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  });

  return params.join('&');
}

export function request(config) {
  config = Object.assign({}, defaultConfig, config);
  config.method = config.method.toUpperCase();
  config.url = config.host + config.url;
  if (config.params) {
    config.url += `?${param(config.params)}`;
  }

  return new Promise((resolve, reject) => {
    loading.show();

    wx.request({
      url: config.url,
      method: config.method,
      data: config.data,
      success(res) {
        const { statusCode } = res;
        if (statusCode < 400) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail(err) {
        reject(err);
      },
      complete() {
        loading.hide();
      },
    });
  });
}

export default class Http {
  static config(config) {
    Object.assign(defaultConfig, config);
  }

  static get(url, config) {
    return request({
      ...config,
      method: 'get',
      url,
    });
  }

  static post(url, data, config) {
    return request({
      ...config,
      method: 'post',
      data,
      url,
    });
  }
}
