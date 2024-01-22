<!-- ------------------------------------ IMPORTS ---------------------------------------------------
---------------------------------------------------------------------------------------------------- -->

<script setup>
import {RouterLink, useRouter} from "vue-router"
import Container from "./Container.vue"
import {ref} from "vue"
import AuthModal from "./AuthModal.vue"
import {useUserStore} from "../stores/users"
import { storeToRefs } from 'pinia';

// ------------------------------------- CONSTS ---------------------------------------------
// ------------------------------------------------------------------------------------------

const userStore = useUserStore()

const { user, loadingUser} = storeToRefs(userStore)
const router = useRouter()
const searchUsername = ref("")

// ------------------------------------- FUNCTIONS ------------------------------------------
// ------------------------------------------------------------------------------------------
const onSearch = () => {
    if(searchUsername.value) {
        router.push(`/profile/${searchUsername.value}`);
        searchUsername.value = ""
    }
}

const handleLogout = async () => {
    await userStore.handleLogout()
}

const goToUsersProfile = () => {
    router.push(`/profile/${user.value.username}`)


}
// ------------------------------------- TEMPLATE ------------------------------------------
// -----------------------------------------------------------------------------------------

</script>

<template>
    <a-layout-header>
        <Container>
           <!--   {{user}} to check if we get user -->
            <div class="nav-container">
               <div class="left-content">
                 <RouterLink to="/">Instagram</RouterLink>
                <a-input-search 
                        v-model:value="searchUsername"
                        placeholder="username..."
                        style="width: 200px"
                        @search="onSearch"
                />
               </div>
             <div v-if="!loadingUser">
                  <div class="right-content" v-if="!user">
                     <AuthModal :isLogin="false"/>
                     <AuthModal :isLogin="true"/>
                 </div>
 
                  <div class="right-content" v-else>
                      <a-button type="primary" @click="goToUsersProfile()">Profile</a-button>
                      <a-button type="primary" @click="handleLogout()" >Logout</a-button>
                 </div>
             </div>


            </div>
        </Container>
    </a-layout-header>
</template>

<!-- ----------------------------------------- STYLES --------------------------------------------------
------------------------------------------------------------------------------------------------------- -->

<style scoped>
header.ant-layout-header {
    background-color: black;
}

.nav-container {
    display: flex;
    justify-content: space-between;
}

.right-content {
    display: flex;
    align-items: center;
}

.left-content a {
    margin-right: 10px;

}

.right-content button {
    margin-left: 10px;
}


</style>