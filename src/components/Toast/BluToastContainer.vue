<script setup lang="ts">
import { onMounted, ref } from 'vue';

export interface BluToastContainerProps {
    /**
     * Max toast messages per locations
     */
    maxToasts: number;
}

const props = withDefaults(defineProps<BluToastContainerProps>(), {
    maxToasts: 15,
});

interface Children {
    children: any[] & {
        remove: Function;
        length: number;
    };
}
const topRight = ref<Children | null>(null);
const topLeft = ref<Children | null>(null);
const bottomRight = ref<Children | null>(null);
const bottomLeft = ref<Children | null>(null);
const topCenter = ref<Children | null>(null);
const bottomCenter = ref<Children | null>(null);

const observer = new MutationObserver(() => {
    if (topRight.value?.children?.length! > props.maxToasts) {
        topRight.value?.children[0].remove();
    }
    if (topLeft.value?.children.length! > props.maxToasts) {
        topLeft.value?.children[0].remove();
    }
    if (bottomRight.value?.children.length! > props.maxToasts) {
        bottomRight.value?.children[0].remove();
    }
    if (bottomLeft.value?.children.length! > props.maxToasts) {
        bottomLeft.value?.children[0].remove();
    }
    if (topCenter.value?.children.length! > props.maxToasts) {
        topCenter.value?.children[0].remove();
    }
    if (bottomCenter.value?.children.length! > props.maxToasts) {
        bottomCenter.value?.children[0].remove();
    }
});

const observerOptions = {
    subtree: true,
    childList: true,
};

onMounted(() => {
    observer.observe(document.querySelector('#top-left')!, observerOptions);
    observer.observe(document.querySelector('#top-center')!, observerOptions);
    observer.observe(document.querySelector('#top-right')!, observerOptions);
    observer.observe(document.querySelector('#bottom-left')!, observerOptions);
    observer.observe(
        document.querySelector('#bottom-center')!,
        observerOptions
    );
    observer.observe(document.querySelector('#bottom-right')!, observerOptions);
});
</script>

<template>
    <section class="fixed inset-0 pointer-events-none">
        <div
            id="top-left"
            ref="topLeft"
            class="z-[9994] absolute flex flex-col gap-1 pointer-events-none top-2 left-2"
        />
        <div
            id="top-center"
            ref="topCenter"
            class="z-[9995] absolute flex flex-col gap-1 pointer-events-none top-2 inset-x-2 child:mx-auto"
        />
        <div
            id="top-right"
            ref="topRight"
            class="z-[9996] absolute flex flex-col gap-1 pointer-events-none top-2 right-2"
            @animationstart="console.log('animation started')"
            @load="console.log('loaded')"
        />
        <div
            id="bottom-left"
            ref="bottomLeft"
            class="z-[9997] absolute flex flex-col gap-1 pointer-events-none bottom-2 left-2"
        />
        <div
            id="bottom-center"
            ref="bottomCenter"
            class="z-[9998] absolute flex flex-col gap-1 pointer-events-none bottom-2 inset-x-2 child:mx-auto"
        />
        <div
            id="bottom-right"
            ref="bottomRight"
            class="z-[9999] absolute flex flex-col gap-1 pointer-events-none bottom-2 right-2"
        />
    </section>
</template>

<style lang="scss" scoped></style>
