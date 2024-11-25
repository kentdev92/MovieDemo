import React, {useEffect, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {RootState} from '../redux/store';
import {loadMovieDetails} from '../redux/movieSlice';

const MovieDetailScreen = ({route}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {id} = route.params;

  const loading = useSelector((state: RootState) => state.movies.loading);

  const selectedMovie = useSelector(
    (state: RootState) => state.movies.selectedMovie,
  );

  useEffect(() => {
    if (id) {
      dispatch(loadMovieDetails(id));
    }
  }, [dispatch, id]);

  const openUrl = useCallback((url: string) => {
    Linking.openURL(url);
  }, []);

  const actors = useMemo(() => selectedMovie?.short?.actor, [selectedMovie]);
  const genre = useMemo(() => selectedMovie?.short?.genre, [selectedMovie]);
  const review = useMemo(() => selectedMovie?.short?.review, [selectedMovie]);
  const trailer = useMemo(() => selectedMovie?.short?.trailer, [selectedMovie]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!selectedMovie) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading movie details...</Text>
      </View>
    );
  }

  const {name, description, image, keywords} = selectedMovie.short;

  const renderActors = () => {
    if (!actors || actors.length === 0) {
      return null;
    }
    return (
      <View style={styles.actorsContainer}>
        <Text style={styles.actors}>
          <Text style={styles.bold}>Actors: </Text>
          {actors.map(actor => (
            <Text
              key={actor.url}
              style={styles.link}
              onPress={() => openUrl(actor.url)}>
              {actor.name},
            </Text>
          ))}
        </Text>
      </View>
    );
  };

  const renderGenre = () => {
    if (!genre) {
      return null;
    }
    return (
      <Text style={styles.genre}>
        <Text style={styles.bold}>Genre: </Text>
        {genre.join(', ')}
      </Text>
    );
  };

  const renderReviews = () => {
    if (!review || !review.author) {
      return null;
    }
    return (
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsTitle}>Reviews:</Text>
        <View style={styles.review}>
          <Text style={styles.reviewAuthor}>
            {review.author.name} ({review.dateCreated})
          </Text>
          <Text style={styles.reviewText}>{review.reviewBody}</Text>
          <Text style={styles.reviewRating}>
            Rating:{' '}
            {review.reviewRating ? review.reviewRating.ratingValue : 'N/A'}
          </Text>
        </View>
      </View>
    );
  };

  const renderTrailer = () => {
    if (!trailer || !trailer.url) {
      return null;
    }
    return (
      <View style={styles.trailerContainer}>
        <Text style={styles.bold}>Trailer:</Text>
        <Text style={styles.link} onPress={() => openUrl(trailer.url)}>
          Watch Trailer
        </Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: image}} style={styles.poster} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>

      {renderActors()}
      {renderGenre()}
      {keywords && (
        <Text style={styles.keywords}>
          <Text style={styles.bold}>Keywords: </Text>
          {keywords}
        </Text>
      )}
      {renderReviews()}
      {renderTrailer()}
    </ScrollView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  actorsContainer: {
    marginBottom: 10,
  },
  actors: {
    fontSize: 16,
    marginBottom: 10,
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  genre: {
    fontSize: 16,
    marginBottom: 10,
  },
  keywords: {
    fontSize: 16,
    marginBottom: 10,
  },
  reviewsContainer: {
    marginTop: 20,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  review: {
    marginBottom: 10,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 5,
  },
  reviewRating: {
    fontSize: 14,
    color: 'gray',
  },
  trailerContainer: {
    marginTop: 20,
  },
  imdbContainer: {
    marginTop: 20,
  },
});
