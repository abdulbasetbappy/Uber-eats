<template>
    <div class="container">
      <p class="subtitle">Menu</p>
      <h2 class="title">Our Popular Menu</h2>
      <div class="tabs">
        <div
          v-for="(category, index) in categories"
          :key="index"
          @click="selectCategory(index)"
          :class="{ active: selectedCategory === index }"
        >
          {{ category }}
        </div>
      </div>
  
    <div class="menu-item">
      <div v-for="item in slicedItems" :key="item.name" class="card">
        <img src="../assets/Image/Default_Food.jpg" :alt="item.name" />
        <h3>{{ item.name }}</h3>
        <p>${{ item.price.toFixed(2) }}</p>
        <StarRating :rating="item.ratings" />
        <button @click="addToCart(item)">Add to Cart</button>
      </div>
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import StarRating from './StarRating.vue';
  import { menuItems } from '../../data.ts';
  import { useCartStore } from '../store/cart';

  const cartStore = useCartStore();
  const categories = ref<string[]>([]);
  const selectedCategory = ref<number>(0);
  const items = ref(menuItems);
  
  const slicedItems = computed(() => {
    const selectedCategoryName = categories.value[selectedCategory.value];
  
    if (selectedCategoryName === 'All') {
      // Show all items for the 'All' category
      return items.value.slice(0, 8);
    } else {
      // Filter and slice items based on the selected category
      const filteredItems = items.value.filter((item) => item.category === selectedCategoryName);
      return filteredItems.slice(0, 8);
    }
  });
  
  const selectCategory = (index: number) => {
    selectedCategory.value = index;
  };
  
  // Extract unique categories from menuItems
  categories.value = Array.from(new Set(menuItems.map((item) => item.category)));

  const addToCart = (item : any) => {
    cartStore.addToCart(item);
  };
  </script>
  
  <style lang="scss" scoped>
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 50px 0px 50px 0px;
    max-width: 1000px;
    margin: auto;
    .subtitle {
      font-size: 18px;
      font-weight: bold;
      color: #FF8800;
    }
    .title {
      font-size: 36px;
      margin: 0px 0px 30px 0px;
    }
    .tabs {
      display: flex;
      margin-bottom: 20px;
      div {
        cursor: pointer;
        padding: 10px 20px;
        border-bottom: 1px solid #ccc;
        user-select: none;
      }
      div.active {
        border-bottom: 2px solid #FF8800;
      }
    }
    .menu-item {
      padding: 10px;
      margin-bottom: 50px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 10px;
      .card{
        border: 1px solid #ccc;
        padding: 18px;
        border-radius: 18px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 18px;
        }
        h3 {
          font-size: 16px;
          margin: 0px;
        }
        p {
          margin: 0px;
        }
        button {
          background-color: #FF8800;
          width: 100%;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
        }
      }
    }
  }
  </style>
  