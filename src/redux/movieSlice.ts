import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchRandomMovies,
  searchMovies,
  getMovieDetails,
} from '../sdk/movieApi';
import {Movie, MovieDetails} from '../interface/movie';

export const loadRandomMovies = createAsyncThunk(
  'movies/loadRandomMovies',
  async () => await fetchRandomMovies(),
);

export const searchMoviesByQuery = createAsyncThunk(
  'movies/searchMovies',
  async (query: string) => await searchMovies(query),
);

export const loadMovieDetails = createAsyncThunk(
  'movies/loadMovieDetails',
  async (id: string) => await getMovieDetails(id),
);

interface MovieState {
  randomMovies: Movie[];
  searchResults: Movie[];
  selectedMovie: MovieDetails | null;
  loading: boolean;
}

const initialState: MovieState = {
  randomMovies: [],
  searchResults: [],
  selectedMovie: null,
  loading: false,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadRandomMovies.pending, state => {
        state.loading = true;
      })
      .addCase(
        loadRandomMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.randomMovies = action.payload;
          state.loading = false;
        },
      )
      .addCase(loadRandomMovies.rejected, state => {
        state.loading = false;
      });

    builder
      .addCase(searchMoviesByQuery.pending, state => {
        state.loading = true;
      })
      .addCase(
        searchMoviesByQuery.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.searchResults = action.payload;
          state.loading = false;
        },
      )
      .addCase(searchMoviesByQuery.rejected, state => {
        state.loading = false;
      });

    builder
      .addCase(loadMovieDetails.pending, state => {
        state.loading = true;
      })
      .addCase(
        loadMovieDetails.fulfilled,
        (state, action: PayloadAction<MovieDetails | null>) => {
          state.selectedMovie = action.payload;
          state.loading = false;
        },
      )
      .addCase(loadMovieDetails.rejected, state => {
        state.loading = false;
      });
  },
});

export default movieSlice.reducer;
