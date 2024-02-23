<script lang="ts" setup>
import { mergeClasses } from '@/utils/tailwindMerge'

interface BluCheckboxProps {
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
     * Label location
     */
    labelLocation?: 'top' | 'right';

    /**
     * checkbox value
     */
    value: string | boolean | number; 

    /**
     * size of the button
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

    /**
     * classes to overwrite classes for the button
     */
    twClasses?: string;
    
    /**
     * whether the button is disabled
     */
    disabled?: boolean;
}

withDefaults(defineProps<BluCheckboxProps>(), {
    size: 'md',
    labelLocation: 'right',
    value: false,
})

const model = defineModel()
</script>

<template>
    <div 
        class="flex gap-1" 
        :class="[
            labelLocation === 'top' ? 'flex-col' : 'flex-row items-center',
        ]"
    >
        <input 
            :id="id"
            :name="name || id"
            type="checkbox" 
            :disabled="disabled" 
            :value="value"
            v-model="model"
            :class="[
                mergeClasses(
                    [
                        'w-5 h-5 border border-gray-300 rounded-sm focus-visible:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed text-blue-500',
                        labelLocation === 'top' ? 'order-last' : 'order-frist',
                    ],
                    twClasses || ''
                ),
            ]" 
        />
        <label class="text-sm text-gray-700" :for="id">
            {{ label }}
        </label>
    </div>
</template>

