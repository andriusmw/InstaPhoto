<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";


</script>

<template>
    <Container>

     <div class="profile-container">
            <UserBar />
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