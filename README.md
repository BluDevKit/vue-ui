# BluDevKit: Vue UI

<!-- [![npm version](https://badge.fury.io/js/%40bludevkit%2Fvue-ui.svg)](https://badge.fury.io/js/%40bludevkit%2Fvue-ui) -->

Blu Dev Kit is a collection of tools and libraries for developing Vue3 applications. It includes a set of components, modules, and utilities that are commonly used in web applications. The goal of Blu Dev Kit is to provide a set of tools that can be used to quickly build web applications without having to write a lot of boilerplate code.

## Installation

You can install `@bludevkit/vue-ui` via npm or yarn:

```bash
# npm
npm install @bludevkit/vue-ui

# bun 
bun add @bludevkit/vue-ui

# yarn
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
- BluProgress
- BluRadio
- BluRadioCard
- BluSingleSelect
- BluTextarea
- BluTabView
- BluToast
- BluToggle

## Module list
- BluLogin