import axios from 'axios';

const API_KEY = '0karf2G2XgSyCdDJllUI_v2-ZA0lWWc07J_F_0JiUuM';
const baseURL = 'https://api.unsplash.com/search/photos';

export const getPhotos = async (query, page = 1) => {
  try {
    const response = await axios.get(baseURL, {
      params: {
        query: query,
        page: page,
        per_page: 15,
      },
      headers: {
        'Authorization': `Client-ID ${API_KEY}`,
      },
    });
    return  {
      results: response.data.results,
      total: response.data.total
    };
  } catch (error) {
    console.error('Error fetching photos from Unsplash:', error);
    throw error;
  }
};