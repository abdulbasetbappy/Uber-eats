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

        <!-- Additional Info -->
        <template
          v-if="
            selectedResult.additionalOptions &&
            selectedResult.additionalOptions.length > 0
          "
        >
          <div
            v-for="option in selectedResult.additionalOptions"
            :key="option.Optionid"
            class="additional-options"
          >
            <p>{{ option.OptionName }}</p>
            <ul>
              <li v-for="item in option.items" :key="item.name">
                <label class="checkbox style-c">
                  <input
                    type="checkbox"
                    v-model="item.selected"
                    @change="handleOptionSelection(option, item)"
                    :disabled="disableCheckbox(option, item)"
                  />
                  <div class="checkbox__checkmark"></div>
                  <div class="checkbox__body">
                    {{ item.name }} - ${{ item.price.toFixed(2) }}
                  </div>
                </label>
              </li>
            </ul>
          </div>
        </template>

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
import { ref, defineProps } from "vue";
import { useCartStore } from "../store/cart";
import StarRating from "./StarRating.vue";

// Initialize the cart store and other reactive variables
const cartStore = useCartStore();
const { selectedResult } = defineProps(["selectedResult", "closePopup"]);
const showPopup = ref(true);

const selectedItems = ref([]);
const disableCheckbox = (option, item) => {
  const selectedItemsCount = option.items.filter((i) => i.selected).length;
  return option.MultipleSelection && selectedItemsCount >= 3 && !item.selected;
};

const handleOptionSelection = (option, selectedItem) => {
  const itemIndex = option.items.findIndex((item) => item === selectedItem);
  const selectedItemsCount = selectedItems.value.length;

  if (option.MultipleSelection) {
  } else {
    // Handle single selection logic
    option.items.forEach((item, index) => {
      item.selected = index === itemIndex;
    });

    // Update the selectedItems array for single selection
    selectedItems.value = [option.items[itemIndex]];
  }
};

// Initialize the addToCart function
const addToCart = (item: any) => {
  cartStore.addToCart(item);
};
</script>

<style lang="scss" scoped>
@use "../styles/scss/utils/mixins" as mixins;
.popup {
  max-height: 80vh;
  overflow-y: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  z-index: 10011;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 450px;
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
    .product-category {
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
    .product_ratings {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: medium;
    }
    .additional-options {
      padding: 10px;
      text-align: start;
      p {
        font-size: 16px;
        font-weight: bold;
        margin: 0px;
      }
      ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
        li {
          font-size: 14px;
          margin: 0px;
          padding: 0px;

          .checkbox.style-c {
            display: inline-block;
            position: relative;
            padding-left: 30px;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }
          .checkbox.style-c input:checked ~ .checkbox__checkmark {
            background-color: #f7cb15;
          }
          .checkbox.style-c input:checked ~ .checkbox__checkmark:after {
            opacity: 1;
          }
          .checkbox.style-c:hover input ~ .checkbox__checkmark {
            background-color: #eee;
          }
          .checkbox.style-c:hover input:checked ~ .checkbox__checkmark {
            background-color: #f7cb15;
          }
          .checkbox.style-c .checkbox__checkmark {
            position: absolute;
            top: 2px;
            left: 0;
            height: 20px;
            width: 20px;
            background-color: #eee;
            transition: background-color 0.25s ease;
            border-radius: 4px;
          }
          .checkbox.style-c .checkbox__checkmark:after {
            content: "";
            position: absolute;
            left: 8px;
            top: 4px;
            width: 5px;
            height: 10px;
            border: solid #333;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            opacity: 0;
            transition: opacity 0.25s ease;
          }
          .checkbox.style-c .checkbox__body {
            color: #333;
            line-height: 1.4;
            font-size: 16px;
          }
        }
      }
    }
    button {
      margin-top: 10px;
      padding: 8px 16px;
      font-size: 14px;
      cursor: pointer;
      background-color: #ff8800;
      color: white;
      border: none;
      border-radius: 4px;
      font-family: "poppins";
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #df7804;
      }
    }
    .cross_btn {
      position: absolute;
      top: 15px;
      right: 20px;
      background-color: transparent;
      border: none;
      &:hover {
        background-color: #e9e9e9;
      }
      .Cross_icon {
        color: #ff8800;
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
