<script setup>
import {ref} from "vue";

const visible = ref(false);

const showModal = () => {
    visible.value = true;
};

const handleOk = (e) => {
    visible.value = false;
};

</script>

<template>
    <div>
        <a-button type="primary" @click="showModal" >Open Modal</a-button>
        <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
            <p>Some contents...</p>
             <p>Some contents...</p>
              <p>Some contents...</p>
        </a-modal>
    </div>
    
</template>