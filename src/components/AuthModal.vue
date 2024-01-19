<script setup>
import {ref, defineProps, reactive} from "vue";

//import the userStore from Pinia (hook)
import {useUserStore} from "../stores/users"
//declare a const userStore to use all the functions inside the hook useUserStore()
const userStore = useUserStore()
// de-structuring errorMessage and handleSingup from the hook to use them
const {errorMessage, handleSingup} = userStore


const props = defineProps(['isLogin'])
const visible = ref(false);

//States to save the modal data, reactive is like watch()
//it is linked by v-model to this object so it updates each part of it
const userCredentials = reactive({
    email: "",
    password: "",
    username: ""

})

const showModal = () => {
    visible.value = true;
};

//this is called when we click the "ok" button
const handleOk = (e) => {
   handleSingup(userCredentials)
};

const title = props.isLogin ? 'Login' : 'Sign Up' 
</script>

<template>
    <div>
        <a-button type="primary" @click="showModal" class="btn">{{title}}</a-button>
        <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
           <a-input- class="input" v-if="!isLogin" v-model:value="userCredentials.username" placeholder="Username"/>
           <a-input  class="input" v-model:value="userCredentials.email" placeholder="Email"></a-input>
           <a-input  class="input" v-model:value="userCredentials.password" placeholder="Password"></a-input>
        </a-modal>
    </div>
    
</template>

<style scoped>
    
.btn {
    margin-left: 10px;
}

.input {
    margin-top: 5px;
}

</style>