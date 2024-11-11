import axios from 'axios';

const BASE_URL = 'https://fake-api.tractian.com';

export const getCompanies = async () => {
  const response = await axios.get(`${BASE_URL}/companies`);
  return response.data;
};

export const getLocations = async (companyId: string) => {
  const response = await axios.get(
    `${BASE_URL}/companies/${companyId}/locations`,
  );
  return response.data;
};

export const getAssets = async (companyId: string) => {
  const response = await axios.get(`${BASE_URL}/companies/${companyId}/assets`);
  return response.data;
};
