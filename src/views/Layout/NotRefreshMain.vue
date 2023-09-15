<template>
    <div>
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useRoute } from 'vue-router';
const route = useRoute()

const key = computed(() => {
    return route.path + Math.random();
});
</script>
<style scoped></style>
