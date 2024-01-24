<!-- ---------------------------------- IMPORTS ------------------------------------
----------------------------------------------------------------------------------- -->

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

//------------------------------------- FUNCTIONS --------------------------------------------
// ------------------------------------------------------------------------------------------ -->

// Check if the owner is the same as loggedInUser
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

//-------------------------------------------------------

const deletePost = async () => {
  if (post.value) {
    // deleting on supabase
    await supabase.from('posts').delete().eq('id', post.value.id);

    // redirect after deleting
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

<!-- ------------------------------------ TEMPLATE -------------------------------------------
--------------------------------------------------------------------------------------------- -->

<template>
  <div class="post-detail">
    
    <div v-if="post" class="post">
      
      <img :src="`${VITE_BASE_PHOTO_URL}${post.url}`" alt="Post Image" />

      <div class="right">
        <button v-if="isOwner" @click="deletePost">Borrar Post</button>
         <h2>Details of the post</h2>
          <h2>Made by: {{ post.username }}</h2>
          <p>Description: {{post.caption}}</p>
       
      </div>
  
    </div>
    <div v-else>
      <p>Loading details...</p>
    </div>
  </div>
</template>



<style scoped>

    .post-detail {
       margin-left: 5vw;
       margin-top: 5vh;
        width: 90vw;
        height: 90vh;

    }

    .post-detail img {
        padding: 5px;
        width: 70%;
        height: 100%;
    }

     .right {
        float: right;
        padding-left: 10px;
    }

    .post {
        display: flex;
        justify-content: center;
        border: 2px solid lightblue;
        

    }
  



</style>