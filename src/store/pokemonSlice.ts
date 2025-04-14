import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PokemonCard, CardsResponse } from '../types';
import { getCardById,getCards } from '../api/pokemonApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PokemonState {
  cards: PokemonCard[];
  currentCard: PokemonCard | null;
  savedCards: string[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: PokemonState = {
  cards: [],
  currentCard: null,
  savedCards: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true
};

export const fetchCards = createAsyncThunk(
  'pokemon/fetchCards',
  async (page: number) => {
    const response = await getCards(page);
    return response;
  }
);

export const fetchCardById = createAsyncThunk(
  'pokemon/fetchCardById',
  async (id: string) => {
    const response = await getCardById(id);
    return response;
  }
);

export const loadSavedCards = createAsyncThunk(
  'pokemon/loadSavedCards',
  async () => {
    const savedCards = await AsyncStorage.getItem('savedCards');
    return savedCards ? JSON.parse(savedCards) : [];
  }
);

export const saveCard = createAsyncThunk(
  'pokemon/saveCard',
  async (id: string, { getState }) => {
    const { pokemon } = getState() as { pokemon: PokemonState };
    const newSavedCards = [...pokemon.savedCards, id];
    await AsyncStorage.setItem('savedCards', JSON.stringify(newSavedCards));
    return id;
  }
);

export const removeCard = createAsyncThunk(
  'pokemon/removeCard',
  async (id: string, { getState }) => {
    const { pokemon } = getState() as { pokemon: PokemonState };
    const newSavedCards = pokemon.savedCards.filter(cardId => cardId !== id);
    await AsyncStorage.setItem('savedCards', JSON.stringify(newSavedCards));
    return id;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    resetCurrentCard(state) {
      state.currentCard = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action: PayloadAction<CardsResponse>) => {
        state.loading = false;
        if (state.page === 1) {
          state.cards = action.payload.data;
        } else {
          state.cards = [...state.cards, ...action.payload.data];
        }
        state.hasMore = action.payload.count === action.payload.pageSize;
        state.page += 1;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Kartları yüklerken bir hata oluştu';
      })
      .addCase(fetchCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardById.fulfilled, (state, action: PayloadAction<PokemonCard>) => {
        state.loading = false;
        state.currentCard = action.payload;
      })
      .addCase(fetchCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Kart detaylarını yüklerken bir hata oluştu';
      })
      .addCase(loadSavedCards.fulfilled, (state, action) => {
        state.savedCards = action.payload;
      })
      .addCase(saveCard.fulfilled, (state, action) => {
        state.savedCards.push(action.payload);
      })
      .addCase(removeCard.fulfilled, (state, action) => {
        state.savedCards = state.savedCards.filter(id => id !== action.payload);
        state.cards = state.cards.filter(card => card.id !== action.payload);
      });
  }
});

export const { resetCurrentCard } = pokemonSlice.actions;
export default pokemonSlice.reducer;