<!-- ------------------------------IMPORTS -------------------------
------------------------------------------------------------------- -->

<script setup>
   import { ref } from 'vue';

// ----------------------------CONSTS ------------------------
// ---------------------------------------------------------- 
    const visible = ref(false);
    const caption = ref("");

// --------------------------- FUNCTIONS -------------------
// ---------------------------------------------------------

    const showModal = () => {
        visible.value = true;
    };

    const handleOk = (e) => {
        console.log(e);
        visible.value = false;
    };

    const handleUploadChange = (e) => {
        // when you upload something it is placed in an array, at possition 0
        //so  we get the data of the upload
        if(e.target.files[0]){
            file.value = e.target.files[0]
        }
    }


</script>

<!-- -----------------------------TEMPLATE --------------------------
--------------------------------------------------------------------- -->

<template>
    <div>
        <a-button @click="showModal">Upload Photo</a-button>
        <a-modal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
           <input type="file" accept=".jpeg,.png,.jpg" 
                @change="handleUploadChange"
           >

           <a-input 
            v-model:value="caption"  
            placeholder="Caption..."
            :maxLength="50"
            >
            </a-input>

        </a-modal>
    </div>

</template>

<!-- ----------------------------- STYLES -----------------------------------
----------------------------------------------------------------------------- -->

<style scoped>

    input {
        margin-top: 10px;
    }

</style>

