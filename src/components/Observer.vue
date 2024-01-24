<script setup>
import {ref, onMounted, defineEmits} from "vue"

const observer = ref(null)
const root = ref(null)


const emits = defineEmits(["intersect"])

onMounted(() => {
   // console.log("inside onMounted observer")
    observer.value = new IntersectionObserver(([entry]) => {
       if(entry && entry.isIntersecting){
            emits("intersect")
            //console.log("inside if on onMounted -> observer")
       }
    })
    observer.value.observe(root.value)
})

</script>



<template>
    <div class="observer"  ref="root">

    </div>
</template>

<style scoped>

    .observer {
        height: 30px;
        width: 30px;
      
    }
</style>