<template>
    <div class="userbar-container">
        <div class="top-content">
            <a-typography-title :level="2">
                Username
            </a-typography-title>
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5">0 posts</a-typography-title>
            <a-typography-title :level="5">800 followers</a-typography-title>
            <a-typography-title :level="5">2345 following</a-typography-title>
          </div>
    </div>
</template>

<style scoped>
    .userbar-container {
     
        padding-bottom: 75px;

    }

    .bottom-content {
        background-color: aquamarine;
        display: flex;
        align-items: center;

    }

    .bottom-content h5 {
        margin: 0 !important;
        padding: 0;
        margin-right: 30px !important;
        
    }

</style>