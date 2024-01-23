<!-- ------------------------------IMPORTS -------------------------
------------------------------------------------------------------- -->

<script setup>
   import { storeToRefs } from 'pinia';
import { ref } from 'vue';
   import {supabase} from "../../supabase"
   import {useUserStore} from "../stores/users"

// ----------------------------CONSTS ------------------------
// ---------------------------------------------------------- 
    const userStore = useUserStore()
    const {user} = storeToRefs(userStore)
    const visible = ref(false);
    const caption = ref("");
    const file = ref(null)

// --------------------------- FUNCTIONS -------------------
// ---------------------------------------------------------

    const showModal = () => {
        visible.value = true;
    };

    const handleOk = async () => {
        const fileName = Math.floor(Math.random() * 100000000000000000)
      if(file.value){
      const {data, error} =  await supabase.storage.from("images").upload('public/' + fileName, file.value)
       // console.log(data)
         if(data) {
            await supabase.from("posts").insert({
                url: data.path,
                caption: caption.value,
                owner_id: user.value.id
            })
         }
      }
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

