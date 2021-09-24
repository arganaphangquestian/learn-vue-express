<template>
  <InputUser @is-update="loadUsers" />
  <div>
    <ul>
      <li v-for="user in users">
        <p>{{ user.name }} - {{ user.email }}</p>
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
