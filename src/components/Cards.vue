<!-- ---------------------------------------IMPORTS ---------------------------------------------
---------------------------------------------------------------------------------------------- -->
<script setup>
import Card from "./Card.vue"
import {supabase} from "../../supabase"
import {useUserStore} from "../stores/users"
import { storeToRefs } from "pinia"
import {onMounted, ref} from "vue"

//------------------------------------------ CONSTS ------------------------------------------
// -------------------------------------------------------------------------------------------

const userStore = useUserStore()
const {user} = storeToRefs(userStore)
const posts = ref([])



// -------------------------------------------------FUNCTIONS ------------------------------------
// -----------------------------------------------------------------------------------------------

const fetchData = async () => {
    // this gets the ids of the people we are following
    const {data: followings} = await supabase.from("followers_following")
        .select("following_id").eq("follower_id", user.value.id)

    // turns the array of objects that is followings into an array of numbers 
    //where each number is a following_id
    const owner_ids = followings.map(f => f.following_id)    

    //gets all the posts from those owner_ids (which are the ones we are folling)
    const {data } = await supabase.from("posts")
        .select().in('owner_id', [owner_ids]) 
         posts.value = data
}

//-------------------------------------------------

onMounted(() => {
    fetchData()
})

</script>

<!-- --------------------------------------- TEMPLATE --------------------------------------------
------------------------------------------------------------------------------------------------- -->

<template>
     <div class="timeline-container">
                 <Card v-for="post in posts" :key="post.id" :post="post" />
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