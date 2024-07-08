import Strapi from "strapi-sdk-js"

const strapi = new Strapi()

export const fetchVehicles = async () => {
    const response = await strapi.find("vehicles")
    return response
}