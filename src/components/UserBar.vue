<!-- ------------------------------IMPORTS ------------------------------
------------------------------------------------------------------------ -->

<script setup>
import {defineProps} from "vue"
import UploadPhotoModal from "./UploadPhotoModal.vue"
import {useRoute} from "vue-router"
import {useUserStore} from "../stores/users"
import { storeToRefs } from "pinia";

// ---------------------------- CONSTS -----------------------------
// -----------------------------------------------------------------

const route = useRoute();
const userStore = useUserStore();
const {user} = storeToRefs(userStore)
const {username: profileUsername} = route.params
const props = defineProps(['user', 'userInfo', 'addNewPost'])

// --------------------------------FUNCTIONS -------------------------
console.log(user)
console.log(profileUsername)

</script>

<!-- ---------------------------- TEMPLATE -------------------------
------------------------------------------------------------------- -->

<template>
    <div class="userbar-container" v-if="props.user">
      
        <div class="top-content">
            <a-typography-title :level="2">
                {{props.user.username}}
            </a-typography-title>
            <!-- check if username from params is equal to user name from hook -->
            <UploadPhotoModal 
                v-if="user && profileUsername === user.username"
                :addNewPost="addNewPost"
                 />
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5">{{props.userInfo.posts}} posts</a-typography-title>
            <a-typography-title :level="5">{{props.userInfo.followers}} followers</a-typography-title>
            <a-typography-title :level="5">{{props.userInfo.following}} following</a-typography-title>
          </div>
    </div>
    
    <div class="userbar-container" v-else>
        <div class="top-content">
            <a-typography-title :level="2">
                User Not Found
            </a-typography-title>
         
        </div>
    </div>
</template>

<!-- -------------------------------------- STYLES -------------------------
---------------------------------------------------------------------------- -->

<style scoped>
    .userbar-container {
     
        padding-bottom: 75px;

    }

    .bottom-content {
        background-color: aquamarine;
        display: flex;
        align-items: center;

    }

    .bottom-content h5 {
        margin: 0 !important;
        padding: 0;
        margin-right: 30px !important;
        
    }

    .top-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

</style>