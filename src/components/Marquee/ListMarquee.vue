<script setup lang="ts">

// const props = defineProps<{
//     items: {
//         image: {
//             src: string;
//             alt: string;
//         },
//         url: string;
//     }[];
// }>();
const props = defineProps<{
    items: {
        [key: string]: any;
    }[];
}>();

console.log('items', props.items);
</script>

<template>
    <ul class="flex gap-4">
        <li v-for="(item, i) in items" :key="i">
            <slot :item="item">
                <a :href="item.url">
                    <img :src="item.image.src" :alt="item.image.alt" />
                </a>
            </slot>
        </li>
    </ul>
</template>