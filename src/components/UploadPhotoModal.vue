<!-- ----------------------------------------IMPORTS --------------------------------------------
---------------------------------------------------------------------------------------------- -->

<script setup>
   import { ref, defineProps } from 'vue';
   import { storeToRefs } from 'pinia';
   import {supabase} from "../../supabase"
   import {useUserStore} from "../stores/users"

// -------------------------------------------CONSTS ----------------------------------------------
// ------------------------------------------------------------------------------------------------- 
    const userStore = useUserStore()
    const {user} = storeToRefs(userStore)
    const props = defineProps(['addNewPost'])
    const loading = ref(false);
    const errorMessage = ref("")
    const visible = ref(false);
    const caption = ref("");
    const file = ref(null)
    const userName = ref("")

// ------------------------------------------- FUNCTIONS ----------------------------------------------
// ----------------------------------------------------------------------------------------------------

    const showModal = async () => {
        visible.value = true;

     
    if (user && user.value && user.value.id) {
        try {
            const { data, error } = await supabase
                .from("users")
                .select("username")
                .eq('id', user.value.id);

            if (error) {
                console.error("Error fetching user data:", error.message);
            } else {
                const username = data[0]?.username;
                // console.log("Username:", username);
                 userName.value = username
                
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    } else {
        console.log("No user state or user ID");
    }
};
//----------------------------------------------------------
    const handleOk = async () => {
        loading.value = true; // set spinner to true
        const fileName = Math.floor(Math.random() * 100000000000000000) 
        // file works with the type of input
        let filePath
        let fileCaption
      if(file.value){
      const {data, error} =  await supabase.storage.from("images").upload('public/' + fileName, file.value)
       // console.log(data)
        if(error){
             loading.value = false;
            return errorMessage.value = "Unable to upload image"
        }
       filePath = data.path
       fileCaption = caption.value
       // we are storing the url and the caption on those lets to use them later
       // on a function to show them on the profile
       await supabase.from("posts").insert({
                url: data.path,
                caption: caption.value,
                owner_id: user.value.id,
                username: userName.value
                //this makes the insert into de the DB
         })
     
      }
      // now time to clean states
        loading.value = false;
        visible.value = false;
        caption.value = "";
        // this function comes from Profile > UserBar throught props drilling
        props.addNewPost({
                url: filePath,
                caption: fileCaption,
              
        })
    };

//---------------------------------------------------------------
    const handleUploadChange = (e) => {
        // when you upload something it is placed in an array, at possition 0
        //so  we get the data of the upload
        if(e.target.files[0]){
            file.value = e.target.files[0]
        }
    }

//-------------------------------------------------



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

