<template>
  <div class="w-full max-w-md px-2 pt-16 sm:px-0 flex flex-col justify-center items-center">
    <TabGroup>
      <TabList class="flex flex-1 w-full p-1 space-x-1 bg-blue-100 rounded-xl">
        <Tab v-for="page in Object.keys(pages)" as="template" :key="page" v-slot="{ selected }">
          <button
            :class="[
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12]',
            ]"
          >{{ page }}</button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2 w-full">
        <TabPanel
          v-for="(component, idx) in Object.values(pages)"
          :key="idx"
          :class="[
            'bg-white rounded-xl',
          ]"
        >
          <component :is="component" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import User from "./components/User.vue"
import Post from "./components/Post.vue"

let pages = {
  User: User,
  Post: Post,
}
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: 100vh;
}
</style>