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
    }[];
    /**
     * The index of the active tab
     */
    activeTabIndex: number;
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
const dynamicComponents = props.options.map((option) => ({
    component: defineAsyncComponent(() => new Promise((resolve) => {
        resolve(option.component);
    })),
}));

const activeTabIndex = ref(props.activeTabIndex);

const currentTab = computed(() => dynamicComponents[activeTabIndex.value]);
function switchTabs(index: number, name: string) {
    activeTabIndex.value = index;
    emit("change", name);
}
</script>

<template>
    <section class="flex flex-col gap-4">
        <ul class="flex justify-between gap-2 px-4 py-2 border rounded-md border-blu-500">
            <li
                v-for="(option, index) in options"
                v-show="!option.hide"
                :key="index"
                class="flex transition-colors rounded grow"
            >
                <BluButton
                    :class="[index === activeTabIndex ? 'bg-blu-600 font-bold text-white opa' : '']"
                    tw-classes="justify-center"
                    :full-width="true"
                    @click.prevent="
                        switchTabs(Number(index), option.name);
                        $event.stopPropagation();
                    "
                >
                    {{ option.label }}
                </BluButton>
            </li>
        </ul>

        <section class="px-4 py-2">
            <Transition name="component" mode="out-in">
                <component :is="currentTab.component" />
            </Transition>
        </section>
    </section>
</template>

<style scoped>
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
