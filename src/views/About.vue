<template>
  <div class="ani-slideInDown text-center">
    <h2 class="fs-h4">Netlify + FaunaDB = Serverless</h2>
    <p>
      <a :href="ghLink" target="_blank" rel="demo">{{ghLink}}</a>
    </p>

    <div class="pt-4">
      Built with
      <a href="https://vuejs.org/" target="_blank">Vue.js</a>
    </div>
  </div>
</template>

<script>
import { ghLink } from "@/constants.js";
export default {
  name: "AppAbout",
  data() {
    return {
      ghLink
    };
  }
};
</script>
