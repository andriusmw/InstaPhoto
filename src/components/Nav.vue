<script setup>
import {RouterLink} from "vue-router"
import Container from "./Container.vue"
import {ref} from "vue"


const searchUsername = ref("")

const onSearch = () => {

}
</script>

<template>
    <a-layout-header>
        <Container>
             <RouterLink to="/">Instagram</RouterLink>
             <a-input-search 
                v-model:value="searchUsername"
                placeholder="username..."
                style="width: 200px"
                @search="onSearch"
             />
        </Container>
    </a-layout-header>
</template>


<style scoped>
header.ant-layout-header {
    background-color: black;
}
</style>