const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

export const getTransferPoints = async () => {
  const response = await fetch(`${baseUrl}/getTransferPoints`);
  if (!response.ok) {
    throw new Error('Failed to fetch transfer points');
  }
  return await response.json();
};

export const getVehicles = async () => {
  const response = await fetch(`${baseUrl}/getVehicles`);
  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }

  return await response.json();
};

export const getTestimonials = async () => {
  const response = await fetch(`${baseUrl}/getTestimonials`);
  if (!response.ok) {
    throw new Error('Failed to fetch testimonials');
  }
  return await response.json();
};

export const getDestinations = async () => {
  const response = await fetch(`${baseUrl}/getDestinations`);
  if (!response.ok) {
    throw new Error('Failed to fetch destinations');
  }
  return await response.json();
};

export const getSearchRoute = async (fromId, toId) => {
  const response = await fetch(`${baseUrl}/getSearchRoute?fromId=${fromId}&toId=${toId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch search route');
  }
  return await response.json();
};

export const getStartingPoints = async () => {
  const response = await fetch(`${baseUrl}/getStartingPoints`);
  if (!response.ok) {
    throw new Error('Failed to fetch starting points');
  }
  return await response.json();
};

export const getDestinationPoints = async (url, { arg: startingPointId }) => {
  const response = await fetch(`${baseUrl}/getDestinationPoints?startingPointId=${startingPointId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch destination points');
  }
  return await response.json();
};

export const postSearchQuery = async (url, { arg }) => {
  const response = await fetch(`${baseUrl}/postSearchQuery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error('Failed to create new search query');
  }

  return await response.json();
};

export const getQueryById = async (id) => {
  const response = await fetch(`${baseUrl}/getQueryById?id=${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch query');
  }
  return await response.json();
};

export const getAdditionalServices = async () => {
  const response = await fetch(`${baseUrl}/getAdditionalServices`);
  if (!response.ok) {
    throw new Error('Failed to fetch additional services');
  }
  return response.json();
};

export const getTopDestinations = async () => {
  const response = await fetch(`${baseUrl}/getTopDestinations`);
  if (!response.ok) {
    throw new Error('Failed to fetch destinations services');
  }
  return response.json();
};

export const getLocaleStatic = async (locale = "en") => {
  const response = await fetch(`${baseUrl}/getLocaleStatic`, {
    headers: {
      "accept-language": locale
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch destinations services');
  }
  return response.json();
};

export const createTransfer = async (transferData) => {
  const response = await fetch(`${baseUrl}/createTransfer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transferData),
  });

  if (!response.ok) {
    throw new Error('Failed to create transfer');
  }

  return await response.json();
};