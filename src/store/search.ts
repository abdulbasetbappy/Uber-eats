// search.ts
import { reactive, toRefs, watchEffect } from 'vue';
import { menuItems, menuOptions } from '../../data';

interface SearchState {
  searchQuery: string;
  searchResults: SearchResult[];
  selectedItems: SearchResult[];
}

interface SearchResult {
  name: string;
  price: number;
  image: string;
  additionalOptions?: AdditionalOption[];
}

interface AdditionalOption {
  Optionid: number;
  OptionName: string;
  MultipleSelection: boolean;
  items: AdditionalOptionItem[];
}

interface AdditionalOptionItem {
  name: string;
  price: number;
  selected: boolean;
}

const state = reactive<SearchState>({
  searchQuery: '',
  searchResults: [],
  selectedItems: [],
});

const performSearch = () => {
  const trimmedQuery = state.searchQuery.trim().toLowerCase();
  const results = menuItems
    .filter((item: any) => item.name.toLowerCase().startsWith(trimmedQuery))
    .map((item: any) => {
      let additionalOptions: AdditionalOption[] = [];

      const category = item.category.toLowerCase();

      if (category === 'pizza') {
        additionalOptions = menuOptions
          .filter((option) => [1, 2, 3].includes(option.Optionid))
          .map((option) => ({
            Optionid: option.Optionid,
            OptionName: option.OptionName,
            MultipleSelection: option.MultipleSelection,
            items: option.items.map((additionalItem) => ({
              ...additionalItem,
              selected: false,
            })),
          }));
      } else if (category === 'burger') {
        additionalOptions = menuOptions
          .filter((option) => [2, 3].includes(option.Optionid))
          .map((option) => ({
            Optionid: option.Optionid,
            OptionName: option.OptionName,
            MultipleSelection: option.MultipleSelection,
            items: option.items.map((additionalItem) => ({
              ...additionalItem,
              selected: false,
            })),
          }));
      } else if (category === 'breakfast') {
        additionalOptions = menuOptions
          .filter((option) => [2, 3].includes(option.Optionid))
          .map((option) => ({
            Optionid: option.Optionid,
            OptionName: option.OptionName,
            MultipleSelection: option.MultipleSelection,
            items: option.items.map((additionalItem) => ({
              ...additionalItem,
              selected: false,
            })),
          }));
      }

      return {
        id: item.id,
        name: item.name,
        price: item.price,
        ratings: item.ratings,
        description: item.description,
        category: item.category,
        image: item.image || '../assets/Image/default.png',
        additionalOptions,
      };
    });

  state.searchResults = results;
};

watchEffect(() => {
  performSearch();
});

export const useSearchStore = () => {
  return toRefs(state);
};
