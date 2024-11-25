import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface MovieCardProps {
  title: string;
  poster: string;
  onPress: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({title, poster, onPress}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{uri: poster}} style={styles.poster} />
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {margin: 10, alignItems: 'center'},
  poster: {width: 100, height: 150, borderRadius: 8},
  title: {marginTop: 5, fontSize: 16, fontWeight: 'bold'},
});

export default MovieCard;
