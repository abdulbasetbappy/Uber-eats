<template>
    <div class="container">
        <div class="grid-container">
            <!--Header Icon-->
            <div class="header_logo ">
                <router-link to="/"><h1>Uber<span>Eats</span></h1></router-link>
            </div>
            <!--Header Navigation-->
            <div class="header_navigation ">
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/about">About Us</router-link></li>   
                    <li><router-link to="/shop">Shop</router-link></li>
                </ul>
            </div>
            <!--Header Search-->
            <div class="header_icons ">
                <div class="search-input">
                    <input v-model="searchQuery" placeholder="Search items" />
                    <font-awesome-icon class="search-icon" :icon="['fas', 'magnifying-glass']" />
                    <!--search-suggestions-->
                    <div class="search-suggestions" v-if="searchQuery.length > 0">
                        <div v-for="result in searchResults" :key="result.name" @click="selectSearchResult(result)">
                            <img src="../assets/Image/Default_Food.jpg" alt=" " />
                            <div class="search-result-details">
                                <p class="result-name">{{ result.name }}</p>
                                <p class="result-price">${{ result.price.toFixed(2) }}</p>
                            </div>
                        </div>
                    </div>
                    <!--Popup-->
                    <Popup :selectedResult="(selectedResult)" :closePopup="closePopup" />
                </div>
                <div class="cart-icon-container">
                    <router-link to="/Cart">
                        <font-awesome-icon class="Cart-icon" :icon="['fas', 'cart-shopping']" />
                        <span class="cart-quantity" >{{ cartStore.cartTotal }}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Popup  from './Popup.vue';
import { useCartStore } from '../store/cart';
import { useSearchStore } from '../store/search';
import { onMounted, ref } from 'vue';
const cartStore = useCartStore();
const selectedResult = ref(null);
onMounted(async () => {
  await cartStore.loadFromLocalStorage();
});
const closePopup = () => {
      selectedResult.value = null;
    };
const { searchQuery, searchResults } = useSearchStore();
const selectSearchResult = (result:any) => {
  console.log('Selected search result:', result);
  selectedResult.value = result;
};
</script>


<style lang="scss" scoped>
@use "../styles/scss/utils/variables" as variables;
@use "../styles/scss/utils/mixins"  as mixins;
@import "../styles/scss/main.scss";
.container{
    margin: 0;
    padding: 0;
    background-color: variables.$background-color-Secondary;
    .grid-container{
        height: 110px;
        max-width: 1200px;
        margin: auto;
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        justify-items: center;
        align-items: center;
        .header_logo{
            a{
                text-decoration: none;
                color: black;
                h1{
                    cursor: pointer;
                    font-weight: 500;
                    font-size: 36;
                    span{
                        font-weight: 600;
                    }
                }
            }
        }
        .header_navigation{
            display: flex;
            align-items: center;
            justify-content: center;
            ul{
                display: flex;
                li{
                    list-style: none;
                    margin: 0px 30px 0px 30px;

                    a{
                        text-decoration: none;
                        font-size: 18px;
                        color: variables.$text-color;
                    }
                }
            }
        }
        .header_icons{
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
                border: 1px solid #cecece ;
                border-radius: 6px;
                font-size: 16px;
                outline: none;
                padding-right: 36px;
                padding-left: 16px;
                background-color: #DDE6ED;
                color: #6d6d6d;
            }
            .search-icon {
                position: absolute;
                top: 8px;
                right: 8px;
                cursor: pointer;
                color: #6d6d6d;
            }  
            .search-suggestions{
                position: absolute;
                top: 50px;
                right: 0;
                width: 100%;
                background-color: #e4e4e4;
                border-radius: 6px;
                z-index: 1;
                div{
                    padding: 8px 12px;
                    cursor: pointer;
                    display: flex;
                    justify-items: center;
                    align-items: center;
                    img{
                        width: 50px;
                        height: 40px;
                        border-radius: 6px;
                        object-fit: cover;
                        margin-right: 8px;
                    }
                    .search-result-details{
                        display: flex;
                        align-items: start;
                        flex-direction: column;
                        .result-name{
                            font-size: 14px;
                            font-weight: 600;
                        }
                        .result-price{
                            font-size: 14px;
                            color: #6d6d6d;
                        }
                    }
                    &:hover{
                        border-radius: 6px;
                        background-color: #aaadaf;
                    }
                }
            }
            }
            .Cart-icon{
                cursor: pointer;
                color: rgb(34, 34, 34);
            }
            /* Add styles as needed */
            .cart-icon-container {
            position: relative;
            cursor: pointer;
            }
            .cart-quantity {
            position: absolute;
            top: -9px;
            right: -11px;
            background-color: #FF8800;
            color: white;
            border-radius: 50%;
            padding: 0px 6px;
            font-size: 14px;
            transition: all 0.5s ease-in-out; /* Add a smooth transition effect */
            }

            .heartBeat {
            animation: heartBeatAnimation 0.5s ease-in-out infinite;
            }

            @keyframes heartBeatAnimation {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
            }
        }
    }
}
</style>