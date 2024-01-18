<script setup>
import Container from "./Container.vue";
import Card from "./Card.vue"

const data = [
    {
        id:1,
        username: "selena",
        url: "https://www.hola.com/fashion/imagenes/tendencias/2024011376690/selena-gomez-look-traje-premios-afi/0-365-477/selena-e.jpg",
        caption: "hi"
   },
    {
         id:2,
         username: "Paul Walker",
         url: "https://images.news18.com/webstories/2023/12/2b9d5590f5d31bc758a795386f51d4a4.jpg",
         caption:"Hello guys, u ready for a D*th Race? ;D "
    },
       {
         id:3,
         username: "Will Smith",
         url: "https://es.web.img2.acsta.net/pictures/17/02/08/16/50/452749.jpg",
         caption: "Indepence day rules b*tches! yeah!"
    },


]

</script>

<template>
    <Container>

     <div class="timeline-container">
           <Card v-for="post in data" :key="post.id" :post="post" />
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