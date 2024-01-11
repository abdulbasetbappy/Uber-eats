<template>
  <Transition name="slide-fade">
    <div v-if="selectedResult != null && showPopup" class="popup">
      <!--Popup Details-->
    <img :src="selectedResult.image" alt="Product Image" />
    <div class="popup-details">
      <p class="product-name">{{ selectedResult.name }}</p>
      <p class="product-category">{{ selectedResult.category }}</p>
      <p class="product-description">{{ selectedResult.description }}</p>
      <p class="product-price">${{ selectedResult.price.toFixed(2) }}</p>
      <div class="product_ratings">
        <StarRating class="rating" :rating="selectedResult.ratings" />
      </div>

      <!-- Popup Buttons -->
      <button @click="addToCart(selectedResult)">Add to Cart</button>
      <button class="cross_btn" @click="closePopup">
        <font-awesome-icon :icon="['fas', 'xmark']" class="Cross_icon" />
      </button>
    </div>
  </div>
  </Transition>

</template>

<script setup lang="ts">
// Import necessary components
import { ref, defineProps } from 'vue';
import { useCartStore } from '../store/cart';
import StarRating from './StarRating.vue';

// Initialize the cart store and other reactive variables
const cartStore = useCartStore();
const { selectedResult } = defineProps(['selectedResult', 'closePopup']);
const showPopup = ref(true);

// Initialize the addToCart function
const addToCart = (item : any) => {
    cartStore.addToCart(item);
  };

</script>

<style lang="scss" scoped>
@use "../styles/scss/utils/mixins" as mixins;
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  text-align: center;

  img {
    max-width: 300px;
    height: 200px;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .popup-details {
    display: flex;
    flex-direction: column;

    .product-name {
      font-size: 28px;
      font-weight: bold;
      margin: 0px;
    }
    .product-category{
      font-size: 16px;
      font-weight: bold;
      margin: 0px;
    }
    .product-price {
      font-size: 16px;
      margin: 0px;
    }
    .product-description {
      font-size: 14px;
      color: #666;
    }
    .product_ratings{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: medium;
    }
    button {
      margin-top: 10px;
      padding: 8px 16px;
      font-size: 14px;
      cursor: pointer;
      background-color: #FF8800;
      color: white;
      border: none;
      border-radius: 4px;
      font-family: 'poppins';
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #df7804;
      }
    }
    .cross_btn{
      position: absolute;
      top: 15px;
      right: 20px;
      background-color: transparent;
      border: none;
      &:hover {
        background-color: #e9e9e9;
      }
      .Cross_icon{
        color: #FF8800;
        font-size: 20px;
      }
    }
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
}
@include mixins.respond-to(0px, 768px) {
  .popup {
    max-width: 350px;
    width: 100%;
    .popup-details {
    .product-name {
      font-size: 24px;
      font-weight: bold;
      margin: 0px;
    }
  }
  }
}
@include mixins.respond-to(769px, 1024px) {
  .popup {
    max-width: 400px;
    width: 100%;
    .popup-details {
    .product-name {
      font-size: 28px;
    }
  }
  }
}
</style>
