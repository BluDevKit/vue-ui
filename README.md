# @bludevkit/vue-ui

`@bludevkit/vue-ui` is a Vue 3 component library that provides reusable UI components for building modern web applications.

## Installation

You can install `@bludevkit/vue-ui` via npm or yarn:

```bash
npm install @bludevkit/vue-ui
# or
yarn add @bludevkit/vue-ui
```

## Usage
To use components from @bludevkit/vue-ui, simply import them into your Vue 3 application and register them with your app.

```vue
<template>
  <div>
    <!-- Example of using a button component -->
    <BluButton @click="handleClick">Click me</BButton>
  </div>
</template>

<script setup lang="ts">
import { BluButton } from '@bludevkit/vue-ui';

const handleClick = () => {
  console.log('Button clicked');
};
</script>
```

## Component list
- BluButton
- BluCheckbox
- BluInput
- BluMultiSelect
- BluProgress
- BluRadio
- BluRadioCard
- BluSingleSelect
- BluTextarea
- BluTabView
- BluToast
- BluToggle
