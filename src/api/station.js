import Http from '../common/http';

export function listNearby([lon, lat]) {
  return Http.get(`/api/station/nearby/${lon},${lat}`);
}

export function fetchLines(stopId) {
  return Http.get(`/api/station/${stopId}/lines`);
}
