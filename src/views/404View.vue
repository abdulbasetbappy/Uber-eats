<template>
    <div class="container">
        <h1>404</h1>
        <p>Page not found</p>
        <button>
          <router-link to="/">
            Go To Home         <font-awesome-icon class="buttonIcon" :icon="['fas', 'arrow-right']" />
          </router-link>
        </button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1{
        font-size: 10rem;
        font-weight: 900;
        margin: 0;
        color: #797979;
    }
    p{
        font-size: 2rem;
        font-weight: 900;
        margin: 0;
        color: #797979;
    }
    button{
        margin-left: 50px;
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
        left: -28px;
        border-radius: 6px;
        rotate: 180deg;
      }
      a{
        text-decoration: none;
        color: #fff;
      }
    }
}
</style>