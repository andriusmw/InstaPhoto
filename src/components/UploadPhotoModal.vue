<!-- ------------------------------IMPORTS -------------------------
------------------------------------------------------------------- -->

<script setup>
   import { ref } from 'vue';

// ----------------------------CONSTS ------------------------
// ---------------------------------------------------------- 
    const visible = ref(false);

// --------------------------- FUNCTIONS -------------------
// ---------------------------------------------------------

    const showModal = () => {
        visible.value = true;
    };

    const handleOk = (e) => {
        console.log(e);
        visible.value = false;
    };

</script>

<!-- -----------------------------TEMPLATE --------------------------
--------------------------------------------------------------------- -->

<template>
    <div>
        <a-button @click="showModal">Upload Photo</a-button>
        <a-modal v-model:visible="visible" title="Basic Model" @ok="handleOk">
            <p>Some contents</p>
            <p>Some contents</p>
            <p>Some contents</p>
            <p>Some contents</p>
        </a-modal>
    </div>

</template>

