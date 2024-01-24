<script setup>
import { defineProps } from 'vue';


const props = defineProps(['posts'])
const {VITE_BASE_PHOTO_URL} = import.meta.env

</script>

<template>
    <div class="image-gallery-container">
        <router-link v-for="post in props.posts"  :key="post.id" 
            :to="{name: 'PostDetail', params: {postId: post.id}}" >
                  <img 
                    :src="`${VITE_BASE_PHOTO_URL}${post.url}`" 
                     alt=""
                    >
        </router-link>
      
    </div>
</template>

<style scoped>
    .image-gallery-container {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
    }

    img {
        margin: 5px;
        width: 100px;
    }

</style>