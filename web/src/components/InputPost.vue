<template>
  <div class="flex items-center justify-center">
    <button
      type="button"
      @click="openModal"
      class="px-4 py-2 text-sm text-blue font-bold bg-blue-400 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >New Post</button>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Input Post</DialogTitle>

              <div class="mt-2">
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="title"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-4 sm:text-sm border-gray-700 rounded-md"
                    placeholder="New post"
                    autocomplete="off"
                    v-model="title"
                  />
                </div>
                <div class="mt-4 relative rounded-md shadow-sm border-gray-400">
                  <select
                    name="title"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-4 sm:text-sm bg-white border-gray-700 rounded-md"
                    v-model="user"
                  >
                    <option v-for="p in users" v-bind:value="p.id">{{ p.name }}</option>
                  </select>
                </div>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  @click="submit"
                >Add</button>
                <button
                  type="button"
                  class="inline-flex ml-4 justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  @click="closeModal"
                >Cancel</button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref, onMounted, defineComponent } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue'
import { addPost } from "../network/post"
import { getUsers } from "../network/user"

export default defineComponent({
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },

  emits: ['is-update'],

  setup() {
    const isOpen = ref(false)
    const title = ref("")
    const user = ref(undefined)
    const users = ref([]);

    onMounted(() => {
      getUsers().then(data => {
        data.unshift({ name: "Pilih User" });
        users.value = data
      }).catch(e => console.log(e))
    })

    return {
      isOpen,
      title,
      user,
      users,
      submit() {
        addPost(title.value, user.value).then((post) => {
          isOpen.value = false
          user.value = undefined;
          title.value = ""
          this.$emit('is-update');
        }).catch(e => console.log(e));
      },
      closeModal() {
        isOpen.value = false
      },
      openModal() {
        isOpen.value = true
      },
    }
  },
});
</script>
