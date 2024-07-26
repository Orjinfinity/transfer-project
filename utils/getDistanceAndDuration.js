import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export const getRouteDistanceAndDuration = async (origin, destination) => {
  try {
    const response = await client.directions({
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        origin,
        destination,
        mode: "driving",
      },
    });

    if (response?.data?.routes?.length) {
      const route = response.data.routes[0];
      // const distance = route.legs[0].distance.value / 1000; // Kilometreye dönüştür
      // const duration = route.legs[0].duration.value / 60; // Dakikaya dönüştür

      // console.log(`Mesafe: ${distance.toFixed(2)} km`);
      // console.log(`Süre: ${duration.toFixed(0)} dakika`);

      const {distance, duration} = route.legs[0];
      return {
        distance,
        duration
      }

      // Rota bilgilerini bir haritada görselleştirmek için Google Maps JavaScript API'yi kullanın
    } else {
      throw new Error("No routes found");
    }
  } catch (error) {
    console.error("Rota bilgileri alınırken bir hata oluştu:", error);
    return null;
  }
};
