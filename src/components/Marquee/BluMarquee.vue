<script setup lang="ts">
import { useSpring, useMotionProperties } from "@vueuse/motion";
import { useWindowSize } from "@vueuse/core";
import { reactive, ref, watch, onMounted } from "vue";
import MarqueeItem from "./MarqueeItem.vue";
import TextMarquee from "./TextMarquee.vue";
import { h } from "vue";
import { VNode } from "vue";
import ListMarquee from "./ListMarquee.vue";

const props = defineProps<{
    horizontalText: string;
    items: any[];
    type: 'text' | 'icon-items' | 'image-items';
    // galleryCollection: GalleryCollection;
}>();

const SETTINGS = {
    SPEED: 50,
    SPEEDON_HOVER: 100,
};


const gallery = props.items

const state = reactive({
    speed: SETTINGS.SPEED,
    numItems: 0,
    galleryItemsWithVariants: gallery ? gallery.map((item, index) => ({ ...item, variant: index })) : [],
});

const itemRef = ref<HTMLSpanElement | null>(null);

const { motionProperties } = useMotionProperties(itemRef, {
    x: 0,
    y: 0,
})

const { set, stop } = useSpring(motionProperties, {
    duration: 1000,
    bounce: 0.0,
});

const { width } = useWindowSize();

const calculateNumItems = () => {
    if (itemRef.value && width) {
        const itemWidth = itemRef.value.getBoundingClientRect().width;
        console.log("itemWidth", itemWidth);
        const itemsNeeded = Math.ceil(width.value / itemWidth) + 1;
        console.log("itemsNeeded", itemsNeeded);
        state.numItems = itemsNeeded;
    }
};

onMounted(() => {
    calculateNumItems();
});

watch([width], () => {
    calculateNumItems();
});

const marqueeType = ref<VNode | null>(null);
if (props.type === 'image-items') {
    console.log("items", props.items);
    marqueeType.value = h(ListMarquee, {
        items: props.items
    });
} else if (props.type === 'icon-items') {
    marqueeType.value = h(ListMarquee, {
        items: props.items
    }, {
        default: ({ item }) => h('a', { href: item.url }, [
            h('fa-icon', { icon: item.icon })
        ])
    });
} else if (props.type === 'text') {

    marqueeType.value = h(TextMarquee, { 
        text: props.horizontalText 
    });
}
</script>

<template>
    <div
        class="relative flex overflow-hidden"
        @mouseover="state.speed = SETTINGS.SPEEDON_HOVER"
        @mouseleave="state.speed = SETTINGS.SPEED"
    >

        <!-- Visual hidden item to calculate width -->
        <span ref="itemRef" class="absolute invisible">
            <!-- <component :is="TextMarquee" v-if="horizontalText" :text="horizontalText"/> -->
            <!-- {{ marqueeType?.component }} -->
            <component :is="marqueeType" />
        </span>
        
        <MarqueeItem v-for="(i) in state.numItems" :key="i" :speed="state.speed" :velocity="400">
            <!-- <component :is="TextMarquee" v-if="horizontalText" :text="horizontalText"/> -->
            <component :is="marqueeType" />
        </MarqueeItem>
    </div>
</template>

<style lang="scss" scoped></style>
