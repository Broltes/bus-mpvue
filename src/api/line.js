import Http from '../common/http';

export function listNearby([lon, lat]) {
  return Http.get(`/api/line/nearby/${lon},${lat}`);
}

export function search(keyword) {
  return Http.get(`/api/line/search/${keyword}`);
}

export function fetchDetail(lineName) {
  return Http.get(`/api/line/${lineName}`);
}

export function fetchState(params) {
  return Http.get('/api/line/state', { params });
}
