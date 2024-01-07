<template>
  <div class="container">
    <div class="grid-container1">
      <div class="section1">
        <h2>Savor the Flavors <br>
          Order with Ease</h2>
          <p>Savor the Flavors, Order with Ease - Indulge in a gastronomic journey with
          our curated menu of delectable dishes. Explore a world of culinary delights
          and order with unparalleled.</p>
        <button class="btn1">Livraison</button>
        <button class="btn2">Click & Collect</button>
        <select id="location" v-model="selectedLocation"
        icon="map-marker-alt"
        >
          <option value="" disabled>Select an option</option>
          <option v-for="location in hardcodedLocations" :key="location.id" :value="location.id">
            {{ location.name }}
          </option>
        </select>
      </div>
      <div class="section2">
        <img src="../assets/Image/Plates.png" alt="Plates">
      </div>
    </div>
    <div class="grid-container2">
      <div class="section1">
        <img src="../assets/Image/Background02.png" alt="">
        <div class="gradient-overlay"></div>
      </div>
      <div class="section2">
        <p class="title">About Us</p>
        <h2>Discover Our <br>
        Restaurant Story</h2>
          <p> Immerse yourself in the narrative of culinary passion and innovation that defines
          our establishment. From humble beginnings to a gastronomic haven, our journey
          unfolds through flavors, traditions, and a commitment to excellence. Join us on this
          captivating exploration of our restaurant's story, where every dish is a chapter and
          every dining experience is a page in our delicious tale. Unveil the rich tapestry of our
          culinary narrative, where passion meets plate. From the roots of our inspiration to
          the heights of gastronomic innovation, embark on a journey that unfolds the
          essence of our restaurant.</p>
        <button>Discover Our Menu
          <font-awesome-icon class="buttonIcon" :icon="['fas', 'arrow-right']" />
        </button>  
      </div>
      <div class="section3">
        <img src="../assets/Image/Background01.png" alt="">
        <div class="gradient-overlay"></div>
      </div>
    </div>
    <TabComponent />
    <div class="grid-container3">
      <div class="section1">
        <p class="subtitle">Contact Us</p>
        <h2 class="title">Get In Touch</h2>
        <div class="firstRow">
          <div class="inputSection">
            <input type="text" placeholder="Enter Your Name">
            <input type="email" placeholder="Enter Your Email">
            <textarea type="textarea" placeholder="Write Your Massage" rows="5"></textarea>
            <button>Submit</button>
          </div>
          <div class="googleMap">
            <img src="../assets/Image/Rectangle 68.png" alt="">
          </div>
        </div>
        <div class="secondRow">
          <div class="email">
            <img src="../assets/Image/gmail.png" alt="">
            <div class="text">
              <h3>E-Mail</h3>
              <p>example@email.com</p>
              <p>Suppouse@gmail.com</p>
            </div>
          </div>
          <div class="email">
            <img src="../assets/Image/phone.png" alt="">
            <div class="text">
              <h3>Phone</h3>
              <p>+88014 2458 6589</p>
              <p>+88018 2547 2658</p>
            </div>
          </div>
          <div class="email">
            <img src="../assets/Image/location.png" alt="">
            <div class="text">
              <h3>Location</h3>
              <p>123 Islamic Street,</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TabComponent from './TabComponent.vue';
import { ref } from 'vue';
const selectedLocation = ref('');
const hardcodedLocations = ref([
  { id: 1, name: 'Location 1' },
  { id: 2, name: 'Location 2' },
  { id: 3, name: 'Location 3' },
  // Add more locations as needed
]);
</script>

  <style lang="scss" scoped>
  @use '../styles/scss/utils/index.scss' as variables;
  @import '../styles/scss/main.scss';

  .container {
    background-color: variables.$background-color-Secondary;
    .grid-container1{
      max-width: 1300px;
      margin: auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 20px 50px 20px 50px;
      justify-items: center;
      align-items: center;
      .section1{
        h2{
          font-size: 36px;
          font-weight: 600;
          margin-bottom: 1rem;
          margin-left: 20px;
        }
        p{
          font-size: 14px;
          font-weight: 400;
          margin-bottom: 1rem;
          margin-left: 20px;
        }
        button{
          width: 13rem;
          height: 3rem;
          border-radius: 6px;
          border: none;
          margin-bottom: 1rem;
          font-size: 16px;
          font-weight: 600;
          margin-left: 20px;
        }
        .btn1{
          background-color: #FF8800;
          color: #000000;
        }
        .btn2{
          background-color: #ffffff;
          color: #000000;
        }
        select{
          margin-left: 20px;
          width: 27rem;
          height: 3rem;
          border-radius: 6px;
          border: none;
          margin-bottom: 1rem;
          font-size: 15px;
          font-weight: 500;
          padding: 0px 25px 0px 25px;
          background-color: #ffffff;
        }
      }
      .section2{
        img{
          width: 100%;
          height: 100%;
          animation: rotate 36s linear infinite; /* Adjust the duration as needed */
          max-width: 100%;
          height: auto;
          margin: 0 auto; /* Center the image horizontally */
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      }
    };
    .grid-container2 {
      background-color: white;
      display: grid;
      grid-template-columns: 4fr 5fr 2fr;
      margin: auto;
      max-width: 100%;
      height: 600px;
      .section1 {
        z-index: 2;
        position: relative;
        width: 100%;
        max-width: 600px;
        overflow: hidden;
        display: grid;
        justify-items: end;
        align-items: end;
        img{
          max-width: 100%;
          display: block;
          padding-bottom: 50px ;
        }
        .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

        }
      }

      .section2 {
        z-index: 3;
        margin: auto;
        padding-left: 50px;
        .title{
          font-size: 18px;
          margin-bottom: 1rem;
          color: #FF8800;
        }
        h2{
          font-size: 36px;
          font-weight: 600;
          line-height: 40px;
          margin-bottom: 10px;
        }
        p{
          font-size: 14px;
          font-weight: 400;
          margin-bottom: 1rem;
          min-width: 600px;
          color: #5a5a5a;
        }
        button{
          width: 13rem;
          height: 3rem;
          border-radius: 6px;
          border: none;
          font-size: 16px;
          font-weight: 600;
          background-color: #FF8800;
          color: #ffffff;
          position: relative;
          .buttonIcon{
            background-color: #fca13a;
            padding: 16px;
            position: absolute;
            top: 0;
            right: -24px;
            border-radius: 6px;
          }
        }
      }

      .section3 {
        position: relative;
        z-index: 1;
        display: grid;
        align-items: end;
        justify-items: end;
        margin-left: -120px; // Adjust this value as needed

        img {
          max-width: 100%;
          height: auto;
          display: block;
        }

        .gradient-overlay {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          background: linear-gradient(180deg, rgba(254, 254, 254, 0.33375348430387786) 0%, rgba(249, 249, 249, 0.199) 49%);
        }
      }
    }
    .grid-container3{
      margin: auto;
      max-width: 100%;
      background-color: #ffffff;
      .section1{
        max-width: 1300px;
        margin: auto;
        .subtitle{
          font-size: 18px;
          margin-bottom: 1rem;
          padding-top: 80px;
          color: #FF8800;
          text-align: center;
        }
        .title{
          font-size: 36px;
          font-weight: 600;
          line-height: 40px;
          margin-bottom: 80px;
          text-align: center;
        }
        .firstRow{
          display: grid;
          grid-template-columns: 1fr 1fr;
          .inputSection{
            background-color: variables.$background-color-Secondary;
            margin-right: 50px;
            padding:  60px ;
            border-radius: 36px;
            input{
              width: 100%;
              height: 3rem;
              border-radius: 6px;
              border: none;
              margin-bottom: 1.5rem;
              font-size: 15px;
              font-weight: 500;
              padding: 0px 25px 0px 25px;
              background-color: #ffffff;
            }
            textarea{
              width: 100%;
              border-radius: 6px;
              border: none;
              margin-bottom: 1.5rem;
              font-size: 15px;
              font-weight: 500;
              padding: 25px 25px 25px 25px;
              background-color: #ffffff;
            }
            button{
              width: 100%;
              height: 3rem;
              border-radius: 10px;
              border: none;
              font-size: 16px;
              font-weight: 600;
              background-color: #FF8800;
              color: #ffffff;
            }
          }
          .googleMap{
            margin-left: 50px;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
        .secondRow{
          margin: 60px 0px 100px 0px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          column-gap: 50px;
          .email{
            display: grid;
            grid-template-columns: 1fr 3fr;
            margin-bottom: 1.5rem;
            padding: 25px;
            background-color: variables.$background-color-Secondary;
            border-radius: 35px;
            justify-items: start;
            align-items: center;
            img{
              width: 80%;
              height: 80%;
            }
            .text{
              margin-left: 20px;
              h3{
                font-size: 26px;
                font-weight: 600;
                color: #000000;
              }
              p{
                font-size: 18px;
                font-weight: 400;
                color: #5a5a5a;
              }
            }
          }
        }
      }

    }
  }
  </style>
