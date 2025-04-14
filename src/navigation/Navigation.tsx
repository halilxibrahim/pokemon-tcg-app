import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CardListScreen from '../screens/CardListScreen';
import CardDetailScreen from '../screens/CardDetailScreen';

export type RootStackParamList = {
  CardList: undefined;
  CardDetail: { cardId: string };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CardList">
        <Stack.Screen 
          name="CardList" 
          component={CardListScreen} 
          options={{ title: 'Pokémon Cards' }}
        />
        <Stack.Screen 
          name="CardDetail" 
          component={CardDetailScreen} 
          options={{ title: 'Card Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation; 