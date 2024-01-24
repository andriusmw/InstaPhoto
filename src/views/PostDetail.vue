<script setup>
import { ref, onMounted} from 'vue';
import { supabase } from '../../supabase';
import { useRoute, useRouter } from 'vue-router';
import {useUserStore} from "../stores/users"
import { storeToRefs } from "pinia";

// ------------------------------------ CONSTS -------------------------------------------
// --------------------------------------------------------------------------------------
const userStore = useUserStore()
const {user: loggedInUser} = storeToRefs(userStore)
const route = useRoute();
const router = useRouter();
const post = ref(null);
const {VITE_BASE_PHOTO_URL} = import.meta.env
const isOwner = ref(false)

// Comprobar si el owner_id del post es igual al id del usuario actual
const CheckOwner = (() => {
    if(post){
        if (post.value.owner_id === loggedInUser.value.id) {
            isOwner.value = true
              console.log("isowner TRUE")
        } else {
             isOwner.value = false
             console.log("isowner FALSE")
        }
    } else {
        console.log("No hay post")
    }
   
});

// Función para borrar el post
const deletePost = async () => {
  if (post.value) {
    // Realizar la lógica para borrar el post en Supabase
    await supabase.from('posts').delete().eq('id', post.value.id);

    // Redirigir a una página de inicio o a donde desees después de borrar el post
    router.push('/');
  }
};

//----------------------------------

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

    //Calls the function to check the owner
    CheckOwner()

});
</script>

<template>
  <div class="post-detail">
    <h2>Details of the post</h2>
    <div v-if="post">
      
      <img :src="`${VITE_BASE_PHOTO_URL}${post.url}`" alt="Post Image" />
      <p>{{ post.username }}</p>
        <p>{{post.caption}}</p>
        <!-- Mostrar el botón de borrar solo si el owner_id es igual al id del usuario actual -->
      <button v-if="isOwner" @click="deletePost">Borrar Post</button>
    </div>
    <div v-else>
      <p>Loading details...</p>
    </div>
  </div>
</template>



<style scoped>

</style>