import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  SafeAreaView 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { RootState, AppDispatch } from '../store';
import { fetchCards, loadSavedCards } from '../store/pokemonSlice';
import CardItem from '../components/CardItem';
import LoadingIndicator from '../components/LoadingIndicator';
import { PokemonCard } from '../types';

type CardListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CardList'>;

interface Props {
  navigation: CardListScreenNavigationProp;
}

const CardListScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, loading, error, hasMore, page } = useSelector(
    (state: RootState) => state.pokemon
  );

  useEffect(() => {
    dispatch(loadSavedCards());
    dispatch(fetchCards(1));
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchCards(page));
    }
  };

  const handleCardPress = (cardId: string) => {
    navigation.navigate('CardDetail', { cardId });
  };

  const renderItem = ({ item }: { item: PokemonCard }) => (
    <CardItem 
      card={item} 
      onPress={() => handleCardPress(item.id)} 
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <LoadingIndicator />;
  };

  if (loading && cards.length === 0) {
    return <LoadingIndicator />;
  }

  if (error && cards.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Bir hata oluştu. Lütfen tekrar deneyin.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
  },
});

export default CardListScreen;