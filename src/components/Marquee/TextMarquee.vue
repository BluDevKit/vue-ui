<script setup lang="ts">

defineProps<{
    text: string;
}>();
</script>

<template>
    <slot>
        <p class="font-['Montserrat'] text-[#1A1A1A] text-[1.5rem]">
            {{ text }}
        </p>
    </slot>
</template>