<script setup>
import Card from "./Card.vue"
import {supabase} from "../../supabase"
import {useUserStore} from "../stores/users"
import { storeToRefs } from "pinia"
import {onMounted} from "vue"


const userStore = useUserStore()
const {user} = storeToRefs(userStore)

const data = [
    {
        id:1,
        username: "Selena Gómez",
        url: "https://www.hola.com/fashion/imagenes/tendencias/2024011376690/selena-gomez-look-traje-premios-afi/0-365-477/selena-e.jpg",
        caption: "hello Papi"
   },
    {
         id:2,
         username: "Paul Walker",
         url: "https://images.news18.com/webstories/2023/12/2b9d5590f5d31bc758a795386f51d4a4.jpg",
         caption:"Hello guys, u ready for a Race? ;D "
    },
       {
         id:3,
         username: "Will Smith",
         url: "https://es.web.img2.acsta.net/pictures/17/02/08/16/50/452749.jpg",
         caption: "Indepence day rules b******! yeah!"
    },


]

// -------------------------------------------------FUNCTIONS ------------------------------------
// -----------------------------------------------------------------------------------------------

const fetchData = async () => {
    // this gets the ids of the people we are following
    const response = await supabase.from("followers_following")
        .select("following_id").eq("follower_id", user.value.id)
}

//-------------------------------------------------

onMounted(() => {
    fetchData()
})

</script>



<template>
     <div class="timeline-container">
                 <Card v-for="post in data" :key="post.id" :post="post" />
    </div>


</template>


<style scoped>

    .timeline-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }

</style>