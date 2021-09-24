<template>
  <InputPost @is-update="loadPosts" />
  <div>
    <select v-model="selected">
      <option v-for="s in status" v-bind:value="s">{{ s }}</option>
    </select>

    <ul>
      <li v-for="post in filteredPosts">
        <p>{{ post.title }} - {{ post.published ? `Published` : `Drafted` }}</p>
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
