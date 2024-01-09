<template>
  <div class="container">
    <div class="header">
      <div class="overlay">
        <h1>About</h1>
      </div>
    </div>
    <div class="main_section">
      <div class="image1">
        <img class="img1" src="../assets/Image/menu10.png" alt="">
        <img class="img2" src="../assets/Image/menu11.png" alt="">
      </div>
      <div class="content">
        <p>ABOUT RESTAURANT</p><hr>
        <h3>
          ENJOY AN EXCEPTIONAL <br>
          JOURNEY OF TASTE
        </h3>
        <p>Our buzzy food-hall style concept is inspired by international dining styles, especially in Asia. Explore the following fast-action food stations as busy chefs perform.
          <br>
        Enjoy a verdant Garden to Glass experience. It’s in the view, it’s reflected in the design, and it infuses many drinks. In fact, all our delicious fresh ingredients are sustainably picked from our Jemima’s Kitchen Garden. Our flourishing range of cocktails, spirits, beers and wines are all made with integrity and offer something for every guest.
        </p>
        <button>Our Menu         <font-awesome-icon class="buttonIcon" :icon="['fas', 'arrow-right']" /></button>
      </div>
      <div class="image2">
        <img class="img1" src="../assets/Image/menu12.png" alt="">
        <img class="img2" src="../assets/Image/menu13.png" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  height: 100%;
  background-color: #fff;
  .header{
    max-width: 1250px;
    margin: auto;
    height: 250px;
    background-image: url('../assets/Image/Resturant.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 18px;
    font-family: "poppins", Helvetica, Arial, sans-serif;
    .overlay{
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.63);
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      h1{
        color: #fff;
        font-weight: 500;
        font-size: 46px;
      }
    }
  }
  .main_section{
    width: 100%;
    margin: auto;
    font-family: 'poppins';
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;

    .image1{

      .img1{
        margin-top: 20px;
        max-width: 300px;
      }
      .img2{
        margin-top: 80px;
        margin-left: 50px;
        max-width: 250px;
      }
    }
    .image2{
      .img1{
        margin-top: 20px;
        max-width: 300px;
      }
      .img2{
        margin-top: 80px;
        margin-right: 50px;
        max-width: 250px;
      }
    }
    .content{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: center;
      padding: 50px;
      align-content: center;
      position: relative;
      hr{
        width: 45%;
        height: 2px;
        background-color: #b3b3b3;
        border: none;
        position: absolute;
        top: 78px;
      }
      p{
        font-size: 18px;
        font-weight: 400;
        padding: 0 20px;
        text-align: center;
        color: #000;
        background-color: #fff;
        z-index: 1;
      }
      h3{
        font-size: 36px;
        font-weight: 500;
        text-align: center;
        color: #000;
        background-color: #fff;
        z-index: 1;
      }
      button{
        width: 200px;
        height: 50px;
        background-color: #000;
        border: none;
        border-radius: 8px;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        margin-top: 50px;
        cursor: pointer;
        position: relative;
        .buttonIcon{
        background-color: #242424;
        padding: 16px;
        position: absolute;
        top: 0px;
        right: -28px;
        border-radius: 6px;
      }
      }
    }
  }
}
</style>
