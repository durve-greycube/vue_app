<template>
    <div class="flex flex-col mx-96 mt-52 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div>
            <img class="h-48 pt-50 flex mx-auto items-center justify-center" :src="imgUrl" />
            <p class="font-bold justify-center items-center flex">404</p>
            <p class="font-bold justify-center items-center flex">Page Not Found</p>
        </div>
        <div class="m-3 flex flex-row items-center justify-center"><p>The Page you are looking for doesn't exist or an other error occurred.</p></div>
    </div>
    
</template>

<script setup>
import imgUrl from './sad_face.png'
</script>


