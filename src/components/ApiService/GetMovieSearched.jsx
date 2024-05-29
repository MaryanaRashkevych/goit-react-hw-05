
import axios from 'axios';

const authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWQ1Zjg4YTkyNGVkZDlmOGIxNjg5ZjJjNjQzYjA1NyIsInN1YiI6IjY2NTRjZDI4YjA4ODIwNzgzZGE2NmNjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8n7clwQdYJDTMmYG1I7BQwBSdiB_-rpn1n7uYKn8ATw';

const baseURL = 'https://api.themoviedb.org/3/search/movie';

export const getMovieSearched = async (query) => {
  try {
    const response = await axios.get(baseURL, {
      params: {
        query: query,
      },
      headers: {
        Authorization: authorization,
      }
    });
    return response.data;  
  } catch (error) {
    console.error('Error fetching movies from TMDB:', error);
    throw error;
  }
};
