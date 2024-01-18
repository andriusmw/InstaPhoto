<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";


</script>

<template>
    <Container>

     <div class="profile-container">
            <UserBar 
                username="laithhard"
                :userInfo="{
                    posts:4,
                    followers: 100,
                    following: 342
                }"
            />
            <h2>ImageGallery</h2>
     </div>
    </Container>
</template>

<style scoped>

    .profile-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }

</style>