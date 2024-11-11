import axios from 'axios';

// Note: It will be a good practice to move the BASE_URL to an env variable for better flexibility and security
const BASE_URL = 'https://fake-api.tractian.com';

// Fetches the list of companies:
export const getCompanies = async () => {
  const response = await axios.get(`${BASE_URL}/companies`);
  return response.data;
};

// Fetches the locations for a specific company:
export const getLocations = async (companyId: string) => {
  const response = await axios.get(
    `${BASE_URL}/companies/${companyId}/locations`,
  );
  return response.data;
};

// Fetches the assets for a specific company:
export const getAssets = async (companyId: string) => {
  const response = await axios.get(`${BASE_URL}/companies/${companyId}/assets`);
  return response.data;
};
