<!-- ---------------------------------- IMPORTS ----------------------------------
--------------------------------------------------------------------------------- -->

<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";
import ImageGallery from "./imageGallery.vue"
import {ref} from "vue"

// ------------------------------------ CONSTS -------------------------------------------
// --------------------------------------------------------------------------------------

const posts = ref([])

// ----------------------------------- FUNCTIONS ----------------------------------------
// --------------------------------------------------------------------------------------

const addNewPost = (post) => {
    posts.value.unshift(post)
}

</script>

<!-- ------------------------------ TEMPLATE ----------------------------------
------------------------------------------------------------------------------ -->

<template>
    <Container>

     <div class="profile-container">
        {{posts}}
            <UserBar 
            :key="$route.params.username"
                username="laithhard"
                :userInfo="{
                    posts:4,
                    followers: 100,
                    following: 342
                }"
                :addNewPost="addNewPost"
            />
            <ImageGallery 
                :posts="posts"
            />
     </div>
    </Container>
</template>

<!-- ------------------------------ STYLES ---------------------------
--------------------------------------------------------------------- -->

<style scoped>

    .profile-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }

</style>