<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../../supabase';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);
const {VITE_BASE_PHOTO_URL} = import.meta.env

onMounted(async () => {
    // Obtaining the postId from the rpute params
  const postId = route.params.postId;

    // Obtaining the details of the post using postId
  const { data: postData } = await supabase
    .from('posts')
    .select()
    .eq('id', postId)
    .single();
  // sending the  details of the post to post.value
  post.value = postData;
  //console.log(postData)
});
</script>

<template>
  <div class="post-detail">
    <h2>Details of the post</h2>
    <div v-if="post">
      
      <img :src="`${VITE_BASE_PHOTO_URL}${post.url}`" alt="Post Image" />
      <p>{{ post.username }}</p>
        <p>{{post.caption}}</p>
    </div>
    <div v-else>
      <p>Loading details...</p>
    </div>
  </div>
</template>



<style scoped>

</style>