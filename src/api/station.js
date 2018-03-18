import Http from '../common/http';

export function listNearby([lon, lat]) {
  return Http.get(`/api/station/nearby/${lon},${lat}`);
}

export function search(keyword) {
  return Http.get(`/api/station/search/${keyword}`);
}

export function fetchLines(stopId) {
  return Http.get(`/api/station/${stopId}/lines`);
}

export function fetchReverseStation(stopId, name) {
  return Http.get(`/api/station/reverse/${stopId}/${name}`);
}
