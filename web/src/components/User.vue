<template>
  <InputUser @is-update="loadUsers" />
  <div class="mt-8">
    <ul class="overflow-y-auto px-4" style="height: 600px">
      <li
        v-for="user in users"
        class="flex border list-none rounded-md px-3 py-3 mb-4 items-center"
      >
        <p class="flex-1">{{ user.name }}</p>
        <p
          class="text-right bg-blue-300 py-2 px-4 rounded-full text-blue-700 text-xs"
        >{{ user.email }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import { getUsers } from "../network/user"
import InputUser from "./InputUser.vue"

export default defineComponent({
  components: {
    InputUser
  },
  data() {
    return {
      users: [],
    }
  },
  mounted() {
    getUsers().then(users => {
      this.users = users;
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    loadUsers() {
      getUsers().then(users => {
        this.users = users;
        this.filteredUsers = users;
      }).catch(e => {
        console.log(e)
      })
    }
  },
})


</script>
