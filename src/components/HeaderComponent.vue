<template>
  <div class="container">
    <div class="grid-container">
      <!--Header Icon-->
      <div class="header_logo">
        <router-link to="/"
          ><h1>Uber<span>Eats</span></h1></router-link
        >
      </div>
      <!--Header Navigation-->
      <div class="header_navigation">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/shop">Shop</router-link></li>
        </ul>
      </div>
      <!--Header Search-->
      <div class="header_icons">
        <div class="search-input">
          <input v-model="searchQuery" placeholder="Search items" />
          <font-awesome-icon
            class="search-icon"
            :icon="['fas', 'magnifying-glass']"
          />
          <!--search-suggestions-->
          <div class="search-suggestions" v-if="searchQuery.length > 0">
            <div
              v-for="result in searchResults"
              :key="result.name"
              @click="selectSearchResult(result)"
            >
              <img :src="result.image" alt=" " />
              <div class="search-result-details">
                <p class="result-name">{{ result.name }}</p>
                <p class="result-price">${{ result.price.toFixed(2) }}</p>
              </div>
            </div>
          </div>
          <!--Popup-->
          <Popup :selectedResult="selectedResult" :closePopup="closePopup" />
        </div>
        <div class="cart-icon-container">
          <router-link to="/Cart">
            <font-awesome-icon
              class="Cart-icon"
              :class="{ heartBeat: isCartQuantityIncreased }"
              :icon="['fas', 'cart-shopping']"
            />
            <span class="cart-quantity">{{ cartStore.cartTotal }}</span>
          </router-link>
        </div>
      </div>
      <!-- Sidebar toggle button -->
      <div class="menu-toggle" @click="toggleMenu">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </div>
      <!-- Sidebar content (created dynamically) -->
      <div v-if="isMenuOpen" class="sidebar">
        <!--Sidebar Close-->
        <div class="close-icon" @click="closeMenu">
          <font-awesome-icon :icon="['fas', 'xmark']" />
        </div>
        <!--Sidebar Cart Icon-->
        <div class="cart-icon-container">
          <router-link to="/Cart">
            <font-awesome-icon
              class="Cart-icon"
              :class="{ heartBeat: isCartQuantityIncreased }"
              :icon="['fas', 'cart-shopping']"
            />
            <span class="cart-quantity">{{ cartStore.cartTotal }}</span>
          </router-link>
        </div>
        <div class="search-input">
          <input v-model="searchQuery" placeholder="Search items" />
          <font-awesome-icon
            class="search-icon"
            :icon="['fas', 'magnifying-glass']"
          />
          <!-- Sidebar search-suggestions-->
          <div class="search-suggestions" v-if="searchQuery.length > 0">
            <div
              v-for="result in searchResults"
              :key="result.name"
              @click="selectSearchResult(result)"
            >
              <img :src="result.image" alt=" " />
              <div class="search-result-details">
                <p class="result-name">{{ result.name }}</p>
                <p class="result-price">${{ result.price.toFixed(2) }}</p>
              </div>
            </div>
          </div>
          <!--Popup-->
          <Popup :selectedResult="selectedResult" :closePopup="closePopup" />
        </div>
        <!--Sidebar Navigation-->
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/shop">Shop</router-link></li>
        </ul>
        <!--Sidebar Bottom Title-->
        <div class="title">
          <router-link to="/"
            ><h1>Uber<span>Eats</span></h1></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import necessary components
import Popup from "./Popup.vue";
import { useCartStore } from "../store/cart";
import { useSearchStore } from "../store/search";
import { onMounted, ref, watch } from "vue";

// Initialize the cart store and other reactive variables
const cartStore = useCartStore();
const selectedResult = ref(null);
const isCartQuantityIncreased = ref(false);
const { searchQuery, searchResults } = useSearchStore();
const isMenuOpen = ref(false);

// Lifecycle hook: Runs after the component is mounted
onMounted(async () => {
  // Load cart data from local storage
  await cartStore.loadFromLocalStorage();
});

// Close the popup when called
const closePopup = () => {
  selectedResult.value = null;
};

// Handle the selection of a search result
const selectSearchResult = (result: any) => {
  console.log("Selected search result:", result);
  selectedResult.value = result;
};

// Watch for changes in the cart total and trigger a visual indicator if increased
watch(
  () => cartStore.cartTotal,
  (newTotal, oldTotal) => {
    if (newTotal > oldTotal) {
      isCartQuantityIncreased.value = true;

      // Reset the heartbeat class after a short delay
      setTimeout(() => {
        isCartQuantityIncreased.value = false;
      }, 500);
    }
  }
);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
// Close the menu when a link is clicked
const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style lang="scss" scoped>
@use "../styles/scss/utils/variables" as variables;
@use "../styles/scss/utils/mixins" as mixins;
@import "../styles/scss/main.scss";
.container {
  margin: 0;
  padding: 0;
  background-color: variables.$background-color-Secondary;
  .grid-container {
    height: 110px;
    max-width: 1200px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    justify-items: center;
    align-items: center;
    .header_logo {
      a {
        text-decoration: none;
        color: black;
        h1 {
          cursor: pointer;
          font-weight: 500;
          font-size: 36;
          span {
            font-weight: 600;
          }
        }
      }
    }
    .header_navigation {
      display: flex;
      align-items: center;
      justify-content: center;
      ul {
        display: flex;
        li {
          list-style: none;
          margin: 0px 30px 0px 30px;

          a {
            text-decoration: none;
            font-size: 18px;
            color: variables.$text-color;
          }
        }
      }
    }
    .header_icons {
      display: flex;
      align-items: center;
      justify-content: end;
      font-size: 24px;
      .search-input {
        display: flex;
        align-items: center;
        margin-right: 20px;
        position: relative;
        input {
          padding: 8px;
          border: 1px solid #cecece;
          border-radius: 6px;
          font-size: 16px;
          outline: none;
          padding-right: 36px;
          padding-left: 16px;
          background-color: #dde6ed;
          color: #6d6d6d;
        }
        .search-icon {
          position: absolute;
          top: 8px;
          right: 8px;
          cursor: pointer;
          color: #6d6d6d;
        }
        .search-suggestions {
          position: absolute;
          top: 50px;
          right: 0;
          width: 100%;
          background-color: #e4e4e4;
          border-radius: 6px;
          z-index: 1;
          div {
            padding: 8px 12px;
            cursor: pointer;
            display: flex;
            justify-items: center;
            align-items: center;
            transition: all 0.3s ease-in-out;
            img {
              width: 50px;
              height: 40px;
              border-radius: 6px;
              object-fit: cover;
              margin-right: 8px;
            }
            .search-result-details {
              display: flex;
              align-items: start;
              flex-direction: column;
              .result-name {
                font-size: 14px;
                font-weight: 600;
              }
              .result-price {
                font-size: 14px;
                color: #6d6d6d;
              }
            }
            &:hover {
              border-radius: 6px;
              background-color: #aaadaf;
            }
          }
        }
      }
      /* Add styles as needed */
      .cart-icon-container {
        position: relative;
        cursor: pointer;
        .Cart-icon {
          cursor: pointer;
          color: rgb(34, 34, 34);
          transition: all 0.5s ease-in-out;
        }
        .cart-quantity {
          position: absolute;
          top: -9px;
          right: -11px;
          background-color: #ff8800;
          color: white;
          border-radius: 50%;
          padding: 0px 6px;
          font-size: 14px;
          transition: all 0.5s ease-in-out;
        }
      }
    }
    .menu-toggle {
      display: none;
      cursor: pointer;
      color: #6d6d6d;
      font-size: 24px;
    }
    .sidebar {
      position: fixed;
      top: 0;
      right: 0;
      height: 100%;
      width: 300px;
      background-color: #333; // Choose your desired background color
      padding-top: 20px;
      z-index: 1000;
      transition: transform 0.6s ease-in-out;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding: 10px;
          text-align: center;

          a {
            text-decoration: none;
            color: #fff; // Choose your desired text color
            font-size: 18px;
            display: block;
            padding: 10px;

            &:hover {
              background-color: #555; // Choose your desired hover background color
            }
          }
        }
      }

      .close-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        color: #fff; // Choose your desired text color for close icon
        font-size: 24px;
      }
    }
  }
}
@include mixins.respond-to(0px, 768px) {
  .container {
    max-width: 768px;
    height: auto;
    .grid-container {
      width: 90%;
      height: auto;
      display: grid;
      grid-template-columns: 2fr 1fr;
      justify-items: start;
      padding: 10px;
      .header_logo {
        a {
          h1 {
            font-size: 28px;
          }
        }
      }
      .menu-toggle {
        margin-left: auto;
        display: block;
      }
      .sidebar {
        position: fixed;
        top: 0px;
        right: 0px;
        height: 100vh;
        width: 300px;
        background-color: #333; // Choose your desired background color
        padding: 50px 20px;
        z-index: 1000;
        transition: transform 0.6s ease-in-out;
        ul {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            padding: 10px;
            text-align: center;

            a {
              text-decoration: none;
              color: #fff; // Choose your desired text color
              font-size: 18px;
              display: block;
              padding: 10px;
              border-radius: 6px;
              &:hover {
                background-color: #555; // Choose your desired hover background color
              }
            }
          }
        }
        .cart-icon-container {
          position: relative;
          cursor: pointer;
          .Cart-icon {
            position: absolute;
            top: -25px;
            right: 30px;
            cursor: pointer;
            color: rgb(255, 255, 255);
            transition: all 0.5s ease-in-out;
            font-size: 24px;
          }
          .cart-quantity {
            position: absolute;
            top: -35px;
            right: 22px;
            background-color: #c9c9c9;
            color: #333;
            border-radius: 50%;
            padding: 0px 6px;
            font-size: 14px;
            transition: all 0.5s ease-in-out;
          }
        }
        .search-input {
          position: relative;
          margin-top: 50px;
          input {
            width: 100%;
            padding: 8px;
            border-radius: 6px;
            font-size: 16px;
            padding-right: 40px;
            border: none;
            outline: none;
            color: #333;
          }
          .search-icon {
            position: absolute;
            font-size: 24px;
            top: 10px;
            right: 8px;
          }
          .search-suggestions {
            position: absolute;
            top: 50px;
            right: 0;
            width: 100%;
            background-color: #e4e4e4;
            border-radius: 6px;
            z-index: 1;
            div {
              padding: 8px 12px;
              cursor: pointer;
              display: flex;
              justify-items: center;
              align-items: center;
              transition: all 0.3s ease-in-out;
              img {
                width: 50px;
                height: 40px;
                border-radius: 6px;
                object-fit: cover;
                margin-right: 8px;
              }
              .search-result-details {
                display: flex;
                align-items: start;
                flex-direction: column;
                .result-name {
                  font-size: 14px;
                  font-weight: 600;
                }
                .result-price {
                  font-size: 14px;
                  color: #6d6d6d;
                }
              }
              &:hover {
                border-radius: 6px;
                background-color: #aaadaf;
              }
            }
          }
        }
        .title {
          position: absolute;
          bottom: 30px;
          left: 20px;
          a {
            text-decoration: none;
            color: rgb(248, 248, 248);
            h1 {
              cursor: pointer;
              font-weight: 500;
              font-size: 26;
              span {
                font-weight: 600;
              }
            }
          }
        }

        .close-icon {
          position: absolute;
          top: 10px;
          right: 250px;
          cursor: pointer;
          color: #fff; // Choose your desired text color for close icon
          font-size: 28px;
        }
      }
      .header_navigation {
        display: none;
      }
      .header_icons {
        display: none;
      }
    }
  }
}
@include mixins.respond-to(769px, 1024px) {
  .container {
    max-width: 1024px;
    height: auto;
    .grid-container {
      width: 90%;
      height: auto;
      display: grid;
      grid-template-columns: 2fr 1fr;
      justify-items: start;
      padding: 10px;
      .header_logo {
        a {
          h1 {
            font-size: 28px;
          }
        }
      }
      .menu-toggle {
        margin-left: auto;
        display: block;
      }
      .sidebar {
        position: fixed;
        top: 0px;
        right: 0px;
        height: 100vh;
        width: 300px;
        background-color: #333; // Choose your desired background color
        padding: 50px 20px;
        z-index: 1000;
        transition: transform 0.6s ease-in-out;
        ul {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            padding: 10px;
            text-align: center;

            a {
              text-decoration: none;
              color: #fff; // Choose your desired text color
              font-size: 18px;
              display: block;
              padding: 10px;
              border-radius: 6px;
              &:hover {
                background-color: #555; // Choose your desired hover background color
              }
            }
          }
        }
        .cart-icon-container {
          position: relative;
          cursor: pointer;
          .Cart-icon {
            position: absolute;
            top: -25px;
            right: 30px;
            cursor: pointer;
            color: rgb(255, 255, 255);
            transition: all 0.5s ease-in-out;
            font-size: 24px;
          }
          .cart-quantity {
            position: absolute;
            top: -35px;
            right: 22px;
            background-color: #c9c9c9;
            color: #333;
            border-radius: 50%;
            padding: 0px 6px;
            font-size: 14px;
            transition: all 0.5s ease-in-out;
          }
        }
        .search-input {
          position: relative;
          margin-top: 50px;
          input {
            width: 100%;
            padding: 8px;
            border-radius: 6px;
            font-size: 16px;
            padding-right: 40px;
            border: none;
            outline: none;
            color: #333;
          }
          .search-icon {
            position: absolute;
            font-size: 24px;
            top: 10px;
            right: 8px;
          }
          .search-suggestions {
            position: absolute;
            top: 50px;
            right: 0;
            width: 100%;
            background-color: #e4e4e4;
            border-radius: 6px;
            z-index: 1;
            div {
              padding: 8px 12px;
              cursor: pointer;
              display: flex;
              justify-items: center;
              align-items: center;
              transition: all 0.3s ease-in-out;
              img {
                width: 50px;
                height: 40px;
                border-radius: 6px;
                object-fit: cover;
                margin-right: 8px;
              }
              .search-result-details {
                display: flex;
                align-items: start;
                flex-direction: column;
                .result-name {
                  font-size: 14px;
                  font-weight: 600;
                }
                .result-price {
                  font-size: 14px;
                  color: #6d6d6d;
                }
              }
              &:hover {
                border-radius: 6px;
                background-color: #aaadaf;
              }
            }
          }
        }
        .title {
          position: absolute;
          bottom: 30px;
          left: 20px;
          a {
            text-decoration: none;
            color: rgb(248, 248, 248);
            h1 {
              cursor: pointer;
              font-weight: 500;
              font-size: 26;
              span {
                font-weight: 600;
              }
            }
          }
        }

        .close-icon {
          position: absolute;
          top: 10px;
          right: 250px;
          cursor: pointer;
          color: #fff; // Choose your desired text color for close icon
          font-size: 28px;
        }
      }
      .header_navigation {
        display: none;
      }
      .header_icons {
        display: none;
      }
    }
  }
}
@include mixins.respond-to(1025px, 1400px) {
  .container {
    .grid-container {
      .header_logo {
      }
      .menu-toggle {
      }
      .sidebar {
        display: none;
      }
      .header_navigation {
      }

      .header_icons {
      }
    }
  }
}
</style>
