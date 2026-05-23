import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const CARD_WIDTH = (width - 50) / 3;

const CategoryCards = () => {
  return (
    <View style={styles.container}>

      {/* Barbers */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8',
        }}
        imageStyle={styles.imageStyle}
        style={styles.card}
      >
        <View style={styles.overlay} />

        <Text style={styles.title}>
          Barbers
        </Text>
      </ImageBackground>

      {/* Hair Salons */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1560066984-138dadb4c035',
        }}
        imageStyle={styles.imageStyle}
        style={styles.card}
      >
        <View style={styles.overlay} />

        <Text style={styles.title}>
          Hair Salons
        </Text>
      </ImageBackground>

      {/* Beauty */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f',
        }}
        imageStyle={styles.imageStyle}
        style={styles.card}
      >
        <View style={styles.overlay} />

        <Text style={styles.title}>
          Beauty
        </Text>
      </ImageBackground>

    </View>
  );
};

export default CategoryCards;

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  card: {
    width: CARD_WIDTH,
    height: 90,
    justifyContent: 'flex-end',
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },

  imageStyle: {
    borderRadius: 10,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },

  title: {
    color: '#ffffffde',
    fontSize: 14,
    fontWeight: '600',
    zIndex: 1,
  },

});