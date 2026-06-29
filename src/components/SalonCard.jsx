import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

const { width } = Dimensions.get('window');

const CARD_WIDTH = (width - 42) / 2;

const SalonCard = ({
  image,
  category,
  isOpen,
  title,
  distance,
  time,
  rating,
  reviews,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.66} onPress={onPress}
    style={styles.card}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />

        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Open Close Badge */}
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: isOpen ? '#F1BA0D' : '#F63100',
            },
          ]}
        >
          <Text style={styles.statusText}>{isOpen ? 'Open' : 'Closed'}</Text>
        </View>

        {/* Title */}
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        {/* Distance & Time */}
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={11} color="#ccc" />
          <Text style={styles.infoText}>{distance}</Text>

          <Text style={styles.dot}>•</Text>

          <Ionicons name="time-outline" size={11} color="#ccc" />
          <Text style={styles.infoText}>{time}</Text>
        </View>

        {/* Ratings */}
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={11} color="#F1BA0D" />
          <Text style={styles.rating}>{rating}</Text>

          <Text style={styles.reviewText}>({reviews} reviews)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SalonCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#111',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  imageContainer: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 110,
  },

  categoryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#000000de',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
  },

  categoryText: {
    color: '#ffffffde',
    fontSize: 9,
    fontWeight: '600',
  },

  content: {
    padding: 10,
  },

  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
    marginBottom: 5,
  },

  statusText: {
    color: '#000000de',
    fontSize: 9,
    fontWeight: '700',
  },

  title: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 0.33,
    fontWeight: '700',
    marginBottom: 5,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 5,
  },

  infoText: {
    color: '#ccc',
    fontSize: 10,
    marginLeft: 3,
  },

  dot: {
    color: '#888',
    marginHorizontal: 6,
    fontSize: 10,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rating: {
    color: '#F1BA0D',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 3,
  },

  reviewText: {
    color: '#ccc',
    fontSize: 10,
    marginLeft: 8,
  },
});
