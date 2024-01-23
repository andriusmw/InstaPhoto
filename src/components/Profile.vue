<!-- ---------------------------------- IMPORTS ----------------------------------
--------------------------------------------------------------------------------- -->

<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";
import ImageGallery from "./imageGallery.vue"
import {useRoute} from "vue-router"
import {ref, onMounted} from "vue"
import {supabase} from "../../supabase"

// ------------------------------------ CONSTS -------------------------------------------
// --------------------------------------------------------------------------------------

const route = useRoute()
const {username} = route.params
const posts = ref([])
const user = ref(null)

// ----------------------------------- FUNCTIONS ----------------------------------------
// --------------------------------------------------------------------------------------

const addNewPost = (post) => {
    posts.value.unshift(post)
}

const fetchData = async() => {
    // gets the user data from the user with the same username as in our route.params
    const {data: userData} = await 
        supabase.from("users").select().eq('username', username).single()

    if(userData){
        user.value = userData 
        //Stores the data in our user ref state
    }
    //  Now it makes a fetch from the posts of the user with that id
    const {data: postsData} = await supabase
        .from("posts").select().eq("owner_id", user.value.id)

    posts.value = postsData
}
//-----------------------------------------------------------
onMounted( ()=> {
    fetchData()
}
)

</script>

<!-- ------------------------------ TEMPLATE ----------------------------------
------------------------------------------------------------------------------ -->

<template>
    <Container>

     <div class="profile-container">
      
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