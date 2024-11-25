import axios from 'axios';
import {Movie, MovieDetails} from '../interface/movie';

// Base API URL
const API_BASE_URL = 'https://search.imdbot.workers.dev/';

// Fetch random 10 movies
export const fetchRandomMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}?q=random`);
    return response.data.description.slice(0, 10).map((movie: any) => ({
      id: movie['#IMDB_ID'],
      title: movie['#TITLE'],
      poster: movie['#IMG_POSTER'],
      year: movie['#YEAR'],
      rank: movie['#RANK'],
      actors: movie['#ACTORS'] || 'Not Available',
      description: movie['#DESCRIPTION'] || 'No description available',
      imdbUrl: movie['#IMDB_URL'],
      imdbIv: movie['#IMDB_IV'],
      aka: movie['#AKA'],
      photoWidth: movie['photo_width'],
      photoHeight: movie['photo_height'],
    }));
  } catch (error) {
    console.error('Error fetching random movies:', error);
    return [];
  }
};

// Search movies based on query (limit to 10)
export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}?q=${query}`);
    return response.data.description.slice(0, 10).map((movie: any) => ({
      id: movie['#IMDB_ID'],
      title: movie['#TITLE'],
      poster: movie['#IMG_POSTER'],
      year: movie['#YEAR'],
      rank: movie['#RANK'],
      actors: movie['#ACTORS'] || 'Not Available',
      description: movie['#DESCRIPTION'] || 'No description available',
      imdbUrl: movie['#IMDB_URL'],
      imdbIv: movie['#IMDB_IV'],
      aka: movie['#AKA'],
      photoWidth: movie['photo_width'],
      photoHeight: movie['photo_height'],
    }));
  } catch (error) {
    console.error('Error searching for movies:', error);
    return [];
  }
};

// Get movie details by ID
export const getMovieDetails = async (
  id: string,
): Promise<MovieDetails | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}?tt=${id}`);

    console.log('Movie details response:', response.data);

    const movieDetails = response.data.short;

    if (!movieDetails) {
      console.error(`No movie details found for ID: ${id}`);
      return null;
    }
    return {
      short: {
        '@context': movieDetails['@context'] || 'https://schema.org',
        '@type': movieDetails['@type'] || 'Movie',
        url: movieDetails.url,
        name: movieDetails.name,
        image: movieDetails.image,
        description: movieDetails.description || 'No description available',
        review: movieDetails.review
          ? {
              '@type': movieDetails.review['@type'],
              itemReviewed: movieDetails.review.itemReviewed,
              author: movieDetails.review.author,
              dateCreated: movieDetails.review.dateCreated,
              inLanguage: movieDetails.review.inLanguage,
              name: movieDetails.review.name,
              reviewBody: movieDetails.review.reviewBody,
              reviewRating: movieDetails.review.reviewRating,
            }
          : undefined,
        aggregateRating: movieDetails.aggregateRating || undefined,
        contentRating: movieDetails.contentRating,
        genre: movieDetails.genre || [],
        datePublished: movieDetails.datePublished,
        keywords: movieDetails.keywords,
        trailer: movieDetails.trailer
          ? {
              '@type': movieDetails.trailer['@type'],
              name: movieDetails.trailer.name,
              embedUrl: movieDetails.trailer.embedUrl,
              thumbnail: movieDetails.trailer.thumbnail,
              thumbnailUrl: movieDetails.trailer.thumbnailUrl,
              url: movieDetails.trailer.url,
              description: movieDetails.trailer.description,
              duration: movieDetails.trailer.duration,
              uploadDate: movieDetails.trailer.uploadDate,
            }
          : undefined,
        actor: movieDetails.actor || [],
        director: movieDetails.director || [],
        creator: movieDetails.creator || [],
        duration: movieDetails.duration,
      },
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};
