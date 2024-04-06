<script lang="ts" setup>
import { onClickOutside, onKeyStroke } from "@vueuse/core";
import { computed, ref } from "vue";
import { BluInput, BluButton } from "@/components";
import { usePaddingSizes } from "@/composables/paddingSizes";
import { mergeClasses } from "@/utils/tailwind";

interface BluSingleSelectProps {
    /**
     * id of input field
     */
    id: string;

    /**
     *  name of input field
     */
    name?: string;

    /**
     * label of input field
     */
    label: string;

    /**
     * options of input field
     */
    options: {
        value: string;
        label: string;
    }[];

    /**
     * model value of input field
     */
    modelValue?: {
        value: string;
        label: string;
    };

    // /**
    //  * options of input field
    //  */
    // dataKey: keyof T;

    // /**
    //  * options of input field
    //  */
    // valueKey: keyof T;

    /**
     * whether to show search bar
     */
    showSearch?: boolean;

    /**
     * classes to overwrite classes for the button
     */
    twClasses?: string;

    /**
     * whether the button is disabled
     */
    disabled?: boolean;

    /**
     * whether the button is loading
     */
    loading?: boolean;

    /**
     * whether the button is full width
     */
    fullWidth?: boolean;
}

const props = withDefaults(defineProps<BluSingleSelectProps>(), {});

interface BluSingleSelectSlots {
    /**
     * Slot for left icon
     */
    leftIcon?: string;
    /**
     * Slot for label
     */
    default?: string;
    /**
     * Slot for loading icon
     */
    loadingIcon?: string;
    /**
     * Slot for right icon
     */
    rightIcon?: string;
}

defineSlots<BluSingleSelectSlots>();

const model = defineModel();
const selected = ref("");
const search = ref("");
const selectSearch = ref(null);
const selectOptions = ref<HTMLElement | null>(null);
const showOptions = ref(false);
const focusIndex = ref(0);
const usingArrows = ref(false);

const selectItem = (item: { value: string | null; label: string; closeOptions: boolean }) => {
    model.value = item.value;
    selected.value = item.label;
    focusIndex.value = 0;
    
    if (item.closeOptions) {
        showOptions.value = false;
    }
};

const toggleOptions = () => {
    showOptions.value = !showOptions.value;
};

const filteredOptions = computed(() => props.options.filter((item) => item.label.toLowerCase().includes(search.value.toLowerCase())));

onClickOutside(selectOptions, (e) => {
    if (props.id === (e.target as HTMLElement)?.id || (e.target as HTMLElement)?.id === "select-search" || (e.target as HTMLElement)?.id === "clear-selection") {
        return;
    }
    showOptions.value = false;
});
onKeyStroke("Escape", () => {
    if (showOptions.value) {
        showOptions.value = false;
    }
});

const setFocus = () => {
    const currentOption = selectOptions.value?.querySelector(`li:nth-child(${focusIndex.value}) button`);
    (currentOption as HTMLButtonElement)?.focus();
};

onKeyStroke(["ArrowLeft", "ArrowUp"], () => {
    if (showOptions.value) {
        const index = focusIndex.value - 1;
        focusIndex.value = index < 1 ? filteredOptions.value.length : index;
        setFocus();
        usingArrows.value = true;
    }
});

onKeyStroke(["ArrowRight", "ArrowDown"], () => {
    if (showOptions.value) {
        // update focusIndex correctly
        const index = focusIndex.value + 1;
        focusIndex.value = index > filteredOptions.value.length ? 1 : index;

        setFocus();
        usingArrows.value = true;
    }
});

onKeyStroke("Tab", () => {
    if (showOptions.value) {
        if (focusIndex.value === filteredOptions.value.length) {
            toggleOptions();
        }
        usingArrows.value = false;
    }
});

</script>

<template>
    <section class="flex flex-col gap-1">
        <label :for="id" class="block text-sm font-medium text-gray-700">
            {{ label }}
        </label>
        <div class="flex gap-1">
            <BluButton
                :id="id"
                :name="name"
                :disabled="disabled"
                class="bg-transparent border border-black grow"
                @click="toggleOptions"
            >
                {{ selected || 'Select' }}
            </BluButton>
            <BluButton
                v-if="selected"
                id="clear-selection"
                size="sm"
                class="bg-red-400 grow-0"
                :full-width="false"
                @click="selectItem({ value: null, label: '', closeOptions: false})"
            >
                Clear selection
            </BluButton>
        </div>

        <Transition name="options">
            <div v-if="showOptions" class="flex flex-col gap-1">
                <section v-if="options.length > 3 && showSearch" class="flex gap-1 grow-1">
                    <BluInput
                        id="select-search"
                        ref="selectSearch"
                        v-model="search"
                        label="search"
                        type="search"
                        :show-label="false"
                        tw-classes="w-full"
                    />
                </section>
                <div
                    ref="selectOptions"
                    class="w-full shadow-sm"
                    :class="mergeClasses([usePaddingSizes('md').value], 'p-0')"
                >
                    <ul class="z-10 flex flex-col w-full gap-1 p-2 bg-white rounded-md shadow-lg">
                        <li v-for="(item, index) in filteredOptions" :key="item.value" :value="item.value">
                            <BluButton
                                size="sm"
                                :class="[model === item.value ? 'bg-blu-500 font-bold' : 'bg-slate-100']"
                                :full-width="true"
                                @click="selectItem({ ...item, closeOptions: true })"
                                @blur="index === options.length - 1 && !usingArrows && toggleOptions()"
                            >
                                {{ item.label }}
                            </BluButton>
                        </li>
                    </ul>
                </div>
            </div>
        </Transition>
    </section>
</template>
<style scoped>
.options-enter-active,
.options-leave-active {
    transition:
        opacity 0.3s,
        transform 0.3s;
}
.options-enter-from,
.options-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
