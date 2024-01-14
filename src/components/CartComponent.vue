<template>
  <div class="cart-container">
    <div class="Cart_Items">
      <!--Cart Header-->
      <div class="header_cart">
        <h2 class="title">Shopping Cart</h2>
        <h2 class="title">{{ cartStore.cartTotal }} Items</h2>
      </div>
      <hr />
      <!--This is Only For Empty Cart-->
      <div class="empty_cart" v-if="cartStore.cartItems.length === 0">
        <h2>Your cart is empty.</h2>
        <router-link to="/shop">
          <font-awesome-icon
            class="social-icons"
            :icon="['fas', 'arrow-left']"
          />
          Continue Shopping</router-link
        >
      </div>
      <!--Main Cart Items Section-->
      <div v-else>
        <div
          v-for="(item, index) in cartStore.cartItems"
          :key="index"
          class="cart-item"
        >
          <img :src="item.image" alt="" />
          <div class="Main_details">
            <h3>{{ item.name }}</h3>
            <div class="details">
              <div class="details1">
                <p>
                  Price: ${{ item.price.toFixed(2) }}
                  <sup>
                    + ${{
                      calculateSelectedItemsPrice(item.additionalOptions)
                    }}</sup
                  >
                </p>
                <p class="category">Category: {{ item.category }}</p>
                <p class="Quantity">Quantity: {{ item.quantity }}</p>
                <button @click="incrementQuantity(index)">+</button>
                <button @click="decrementQuantity(index)">-</button>
                <button @click="removeFromCart(index)">Remove</button>
              </div>
              <div class="details2">
                <div
                  v-if="
                    item.additionalOptions && item.additionalOptions.length > 0
                  "
                >
                  <!-- Display selected items for each additional option -->
                  <div
                    v-for="option in item.additionalOptions"
                    :key="option.Optionid"
                    class="additional-option"
                  >
                    <p>{{ option.OptionName }}:</p>
                    <ul>
                      <li
                        v-for="selectedItem in option.items.filter(
                          (item) => item.selected
                        )"
                        :key="selectedItem.name"
                      ><span>
                        {{ selectedItem.name}}
                      </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--All Cart's total Price Under the Cart Items-->
        <div class="cart-total">
          <p>Total: ${{ cartStore.cartTotalPrice }}</p>
        </div>
      </div>
    </div>
    <!--Order Summary Section-->
    <div class="order_summary">
      <h2 class="title">Order Summary</h2>
      <hr />
      <div class="total_Items">
        <p>Total Items:</p>
        <p>{{ cartStore.cartTotal }}</p>
      </div>
      <div class="total_Items">
        <p>Aditional Items:</p>
        <p>${{ sumOfAllAdditionalItemsWithQuantity }}</p>
      </div>
      <div class="total_Items">
        <p>Subtotals:</p>
        <p>${{ cartStore.cartTotalPrice.toFixed(2) }}</p>
      </div>
      <div class="total_Items">
        <p>Final Total (with Additional Items):</p>
        <p>${{ finalTotalWithAdditionalItems }}</p>
      </div>
      <div v-if="discount > 0" class="total_Items">
        <p>Discount:</p>
        <p>-${{ discount }}</p>
      </div>
      <!--Coupon Apply Section-->
      <div v-if="Coupondiv" class="coupon-div">
        <p>Apply Coupon</p>
        <div class="cdetails">
          <input
            v-model="couponCode"
            type="text"
            placeholder="Enter Coupon Code"
          />
          <button @click="applyCoupon(0.05)">Apply</button>
        </div>
      </div>
      <!--If Coupon Applied Successfully-->
      <div v-else>
        <h4 class="discount">Your 5% Discoount Applied Successfully!!</h4>
        <div class="total_Items">
          <p>Discount Price:</p>
          <p>${{ (finalTotalWithAdditionalItems - discount).toFixed(2) }}</p>
        </div>
      </div>
      <div class="order_final">
        <div class="total_Items">
          <p>Shipping Fee:</p>
          <p v-if="cartStore.cartItems.length > 0">+{{ fee }}</p>
          <p v-else>+0</p>
        </div>
        <hr />

        <div class="total_Items">
          <p>Total Payment:</p>
          <p>
            ${{
              Coupondiv
                ? (finalTotalWithAdditionalItems - discount + fee).toFixed(2)
                : (finalTotal + fee).toFixed(2)
            }}
          </p>
        </div>
      </div>
      <br />
      <button class="Checkout">Place Order</button>
    </div>
  </div>
</template>

<script setup lang="ts">
//import from vue & Store
import { ref, watch, computed } from "vue";
import { useCartStore } from "../store/cart";
import { isTemplateExpression } from "typescript";

//Define the necessary variables & Store
const cartStore = useCartStore();
const couponCode = ref("");
const finalTotal = ref(0);
const discount = ref(0);
const Coupondiv = ref(true);
const fee = ref(2);

// Cart Items Functions
const removeFromCart = (index: number) => {
  cartStore.removeFromCart(index);
};
const incrementQuantity = (index: number) => {
  cartStore.incrementQuantity(index);
};
const decrementQuantity = (index: number) => {
  cartStore.decrementQuantity(index);
};

// Watch for changes in cartItems and update the fee accordingly
watch(
  () => cartStore.cartItems.length,
  (newCartItemCount, oldCartItemCount) => {
    fee.value = newCartItemCount > 0 ? 2 : 0;
  }
);

// Watch for changes in cartTotalPrice and automatically apply a 5% discount
watch(
  () => cartStore.cartTotalPrice,
  (newTotalPrice, oldTotalPrice) => {
    if (!Coupondiv.value) {
      // Apply a 5% discount
      finalTotal.value = parseFloat((newTotalPrice * 0.95).toFixed(2));
      discount.value = parseFloat((newTotalPrice * 0.05).toFixed(2));
    }
  }
);
// Apply a 5% discount
const applyCoupon = (percent: number) => {
  if (couponCode.value === "TAKA") {
    finalTotal.value = parseFloat(
      (finalTotalWithAdditionalItems.value * (1 - percent)).toFixed(2) + fee
    );
    discount.value = parseFloat(
      (finalTotalWithAdditionalItems.value * percent).toFixed(2)
    );
    Coupondiv.value = false;
  } else {
    alert("Invalid Coupon Code");
  }
};

const calculateSelectedItemsPrice = (additionalOptions) => {
  let sum = 0;

  if (additionalOptions && additionalOptions.length > 0) {
    additionalOptions.forEach((option) => {
      sum += option.items
        .filter((item) => item.selected)
        .reduce((acc, selectedItem) => acc + selectedItem.price, 0);
    });
  }

  return sum.toFixed(2);
};

const sumOfAllAdditionalItems = computed(() => {
  let totalSum = 0;

  cartStore.cartItems.forEach((item) => {
    if (item.additionalOptions && item.additionalOptions.length > 0 && item.quantity>0) {
      item.additionalOptions.forEach((option) => {
        totalSum += option.items
          .filter((item) => item.selected)
          .reduce((acc, selectedItem) => (acc + selectedItem.price* item.quantity) , 0);
      });
    } 
  });

  return totalSum.toFixed(2);
});

// New computed property for additional items with quantity
const sumOfAllAdditionalItemsWithQuantity = computed(() => {
  const additionalItemsSum = parseFloat(sumOfAllAdditionalItems.value);
  const totalWithQuantity = additionalItemsSum;

  return totalWithQuantity.toFixed(2);
});

const finalTotalWithAdditionalItems = computed(() => {
  const subtotal = parseFloat(cartStore.cartTotalPrice);
  const additionalItemsSum = parseFloat(
    sumOfAllAdditionalItemsWithQuantity.value
  );
  const total = subtotal + additionalItemsSum;

  return total.toFixed(2);
});
</script>

<style lang="scss" scoped>
.cart-container {
  font-family: "poppins", sans-serif;
  max-width: 1200px;
  margin: 20px auto;
  border-radius: 18px;
  display: grid;
  grid-template-columns: 5fr 2fr;
  position: relative;
  .Cart_Items {
    border-radius: 18px;
    padding: 10px;
    margin-right: 30px;
    hr {
      margin: 10px 0px;
    }
    .header_cart {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-weight: 500;
        font-size: 26px;
        margin: 10px 0px;
      }
    }
    .empty_cart {
      font-size: 20px;
      font-weight: 500;
      text-align: center;
      margin: 100px auto;
      h2 {
        margin-bottom: 30px;
      }
      a {
        text-decoration: none;
        color: #ffffff;
        font-weight: 500;
        font-size: 18px;
        background-color: #fa801d;
        padding: 10px 20px;
        border-radius: 8px;
        &:hover {
          background-color: #ff8800;
        }
      }
    }
    .cart-item {
      border: 1px solid #ffffff;
      padding: 20px;
      border-radius: 18px;
      margin-bottom: 15px;
      display: flex;
      justify-content: start;
      align-items: center;
      flex-direction: row;
      box-shadow: 0px 0px 10px 0px #ccc;
      img {
        width: 200px;
        height: 150px;
        border-radius: 8px;
        object-fit: cover;
      }
      .Main_details {
        margin-left: 15px;
        h3 {
          font-weight: 600;
          font-size: 24px;
          margin: 0px;
        }
        .details{
          display: flex;
          flex-direction: row;
          justify-content: start;
          align-items: start;
          
          .details1{
            p {
          font-weight: 500;
          font-size: 16px;
          margin: 0px;
          sup {
            color: #ff7300;
            font-size: 12px;
          }
        }
        .category {
          font-weight: 500;
          font-size: 16px;
        }
        .Quantity {
          margin-bottom: 5px;
        }
        button {
          padding: 5px;
          border: none;
          background-color: #ff8800;
          cursor: pointer;
          margin-right: 10px;
          border-radius: 6px;
          color: #ffffff;
          padding: 8px 12px;
          font-family: "poppins", sans-serif;
          &:hover {
            background-color: #fa801d;
          }
        }
          }
          .details2{
            margin-left: 10px;
            .additional-option{
              display: flex;
              flex-direction: row;
              justify-content: start;
              align-items: start;
              p{
                font-weight: 500;
                font-size: 14px;
                margin: 0px;
              }
              ul{
                margin: 0px;
                margin-left: 10px;
                padding: 0px;
                display: flex;
                flex-direction: row;
                justify-items: start;
                align-items: start;
                li{
                  list-style: none;
                  font-weight: 500;
                  font-size: 11px;
                  margin: 0px;
                  span{
                    font-weight: 500;
                    font-size: 11px;
                    margin: 0px;
                    text-align: start;
                  }
                }
              }
            }
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
    .title {
      font-weight: 500;
      font-size: 26px;
      margin: 10px 0px;
    }
    hr {
      margin: 10px 0px;
    }
    .total_Items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .discount {
      color: rgb(2, 121, 2);
      font-weight: 600;
      font-size: 16px;
      border-radius: 8px;
      padding: 10px;
      text-align: center;
      background-color: rgba(64, 255, 47, 0.308);
      margin-bottom: 10px;
    }
    .coupon-div {
      background-color: #ebe8e8;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 8px 10px;
      p {
        font-weight: 600;
        margin: 0px;
        margin-bottom: 8px;
      }
      .cdetails {
        text-align: center;
        input {
          padding: 10px;
          border: none;
          max-width: 170px;
          border-radius: 5px;
          outline: none;
          height: 20px;
          font-size: 14px;
          color: #8a8a8a;
          font-family: "poppins", sans-serif;
        }
        button {
          padding: 5px;
          border: none;
          background-color: #ff8800;
          cursor: pointer;
          border-radius: 6px;
          margin-left: 10px;
          color: #ffffff;
          padding: 10px 12px;
          font-family: "poppins", sans-serif;
          &:hover {
            background-color: #fa801d;
          }
        }
      }
    }
    .Checkout {
      padding: 5px;
      border: none;
      width: 100%;
      background-color: #ff8800;
      cursor: pointer;
      border-radius: 6px;
      color: #ffffff;
      padding: 8px 12px;
      font-size: 16px;
      font-family: "poppins", sans-serif;
      &:hover {
        background-color: #fa801d;
      }
    }
  }
}
</style>
