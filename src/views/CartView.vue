<template>
    <div>
        <transition name="fade" mode="in-out">
            <CartComponent />
        </transition>
    </div>
</template>

<script lang="ts" setup>
import CartComponent from '../components/CartComponent.vue';
</script>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}
</style>