<template>
  <InputPost @is-update="loadPosts" />
  <div class="mt-8">
    <select v-model="selected" class="bg-blue-200 rounded-xl px-4 py-2">
      <option v-for="s in status" v-bind:value="s">{{ s }}</option>
    </select>

    <ul class="mt-4 overflow-y-auto px-4" style="height: 600px">
      <li
        v-for="post in filteredPosts"
        class="flex border list-none rounded-md px-3 py-3 mb-4 items-center"
      >
        <p class="flex-1">{{ post.title }}</p>
        <p
          class="text-right bg-blue-300 py-2 px-4 rounded-full text-blue-700 text-xs"
        >{{ post.published === true ? `Published` : post.published === false ? `Drafted` : `` }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import { getPosts } from "../network/post"
import InputPost from "./InputPost.vue"

export default defineComponent({
  components: {
    InputPost
  },
  data() {
    return {
      status: ["All", "Publised", "Drafted"],
      selected: "All",
      posts: [],
      filteredPosts: []
    }
  },
  mounted() {
    this.loadPosts();
  },
  methods: {
    loadPosts() {
      getPosts().then(posts => {
        this.posts = posts;
        this.filteredPosts = posts;
      }).catch(e => {
        console.log(e)
      })
    }
  },
  watch: {
    selected(value) {
      this.filteredPosts = this.posts.filter((post) => {
        switch (true) {
          case value === "Published":
            return post.published === true;
          case value === "Drafted":
            return post.published === false;
          case value === "All":
            return true;
          default:
            return false;
        }
      });
    }
  },
})


</script>
