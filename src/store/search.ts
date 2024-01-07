// search.ts

import { reactive, toRefs } from 'vue';
import { ref, watchEffect } from 'vue';
import { menuItems } from '../../data';

interface SearchState {
  searchQuery: string;
  searchResults: SearchResult[];
}

interface SearchResult {
  name: string;
  price: number;
  image: string; // URL of the image
}

const state = reactive<SearchState>({
  searchQuery: '',
  searchResults: [],
});

const performSearch = () => {
  const trimmedQuery = state.searchQuery.trim().toLowerCase();
  console.log('Performing search:', trimmedQuery);
  const results = menuItems
    .filter((item:any) => item.name.toLowerCase().startsWith(trimmedQuery))
    .map((item:any) => ({
      name: item.name,
      price: item.price,
      ratings: item.ratings,
      description: item.description,
      category: item.category,
      image: item.image || '../assets/Image/default.png', // Provide a default image path
    }));

  state.searchResults = results;
};

watchEffect(() => {
  performSearch();
});

export const useSearchStore = () => {
  return toRefs(state);
};