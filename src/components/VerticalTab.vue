<template>
    <div class="vertical-tabs">
      <div class="categories">
        <div
          v-for="(category, index) in categories"
          :key="index"
          @click="selectCategory(index)"
          :class="{ active: selectedCategory === index }"
        >
          {{ category }}
        </div>
      </div>
      <div class="data">
        <transition-group name="list" tag="div">
        <div v-for="item in filteredItems" :key="item.name" class="menu-item">
          <div class="img_div">
            <img :src="item.image" :alt="item.name">
          </div>
          <div class="main_details">
            <div class="details">
              <h3>{{ item.name }}</h3>
              <p class="category">Category: {{ item.category }}</p>
              <p>{{ item.description }}</p>
              <StarRating :rating="item.ratings" />
            </div>
            <div class="action">
              <p>${{ item.price.toFixed(2) }}</p>
              <button @click="addToCart(item)">Add to Cart</button>
            </div>
          </div>
        </div>
      </transition-group>
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
  
  const filteredItems = computed(() => {
    const selectedCategoryName = categories.value[selectedCategory.value];
    return selectedCategoryName === 'All'
      ? items.value
      : items.value.filter((item) => item.category === selectedCategoryName);
  });
  
  const selectCategory = (index: number) => {
    selectedCategory.value = index;
  };
  
  categories.value = ['All', ...Array.from(new Set(menuItems.map((item) => item.category)))];
  
  const addToCart = (item : any) => {
    cartStore.addToCart(item);
  };
  </script>
  
  <style lang="scss" scoped>
  .vertical-tabs {
    display: flex;
    flex-direction: row;
    margin: 50px auto;
    font-family: 'poppins', sans-serif;
    /* we will explain what these classes do next! */
    .list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
    .categories {
      width: 200px; /* Adjust the width as needed */
      padding: 10px;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      height: fit-content;
      border-radius: 12px;
      padding: 15px 12px;
      div {
        cursor: pointer;
        padding: 10px;
        margin-bottom: 5px;
        border: 1px solid #ccc;
        border-radius: 8px;
        user-select: none;
      }
      .active {
          background-color: #ccc;
        }
    }
  }
  
  .data {
    flex: 1;
    margin-left: 20px;
  }
  
  .menu-item {
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;
    .img_div{
      width: 200px;
      height: 150px;
      border-radius: 8px;
      object-fit: cover;
      img{
        width: 200px;
        height: 150px;
        border-radius: 8px;
        object-fit: cover;
      }
    }
    .main_details{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: 'poppins', sans-serif;
      .details{
        margin-left: 20px;
        h3{
          font-weight: 600;
          font-size: 28px;
          margin: 0px;
        }
        p{
          font-weight: 500;
          font-size: 16px;
          max-width: 450px;
          margin: 0px;
        }
        .category{
          font-weight: 600;
          font-size: 16px;  
        }
      }
      .action{
        p{
          font-weight: 500;
          font-size: 26px;
          margin-bottom: 20px;
        }
        button{
          padding: 5px;
          border: none;
          background-color: #FF8800;
          cursor: pointer;
          margin-top: 20px;
          border-radius: 6px;
          color: #ffffff;
          margin-top: 8px;
          font-size: 20px;
          padding: 8px 12px;
          font-family: 'poppins', sans-serif;
          &:hover{
            background-color: #fa801d;
          }
        }
      }
    }
  }
  </style>
  