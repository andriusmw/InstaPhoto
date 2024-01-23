<!-- ----------------------------------------IMPORTS --------------------------------------------
---------------------------------------------------------------------------------------------- -->

<script setup>
   import { storeToRefs } from 'pinia';
   import { ref } from 'vue';
   import {supabase} from "../../supabase"
   import {useUserStore} from "../stores/users"

// -------------------------------------------CONSTS ----------------------------------------------
// ------------------------------------------------------------------------------------------------- 
    const userStore = useUserStore()
    const {user} = storeToRefs(userStore)
    const loading = ref(false);
    const errorMessage = ref("")
    const visible = ref(false);
    const caption = ref("");
    const file = ref(null)

// ------------------------------------------- FUNCTIONS ----------------------------------------------
// ----------------------------------------------------------------------------------------------------

    const showModal = () => {
        visible.value = true;
    };
//----------------------------------------------------------
    const handleOk = async () => {
        loading.value = true; // set spinner to true
        const fileName = Math.floor(Math.random() * 100000000000000000) 
        // file works with the type of input
      if(file.value){
      const {data, error} =  await supabase.storage.from("images").upload('public/' + fileName, file.value)
       // console.log(data)
        if(error){
             loading.value = false;
            return errorMessage.value = "Unable to upload image"
        }
        // if there is no error we have a response with data so the code continues
        // here and we upload an object with the url, caption & owner_id
        await supabase.from("posts").insert({
                url: data.path,
                caption: caption.value,
                owner_id: user.value.id
         })
     
      }
      // now time to clean states
        loading.value = false;
        visible.value = false;
        caption.value = "";
    };

//---------------------------------------------------------------
    const handleUploadChange = (e) => {
        // when you upload something it is placed in an array, at possition 0
        //so  we get the data of the upload
        if(e.target.files[0]){
            file.value = e.target.files[0]
        }
    }


</script>

<!-- -------------------------------------------TEMPLATE --------------------------------------------
-------------------------------------------------------------------------------------------------- -->

<template>
    <div>
        <a-button @click="showModal">Upload Photo</a-button>
        <a-modal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
        
            <div v-if="!loading">
                   <input type="file" accept=".jpeg,.png,.jpg" 
                      @change="handleUploadChange">

                  <a-input 
                    v-model:value="caption"  
                    placeholder="Caption..."
                    :maxLength="50"
                  >
                 </a-input>
                  <a-typography-text v-if="errorMessage" type="danger">{{errorMessage}}</a-typography-text>
           </div>
           <div v-else class="spinner">
                <a-spin></a-spin>
           </div>
        </a-modal>
    </div>

</template>

<!-- ----------------------------- STYLES -----------------------------------
----------------------------------------------------------------------------- -->

<style scoped>

    input {
        margin-top: 10px;
    }

    .spinner {
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>

