import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {loadRandomMovies, searchMoviesByQuery} from '../redux/movieSlice';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import {RootState} from '../redux/store';
import {debounce} from '../utils/debounce.ts';
import {Movie} from '../interface/movie.ts';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {randomMovies, searchResults} = useSelector(
    (state: RootState) => state.movies,
  );
  const loading = useSelector((state: RootState) => state.movies.loading);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(loadRandomMovies());
  }, [dispatch]);

  const data = useMemo(
    () => (query ? searchResults : randomMovies),
    [query, searchResults, randomMovies],
  );

  const handleSearch = useMemo(() => {
    return debounce((text: string) => {
      if (text) {
        dispatch(searchMoviesByQuery(text));
      }
    }, 500);
  }, [dispatch]);

  const onSearchChange = useCallback(
    (text: string) => {
      setQuery(text);
      handleSearch(text);
    },
    [handleSearch],
  );

  const navigateToMovieDetails = (id: string) => {
    navigation.navigate('MovieDetail', {id});
  };

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={onSearchChange} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList<Movie>
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <MovieCard
              title={item.title}
              poster={item.poster}
              onPress={() => navigateToMovieDetails(item.id)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
});

export default HomeScreen;
