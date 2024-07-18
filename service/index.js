import Strapi from "strapi-sdk-js";
import { createClient } from "@sanity/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337";

export const client = createClient({
  projectId: "nyoyt4tg",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2022-03-07", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

export const getTransferPoints = async () => {
  const query = `*[_type == "transfer_point"]{
        _id,
        name,
        location,
        address,
      }`;

  try {
    const transferPoints = await client.fetch(query);
    return transferPoints;
  } catch (error) {
    console.error("Hata:", error);
  }
};

export const getVehicles = async () => {
  const query = `*[_type == "vehicle"]{
        _id,
        type,
        brand,
        model,
        transmission,
        passengerCapacity,
        features,
        "imageUrl": image.asset->url
      }`;

  try {
    const vehicles = await client.fetch(query);
    return vehicles;
  } catch (error) {
    console.error("Hata:", error);
  }
};

export const getTestimonials = async () => {
  const testimonialQuery = `*[_type == "testimonial"]{
    _id,
    name,
    location,
    rating,
    feedback,
    "photoUrl": photo.asset->url
  }`;

  try {
    const testimonials = await client.fetch(testimonialQuery);
    return testimonials;
  } catch (err) {
    console.error("Error:", err);
  }
};

export const getDestinations = async () => {
  const destinationQuery = `*[_type == "destination"]{
        _id,
        title,
        "location": location->name,
        "imageUrl": image.asset->url
      }`;

  try {
    const destinations = await client.fetch(destinationQuery);
    console.log("Destinations:", destinations);
    return destinations;
  } catch (err) {
    console.error("Error:", err);
  }
};

const strapi = new Strapi({
  url: API_URL,
});

export const getImageUrl = (imageUrl) => {
  return `${API_URL}${imageUrl}`;
};
export const fetchMainNavigaiton = async (locale) => {
  try {
    const response = await strapi.axios.get(
      locale && locale !== "en"
        ? `/navigation/render/main-navigation-${locale}`
        : "/navigation/render/main-navigation"
    );
    return response.data;
  } catch (error) {
    // console.error('Hata:', error)
  }
};

export const fetchVehicles = async () => {
  try {
    const response = await strapi.find("vehicles", {
      populate: "*",
    });
    return response;
  } catch (error) {
    // console.error('Hata:', error)
  }
};

export const fetchPages = async (locale = "en") => {
  try {
    const response = await strapi.find("pages", {
      populate: "*",
      locale,
    });
    return response;
  } catch (error) {
    // console.error('Hata:', error)
  }
};

export const fetchTransferPoints = async () => {
  try {
    const response = await strapi.find("transfer-points");
    return response;
  } catch (error) {
    // console.error('Hata:', error)
  }
};

export const fetchFooterNavigation = async (locale) => {
  try {
    const response = await strapi.axios.get(
      locale && locale !== "en"
        ? `/navigation/render/footer-navigation-${locale}`
        : "/navigation/render/footer-navigation"
    );
    return response.data;
  } catch (error) {
    // console.error('Hata:', error)
  }
};
