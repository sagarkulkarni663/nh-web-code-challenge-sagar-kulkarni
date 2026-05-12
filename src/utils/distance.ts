import { COORDS } from "../data/coords";

export type DistanceMode = "random" | "haversine";

type Coord = { lat: number; lng: number };

const degToRadians = (deg: number) => deg * Math.PI / 180;

const haversine = (from: Coord, to: Coord) => {
  const latDiff = degToRadians(to.lat - from.lat);
  const lngDiff = degToRadians(to.lng - from.lng);
  const fromLat = degToRadians(from.lat);
  const toLat = degToRadians(to.lat);

  const a =
    Math.sin(latDiff / 2) ** 2 +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lngDiff / 2) ** 2;
  return 2 * 3959 * Math.asin(Math.sqrt(a));
};

export const getDistance = (
  fromAddress: string,
  toAddress: string,
  mode: DistanceMode,
) => {
  if (mode === "haversine") {
    const from = COORDS[fromAddress];
    const to = COORDS[toAddress];
    if (from && to) return haversine(from, to);
  }
  return Math.random() * 99 + 1;
};
