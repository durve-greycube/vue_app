<template>
    <div>
        <h1>About</h1>
        <pre>{{ JSON.stringify($route.params, null, 2) }}</pre>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const route = useRouter();
    
</script>