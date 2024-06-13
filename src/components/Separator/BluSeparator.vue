<script setup lang="ts">
export interface BluSeparatorProps {
    /**
     * submit text
     */
    separatorText?: string; 
    /**
     * full width
     */
    fullWidth?: boolean;
}

defineProps<BluSeparatorProps>();
</script>

<template>
    <div class="relative">
        <hr class="w-1/2 mx-auto" :class="{ 'w-full': fullWidth }" />
        <span v-if="separatorText" class="absolute px-4 text-gray-400 transform -translate-x-1/2 bg-white -top-3 left-1/2">
            {{ separatorText }}
        </span>
    </div>
</template>

<style lang="scss" scoped>

</style>
