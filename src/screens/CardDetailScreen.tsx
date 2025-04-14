import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchCardById, saveCard, removeCard } from '../store/pokemonSlice';
import LoadingIndicator from '../components/LoadingIndicator';

type CardDetailScreenRouteProp = RouteProp<RootStackParamList, 'CardDetail'>;
type CardDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CardDetail'>;

interface Props {
  route: CardDetailScreenRouteProp;
  navigation: CardDetailScreenNavigationProp;
}

const CardDetailScreen: React.FC<Props> = ({ route }) => {
  const { cardId } = route.params;
  const dispatch = useDispatch();
  const { currentCard, loading, error, savedCards } = useSelector(
    (state: RootState) => state.pokemon
  );

  const isSaved = savedCards.includes(cardId);

  useEffect(() => {
    dispatch(fetchCardById(cardId));
  }, [dispatch, cardId]);

  const handleToggleSave = () => {
    if (isSaved) {
      dispatch(removeCard(cardId));
    } else {
      dispatch(saveCard(cardId));
    }
  };

  if (loading || !currentCard) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Kart bilgilerini yüklerken bir hata oluştu. Lütfen tekrar deneyin.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{ uri: currentCard.images.large }}
          style={styles.image}
          resizeMode="contain"
        />
        
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{currentCard.name}</Text>
          
          {currentCard.hp && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>HP:</Text>
              <Text style={styles.infoValue}>{currentCard.hp}</Text>
            </View>
          )}
          
          {currentCard.types && currentCard.types.length > 0 && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tipler:</Text>
              <View style={styles.typesContainer}>
                {currentCard.types.map((type, index) => (
                  <View key={index} style={styles.typeTag}>
                    <Text style={styles.typeText}>{type}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          {currentCard.abilities && currentCard.abilities.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Yetenekler</Text>
              {currentCard.abilities.map((ability, index) => (
                <View key={index} style={styles.abilityContainer}>
                  <Text style={styles.abilityName}>{ability.name}</Text>
                  <Text style={styles.abilityText}>{ability.text}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        <TouchableOpacity
          style={[
            styles.saveButton,
            isSaved ? styles.removeButton : styles.saveButton
          ]}
          onPress={handleToggleSave}
        >
          <Text style={styles.buttonText}>
            {isSaved ? 'Kartı Kaldır' : 'Kartı Kaydet'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 250,
    height: 350,
    marginBottom: 24,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    width: 70,
  },
  infoValue: {
    fontSize: 16,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeTag: {
    backgroundColor: '#f44336',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  typeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  abilityContainer: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  abilityName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  abilityText: {
    fontSize: 14,
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
  },
});

export default CardDetailScreen;