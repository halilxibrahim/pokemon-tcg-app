import axios from 'axios';
import { CardsResponse, PokemonCard } from '../types';
const API_URL = 'https://api.pokemontcg.io/v2';
const API_KEY = process.env.VITE_POKEMON_API_KEY;

const pokemonApi = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Api-Key': API_KEY
  }
});

export const getCards = async (page = 1, pageSize = 10): Promise<CardsResponse> => {
  try {
    const response = await pokemonApi.get('/cards', {
      params: { page, pageSize }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (error.response?.status === 401) {
        throw new Error('Invalid API key');
      }
    }
    throw error;
  }
};

export const getCardById = async (id: string): Promise<PokemonCard> => {
  try {
    const response = await pokemonApi.get(`/cards/${id}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`Card with ID ${id} not found`);
      }
    }
    throw error;
  }
};