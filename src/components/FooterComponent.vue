<template>
    <div class="container">
        <div class="grid-container">
            <div class="section1">
                <h1>Uber<span>Eats</span></h1>
                <p>Uber Eats offers pizza, salad, pasta, Tex-Mex,
                sandwich, burger and croque menus, with
                lunch menus, halal options and free delivery
                in zone 75/7.</p>
                <span>
                    <font-awesome-icon class="social-icons" :icon="['fab', 'facebook']" />
                    <font-awesome-icon class="social-icons" :icon="['fab', 'square-instagram']" />
                    <font-awesome-icon class="social-icons" :icon="['fab', 'linkedin']" />
                </span>
            </div>
            <div class="section2">
                <h3>Location</h3>
                <p>123 Islamic Street, Dhaka, Bangladesh</p>
            </div>
            <div class="section3">
                <h3>Subscribe</h3>
                <span>
                    <input type="email" placeholder="Enter Your Email">
                    <button>
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    </button>
                </span>
            </div>
            <div class="section4">
                <h3>Application</h3>
                <span>
                    <img :src="AppStoreIcon" alt="App Store Icon" />
                    <img :src="GooglePlayIcon" alt="Google Play Icon" />
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import AppStoreIcon from "../assets/Image/AppStore.png"
import GooglePlayIcon from "../assets/Image/GooglePlaystore.png";
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
        max-height: auto;
        max-width: 1300px;
        margin: auto;
        padding: 35px;
        /*---------Grid--------*/
        display: grid;
        grid-template-columns: 3fr 1fr 1fr 1fr;
        justify-content: center;
        .section1{
            padding: 0 30px 0 30px;
            h1{
                cursor: pointer;
                font-weight: 500;
                font-size: 42px;
                padding: 15px 0px 15px 0px;
                span{
                    font-size: 42px;
                    font-weight: 600;
                }
            }
            p{
                font-size: 16px;
                font-weight: 400;
                line-height: 1.5;
                margin-bottom: 10px
            }
            span{
                font-size: 24px;
                .social-icons{
                    margin-right: 10px;
                    cursor: pointer;
                    color: variables.$primary-color;
                    
                }
            }
        }
        .section2{
            grid-column: 1fr;
            padding: 0 30px 0 30px;
            h3{
                @include mixins.small-heading;
            }
        }
        .section3{
            grid-column: 1fr;
            padding: 0 30px 0 30px;
            h3{
                @include mixins.small-heading;
            }
            span{
                position: relative;
                input{
                    border: none;
                    padding: 10px 20px;
                    border-radius: 9px;
                    font-size: 16px;
                    height: 54px;
                    max-width: 280px;
                    font-weight: 500;
                    &:focus{
                        outline: none;
                    }
                }
                button{
                    background-color: variables.$primary-color;
                    color: variables.$text-color;
                    border: none;
                    height: 54px;
                    position: absolute;
                    top: -16px;
                    right: 0;
                    padding: 10px 20px;
                    border-radius: 9px;
                    cursor: pointer;
                    font-size: 20px;
                    color: variables.$background-color;
                    font-weight: 500;
                
                }
            }
        }
        .section4  {
            grid-column: 1fr;
            padding: 0 30px 0 30px;
        h3{
            @include mixins.small-heading;
            margin-left:15px;
        }
        span{
            img{
                margin-left: 15px;
                max-height: 52px;
                max-width: 180px;
                margin-bottom: 10px;
            }
        }
        }
    }
    @include  mixins.respond-to (768px, 1024px) {
        .grid-container{
            grid-template-columns: 2fr 1fr;
        }
    }
    @include  mixins.respond-to (268px, 767px) {
        .grid-container{
            grid-template-columns: 1fr;
        }
    }
}
</style>