export const deliveryConfig = {
  // Exact cloud kitchen coordinates for Eden Garden Canal Road, Faisalabad, Punjab, Pakistan.
  kitchen: { latitude: 31.4333, longitude: 73.1028 },
  radiusKm: 5,
} as const;

export const deliveryFeeText = "Delivery fee is Rs. 100 for 0–2 km and Rs. 150 for 2–5 km.";

export function calculateDistanceKm(
  from: { latitude: number; longitude: number },
  to: { latitude: number; longitude: number },
) {
  const earthRadiusKm = 6371;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDelta = toRadians(to.latitude - from.latitude);
  const longitudeDelta = toRadians(to.longitude - from.longitude);
  const a = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(toRadians(from.latitude)) * Math.cos(toRadians(to.latitude)) * Math.sin(longitudeDelta / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
