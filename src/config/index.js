export const envDic = {
  prod: 'production',
  dev: 'development',
};

export const env = process.env.NODE_ENV// && envDic.prod;

export const http = {
  host: env === envDic.prod ? 'https://bus.broltes.com' : 'http://localhost:18080',
};
