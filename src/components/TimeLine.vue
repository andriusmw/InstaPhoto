<script setup>
import Container from "./Container.vue";
import Card from "./Card.vue"


</script>

<template>
    <Container>

     <div class="timeline-container">
           <Card />
     </div>
    </Container>
</template>

<style scoped>

    .timeline-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }

</style>