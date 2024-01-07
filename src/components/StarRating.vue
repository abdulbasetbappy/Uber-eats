<template>
    <div class="star-rating">
      <font-awesome-icon
        v-for="i in 5"
        :key="i"
        :icon="[i <= rating ? 'fas' : 'far', 'star']"
        class="star"
      />
    <span class="rating-number">{{ rating.toFixed(1) }}</span>
</div>
</template>

  <script>
  export default {
    props: {
      rating: {
        type: Number,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .star-rating {
    display: flex;
    align-items: center;
  }
  
  .star {
    color: #ffc107; /* Yellow color for filled stars */
    margin-right: 2px;
  }
  
  .rating-number {
    margin-left: 5px;
  }
  </style>
  