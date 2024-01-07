<template>
    <div class="cart-container">
      <div class="Cart_Items">
        <div class="header_cart">
          <h2 class="title">Shopping Cart</h2>
          <h2 class="title">{{ cartStore.cartTotal }} Items</h2>
        </div>
        <hr>
        <div class="empty_cart" v-if="cartStore.cartItems.length === 0">
          <h2>Your cart is empty.</h2>
          <router-link to="/shop">
            <font-awesome-icon class="social-icons" :icon="['fas', 'arrow-left']" />
            Continue Shopping</router-link>
        </div>
        <div v-else>
          <div v-for="(item, index) in cartStore.cartItems" :key="index" class="cart-item">
            <img src="../assets/Image/Default_Food.jpg" alt="">
            <div class="details">
              <h3>{{ item.name }}</h3>
              <p>Price: ${{ item.price }}</p>
              <p class="category">Category: {{ item.category }}</p>
              <p class="Quantity">Quantity: {{ item.quantity }}</p>
              <button @click="incrementQuantity(index)">+</button>
              <button @click="decrementQuantity(index)">-</button>
              <button @click="removeFromCart(index)">Remove</button>
            </div>
          </div>
          <div class="cart-total">
            <p>Total: ${{ cartStore.cartTotalPrice }}</p>
          </div>
        </div>
      </div>
      <div class="order_summary">
        <h2 class="title">Order Summary</h2>
        <hr>
        <div class="total_Items">
          <p>Total Items: </p>
          <p>{{ cartStore.cartTotal }}</p>
        </div>
        <div class="total_Items">
          <p>Subtotals: </p>
          <p>${{ cartStore.cartTotalPrice.toFixed(2) }}</p>
        </div>
        <div  v-if="discount > 0" class="total_Items">
          <p>Discount: </p>
          <p>-${{ discount }}</p>
        </div>
        <div v-if="Coupondiv" class="coupon-div">
          <p>Apply Coupon</p>
          <input v-model="couponCode" type="text" placeholder="Enter Coupon Code"> 
          <button @click="applyCoupon(0.05)">Apply</button>
        </div>
        <div v-else>
          <h4 class="discount">Your 5% Discoount Applied Successfully!!</h4>
          <div class="total_Items">
            <p>Discount Price: </p>
            <p>${{ finalTotal }}</p>
          </div>
        </div>
        <div class="order_final">
          <div class="total_Items">
            <p>Shipping Fee: </p>
            <p>+$1.00</p>
          </div>
          <hr>
          <div class="total_Items">
            <p>Total Payment: </p>
            <p v-if="finalTotal>0">${{ finalTotal+1 }}</p>
            <p v-else>${{( cartStore.cartTotalPrice+1).toFixed(2) }}</p>
          </div>
        </div>
        <br>
        <button class="Checkout">Checkout</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useCartStore } from '../store/cart';

  const cartStore = useCartStore();
  const couponCode = ref('');
  const finalTotal = ref( cartStore.cartTotalPrice );
  const discount =ref()
  const Coupondiv =ref(true);

  const removeFromCart = (index: number) => {
    cartStore.removeFromCart(index);
  };
  
  const incrementQuantity = (index: number) => {
    cartStore.incrementQuantity(index);
  };
  
  const decrementQuantity = (index: number) => {
    cartStore.decrementQuantity(index);
  };
  watch(() => cartStore.cartItems.length, (newTotal, oldTotal) => {
  console.log('Cart Total Price changed:', newTotal);
  if (Coupondiv.value) {
    finalTotal.value = newTotal;
  }
});
  const applyCoupon = (percent: number) => {
    if (couponCode.value === 'VUEJS') {
      finalTotal.value = parseFloat((cartStore.cartTotalPrice * (1 - percent)).toFixed(2)); 
      discount.value = parseFloat((cartStore.cartTotalPrice * percent).toFixed(2));
      Coupondiv.value = false;
    } else {
      alert('Invalid Coupon Code');
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .cart-container {
    font-family: 'poppins', sans-serif;
    max-width: 1200px;
    margin: 20px auto;
    border-radius: 18px;
    display: grid;
    grid-template-columns: 5fr 2fr;
    position: relative;
    .Cart_Items {
      border-radius: 18px;
      padding: 10px;
      hr{
        margin: 10px 0px;
      }
      .header_cart{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
          font-weight: 500;
          font-size: 26px;
          margin: 10px 0px;
        }
      }
      .empty_cart{
        font-size: 20px;
        font-weight: 500;
        text-align: center;
        margin: 100px auto;
        h2{
          margin-bottom: 10px;
        }
        a{
          text-decoration: none;
          color: #ffffff;
          font-weight: 500;
          font-size: 18px;
          background-color: #fa801d;
          padding: 10px 20px;
          border-radius: 8px;
          &:hover{
            background-color: #FF8800;
          }
        }
      }
      .cart-item{
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 18px;
        margin-bottom: 10px;
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: row;
        img{
          width: 200px;
          height: 150px;
          border-radius: 8px;
          object-fit: cover;
        }
        .details{
          margin-left: 15px;
          h3{
            font-weight: 600;
            font-size: 24px;
          }
          p{
            font-weight: 500;
            font-size: 16px;
          }
          .category{
            font-weight: 500;
            font-size: 12px;
            color: #747474;
          }
          .Quantity{
            margin-bottom: 5px;
          }
          button{
            padding: 5px;
            border: none;
            background-color: #FF8800;
            cursor: pointer;
            margin-right: 10px;
            border-radius: 6px;
            color: #ffffff;
            padding: 8px 12px;
            font-family: 'poppins', sans-serif;
            &:hover{
              background-color: #fa801d;
            }
          }
        }
      }
      .cart-total {
        font-weight: 500;
        font-size: 20px;
        margin-top: 10px;
        text-align: right;
      }
    }
    .order_summary {
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 18px;
      background-color: #ccc;
      height: fit-content;
      .title{
        font-weight: 500;
        font-size: 26px;
        margin: 10px 0px;
      }
      hr{
        margin: 10px 0px;
      }
      .total_Items{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      .discount{
        color: rgb(2, 121, 2);
        font-weight: 600;
        font-size: 16px;
        border-radius: 8px;
        padding: 10px;
        text-align: center;
        background-color: rgba(64, 255, 47, 0.308);
        margin-bottom: 10px;
      }
      .coupon-div{
        background-color: #ebe8e8;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 10px;
        p{
          margin-bottom: 10px;
          font-weight: bold;
        }
        input{
          padding: 10px;
          border: none;
          border-radius: 5px;
          outline: none;
          height: 36px;
          font-size: 14px;
          color: #8a8a8a;
          font-family: 'poppins', sans-serif;
        }
        button{
          padding: 5px;
          border: none;
          background-color: #FF8800;
          cursor: pointer;
          border-radius: 6px;
          margin-left: 10px;
          color: #ffffff;
          padding: 8px 12px;
          font-family: 'poppins', sans-serif;
          &:hover{
            background-color: #fa801d;
          }
        }
      }
      .Checkout{
        padding: 5px;
        border: none;
        width: 100%;
        background-color: #FF8800;
        cursor: pointer;
        border-radius: 6px;
        color: #ffffff;
        padding: 8px 12px;
        font-size: 16px;
        font-family: 'poppins', sans-serif;
        &:hover{
          background-color: #fa801d;
        }
      }
    }
  }

  
 
  </style>
  