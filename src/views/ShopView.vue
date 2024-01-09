<template>
    <div class="container">
      <div class="header">
        <h2 class="title">Menu</h2>
        <div class="overlay"></div>
        <div class="btns">
            <button class="btn1">Livraison</button>
            <button class="btn2">Click & Collect</button>
            <select class="option" id="location" v-model="selectedLocation"
            icon="map-marker-alt"
            >
            <option class="disabled_option" value="" disabled>Select Location</option>
            <option class="main_option" v-for="location in hardcodedLocations" :key="location.id" :value="location.id">
                {{ location.name }}
            </option>
            </select>
        </div>
      </div>
        <VerticalTab />
    </div>
</template>

<script lang="ts" setup>
import VerticalTab from '../components/VerticalTab.vue';
import { ref } from 'vue';
const selectedLocation = ref('');
  const hardcodedLocations = ref([
    { id: 1, name: 'Dhanmodi, Dhaka' },
    { id: 2, name: 'Jatrabari,Dhaka' },
    { id: 3, name: 'Mirpur-10, Dhaka' },
    { id: 3, name: 'Mohommodpur, Dhaka' },
    // Add more locations as needed
  ]);
</script>

<style lang="scss" scoped>

.container{
    max-width: 1200px;
    margin: auto;
    .header{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
        background-color: aliceblue;
        border-radius: 18px;
        background-image: url('../assets/Image/Default_Food.jpg');
        padding: 50px;
        background-color: #333;
        position: relative;
        .overlay{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 18px;
            background-color: rgba(0, 0, 0, 0.699);
            z-index: 1;
        }
        .title{
            font-family: 'poppins', sans-serif;
            font-size: 46px;
            font-weight: 600;
            color: #ffffff;
            padding: 0px;
            margin: 0px;
            z-index: 2;
        }
        .btns{
            margin-top: 25px;
            z-index: 3;
            .btn1{
                font-family: 'poppins', sans-serif;
                font-size: 16px;
                font-weight: 600;
                margin-right: 20px;
                color: #fff;
                background-color: #ff7b00;
                border:none;
                border-radius: 10px;
                padding: 10px 20px;
                cursor: pointer;
                &:hover{
                    background-color: #fff;
                    color: #333;
                }
            }
            .btn2{
                font-family: 'poppins', sans-serif;
                font-size: 16px;
                font-weight: 600;
                margin-right: 20px;
                color: #333;
                background-color: #fff;
                border: none;
                border-radius: 10px;
                padding: 10px 20px;
                cursor: pointer;
                &:hover{
                    background-color: #ff7b00;
                    color: #fff;
                }
            }
            .option{
                font-family: 'poppins', sans-serif;
                font-size: 16px;
                font-weight: 600;
                color: #333;
                background-color: #fff;
                border: none;
                outline: none;
                border-radius: 10px;
                padding: 10px 20px;
                cursor: pointer;
                &:hover{
                    background-color: #fff;
                    color: #333;
                }
            }

        } 
    }
}
</style>