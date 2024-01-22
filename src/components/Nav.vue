<script setup>
import {RouterLink, useRouter} from "vue-router"
import Container from "./Container.vue"
import {ref} from "vue"
import AuthModal from "./AuthModal.vue"
import {useUserStore} from "../stores/users"
import { storeToRefs } from 'pinia';

const userStore = useUserStore()

const { user, loadingUser} = storeToRefs(userStore)
const router = useRouter()
const searchUsername = ref("")
//const isAuthenticated = ref(false)
//isAuthenticated affects the buttons we see on navbar

const onSearch = () => {
    if(searchUsername.value) {
        router.push(`/profile/${searchUsername.value}`);
        searchUsername.value = ""
    }
}
</script>

<template>
    <a-layout-header>
        <Container>
              {{user}}
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
                      <a-button type="primary">Profile</a-button>
                      <a-button type="primary">Logout</a-button>
                 </div>
             </div>


            </div>
        </Container>
    </a-layout-header>
</template>


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