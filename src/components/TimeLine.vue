<!-- ----------------------------------------------IMPORT ---------------------------------------------
----------------------------------------------------------------------------------------------------- -->
<script setup>
import Container from "./Container.vue";
import Card from "./Card.vue"
import {useUserStore} from "../stores/users"
import { storeToRefs } from "pinia";
import Cards from "../components/Cards.vue"
import LoginMessage from "./LoginMessage.vue";

// ---------------------------------------------- CONSTS -----------------------------------------------
// -----------------------------------------------------------------------------------------------------

const userStore = useUserStore()
const {user, loadingUser} = storeToRefs(userStore)



</script>

<!-- ------------------------------------------ TEMPLATE ---------------------------------------------
------------------------------------------------------------------------------------------------------- -->
<template>
    <Container>
        <div v-if="!loadingUser">   
            <Cards v-if="user" />
            <LoginMessage v-else />
        </div>

        <div v-else class="spinner">
            <a-spin></a-spin>
        </div>
     
    </Container>
</template>

<!-- -------------------------------------------- STYLES --------------------------------------------
------------------------------------------------------------------------------------------------- -->

<style scoped>

    .timeline-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }

    .spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 98vh;
    }

</style>