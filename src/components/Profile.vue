<!-- ---------------------------------- IMPORTS ----------------------------------
--------------------------------------------------------------------------------- -->

<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";
import ImageGallery from "./imageGallery.vue"
import {useRoute} from "vue-router"
import {ref, onMounted, watch} from "vue"
import {supabase} from "../../supabase"
import {useUserStore} from "../stores/users"
import { storeToRefs } from "pinia";

// ------------------------------------ CONSTS -------------------------------------------
// --------------------------------------------------------------------------------------
const userStore = useUserStore()
const route = useRoute()
const {username} = route.params
const {user: loggedInUser} = storeToRefs(userStore)
const posts = ref([])
const user = ref(null)
const loading = ref(false)
const isFollowing = ref(false)

// ----------------------------------- FUNCTIONS ----------------------------------------
// --------------------------------------------------------------------------------------

const addNewPost = (post) => {
    posts.value.unshift(post)
}

// ----------------------------------------------

const updateIsFollowing = (follow) => {
    isFollowing.value = follow
}

// ----------------------------------------------

const fetchData = async() => {
    loading.value = true
    // gets the user data from the user with the same username as in our route.params
    const {data: userData} = await 
        supabase.from("users").select().eq('username', username).single()

        if(!userData) {
              loading.value = false
              return user.value = null
        }
   
        user.value = userData 
        //Stores the data in our user ref state
   
    //  Now it makes a fetch from the posts of the user with that id
       const {data: postsData} = await supabase
        .from("posts").select().eq("owner_id", user.value.id)

      posts.value = postsData
      await fetchIsFollowing()
      loading.value = false
}
//-----------------------------------------------------------
watch(loggedInUser, () => {
    fetchIsFollowing()

})

// ------------------------------------------------------
onMounted( ()=> {
    fetchData()
}
)

//---------------------------------------------------------
const fetchIsFollowing = async () => {
    if(loggedInUser.value && (loggedInUser.value.id !== user.value.id ) ) {
        const {data}= await supabase.from("followers_following")
        .select().eq("follower_id", loggedInUser.value.id )
            .eq("following_id", user.value.id )
            .single()

        if(data) return  isFollowing.value = true
    }
    
}

</script>

<!-- ------------------------------ TEMPLATE ----------------------------------
------------------------------------------------------------------------------ -->

<template>
    <Container>

     <div class="profile-container" v-if="!loading">
      
            <UserBar 
            :key="$route.params.username"
                :user="user"
                :userInfo="{
                    posts:4,
                    followers: 100,
                    following: 342
                }"
                :addNewPost="addNewPost"
                :isFollowing="isFollowing"
                :updateIsFollowing="updateIsFollowing"
            />
            <ImageGallery 
                :posts="posts"
            />
     </div>
     <div v-else class="spinner">
        <a-spin></a-spin>
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

    .spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 85vh;
    }

</style>