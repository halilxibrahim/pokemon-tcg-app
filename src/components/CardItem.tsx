import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View, Dimensions } from 'react-native';
import { PokemonCard } from '../types';

interface CardItemProps {
  card: PokemonCard;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 24;

const CardItem: React.FC<CardItemProps> = ({ card, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: card.images.small }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{card.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CardItem;