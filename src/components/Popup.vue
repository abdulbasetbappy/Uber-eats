<template>
  <div v-if="selectedResult != null && showPopup" class="popup">
    <img :src="selectedResult.image" alt="Product Image" />
    <div class="popup-details">
      <p class="product-name">{{ selectedResult.name }}</p>
      <p class="product-category">{{ selectedResult.category }}</p>
      <p class="product-description">{{ selectedResult.description }}</p>
      <p class="product-price">${{ selectedResult.price.toFixed(2) }}</p>
      <p class="product-ratings">Ratings: {{ selectedResult.ratings }}</p>
      <!-- Add more details as needed -->
      <button @click="addToCart(selectedResult)">Add to Cart</button>
      <button @click="closePopup">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();
const { selectedResult } = defineProps(['selectedResult', 'closePopup']);
const showPopup = ref(true); // Track the visibility of the popup


const addToCart = (item : any) => {
    cartStore.addToCart(item);
  };

</script>

<!-- Add styles as needed -->
<style lang="scss" scoped>
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
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .popup-details {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .product-name {
      font-size: 18px;
      font-weight: bold;
    }

    .product-price {
      font-size: 16px;
    }

    .product-description {
      font-size: 14px;
      color: #666;
    }

    button {
      padding: 8px 16px;
      font-size: 14px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}
</style>
