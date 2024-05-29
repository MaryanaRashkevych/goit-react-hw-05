import axios from 'axios';

const authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWQ1Zjg4YTkyNGVkZDlmOGIxNjg5ZjJjNjQzYjA1NyIsInN1YiI6IjY2NTRjZDI4YjA4ODIwNzgzZGE2NmNjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8n7clwQdYJDTMmYG1I7BQwBSdiB_-rpn1n7uYKn8ATw'

const baseURL = 'https://api.themoviedb.org/3/trending/movie/day';

export const getTrendMovies = async (page = 1) => {
  try {
    const response = await axios.get(baseURL, {
      params: { page },
      headers: {
        Authorization: authorization,
      },
    });
    return {
      results: response.data.results,
      total: response.data.total,
    };
  } catch (error) {
    console.error('Error fetching movies from TMDB:', error);
    throw error;
  }
};

  // export const getMoviesById = async  (movieId)=>{
  //   const response = await axios get(baseURL, )
  // }

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWQ1Zjg4YTkyNGVkZDlmOGIxNjg5ZjJjNjQzYjA1NyIsInN1YiI6IjY2NTRjZDI4YjA4ODIwNzgzZGE2NmNjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8n7clwQdYJDTMmYG1I7BQwBSdiB_-rpn1n7uYKn8ATw'
//   }
// };
// 
// fetch('https://api.themoviedb.org/3/trending/movie/day', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

// const API_KEY = '0karf2G2XgSyCdDJllUI_v2-ZA0lWWc07J_F_0JiUuM';
// const baseURL = 'https://api.unsplash.com/search/photos';

// export const getPhotos = async (query, page = 1) => {
//   try {
//     const response = await axios.get(baseURL, {
//       params: {
//         query: query,
//         page: page,
//         per_page: 15,
//       },
//       headers: {
//         'Authorization': `Client-ID ${API_KEY}`,
//       },
//     });
//     return  {
//       results: response.data.results,
//       total: response.data.total
//     };
//   } catch (error) {
//     console.error('Error fetching photos from Unsplash:', error);
//     throw error;
//   }
// };