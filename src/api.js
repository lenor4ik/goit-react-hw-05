import axios from "axios";
import {BASE_URL, TOKEN} from "./constants/index.js";

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day?language=en-US`, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getMovieDetails = async (movieId) => {
 try {
   const response = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
   return response.data;
 } catch (error) {
   console.error(error);
 }
}

export const getMovieCast = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getMovieByQuery = async (query, page = 1, includeAdult = false) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie?query=${query}&language=en-US&page=${page}&include_adult=${includeAdult}`, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
