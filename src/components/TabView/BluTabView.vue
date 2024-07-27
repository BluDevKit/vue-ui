<script lang="ts" setup>
import { computed, defineAsyncComponent, ref } from "vue";
import { BluButton } from "@/components/Button";

interface BluTabViewProps {
    /**
     * Tab options
     */
    options: {
        component?: any;
        name: string;
        hide?: boolean;
        label?: string;
        icon?: string;
    }[];
    /**
     * The index of the active tab
     */
    activeTabIndex: number;
    keepAlive?: boolean;
}

const props = withDefaults(defineProps<BluTabViewProps>(), {
    activeTabIndex: 0,
});

interface Emits {
    /**
     * Emits the name of the component that is active
     */
    (event: "change", componentName: string): void;
}

const emit = defineEmits<Emits>();
const dynamicComponents = props.options.map((option, index) => ({
    ...option,
    index,
    component: defineAsyncComponent(
        () =>
            new Promise((resolve) => {
                resolve(option.component);
            }),
    ),    
}));

const activeTabIndex = ref(props.activeTabIndex);

const currentTab = computed(() => dynamicComponents[activeTabIndex.value]);

function switchTabs(index: number, name: string) {
    activeTabIndex.value = index;
    emit("change", name);
}

const gridItems = computed(() => {
    if (props.options.length === 2) {
        return 'grid-cols-2'
    } else if (props.options.length === 3) {
        return 'grid-cols-3'
    } else if (props.options.length === 4) {
        return 'grid-cols-4'
    } else if (props.options.length === 5) {
        return 'grid-cols-5'
    }
});

const gridLength = computed(() => {
    if (props.options.length === 2) {
        return 'w-1/2'
    } else if (props.options.length === 3) {
        return 'w-1/3'
    } else if (props.options.length === 4) {
        return 'w-1/4'
    } else if (props.options.length === 5) {
        return 'w-1/5'
    }
});

const activeTabLocation = computed(() => {
    if (props.options.length === 2) {
        return activeTabIndex.value === 0 ? 'translate-x-0' : 'translate-x-full';
    } else if (props.options.length === 3) {
        if (activeTabIndex.value === 0) {
            return 'translate-x-0';
        } else if (activeTabIndex.value === 1) {
            return 'translate-x-full';
        } else {
            return 'translate-x-[200%]';
        }
    } else if (props.options.length === 4) {
        if (activeTabIndex.value === 0) {
            return 'translate-x-0';
        } else if (activeTabIndex.value === 1) {
            return 'translate-x-full';
        } else if (activeTabIndex.value === 2) {
            return 'translate-x-[200%]';
        } else {
            return 'translate-x-[300%]';
        }
    } else if (props.options.length === 5) {
        if (activeTabIndex.value === 0) {
            return 'translate-x-0';
        } else if (activeTabIndex.value === 1) {
            return 'translate-x-full';
        } else if (activeTabIndex.value === 2) {
            return 'translate-x-[200%]';
        } else if (activeTabIndex.value === 3) {
            return 'translate-x-[300%]';
        } else {
            return 'translate-x-[400%]';
        }
    }
})
</script>

<template>
    <section class="flex flex-col gap-8">
        <section class="sticky top-0 z-50 md:flex tab-switch">
            <div
                class="relative grid justify-between w-full gap-4 px-2 py-1 text-black border-2 border-black rounded-lg cursor-pointer pointer-events-auto bg-primary-500"
                :class="gridItems"
            >
                <span
                    class="absolute inset-0 z-50 grid font-bold text-white bg-slate-800 place-items-center ring-1"
                    :class="[
                        activeTabIndex === 0 ? 'rounded-l-md' : '',
                        activeTabIndex === options.length - 1 ? 'rounded-r-md' : '',
                        gridLength,
                        activeTabLocation,
                    ]"
                >
                    {{ currentTab.label }}
                </span>
                

                <BluButton
                    v-for="(option, index) in options"
                    v-show="!option.hide"
                    :key="index"
                    class="flex transition-colors rounded grow"
                    :class="[index === activeTabIndex ? 'bg-blu-600 font-bold text-white opa' : '']"
                    tw-classes="justify-center"
                    :full-width="true"
                    @click.prevent="switchTabs(Number(index), option.name)"
                    :aria-label="option.label"
                >
                    {{ option.label }}
                </BluButton>
            </div>
        </section>
        <template v-if="keepAlive">
            <KeepAlive>
                <Transition name="component" mode="out-in">
                    <component :is="currentTab.component" />
                </Transition>
            </KeepAlive>
        </template>
        <template v-else>
            <Transition name="component" mode="out-in">
                <component :is="currentTab.component" />
            </Transition>
        </template>
    </section>
</template>

<style scoped>
.tab-switch div span{
    transition: transform 0.3s ease-in-out;
    /* transform: translateX(0); */
}

/* .tab-switch div span.active{
    transform: translateX(100%);
} */

.component-enter-active,
.component-leave-active {
    transition:
        opacity 0.3s,
        transform 0.3s;
}

.component-enter-from,
.component-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
