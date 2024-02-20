<template>
    <button type="button" :class="classes" @click="onClick" :style="style" class="bg-red-500 px-4 py-2">
        {{ label }}
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    /**
     * The label of the button
     */
    label: string,
    /**
     * primary or secondary button
     */
    primary?: boolean,
    /**
     * size of the button
     */
    size?: 'small' | 'medium' | 'large',
    /**
     * background color of the button
     */
    backgroundColor?: string,
    /**
     * classes of the button
     */
    classes?: string	
}>(), { primary: false });

const emit = defineEmits<{
    (e: 'clickEmit', id: number): void;
}>();

const style = computed(() => ({
    backgroundColor: props.backgroundColor
}));

const onClick = () => {
    emit("clickEmit", 1)
};

</script>