<template>
  <div class="ani-slideInDown text-center">
    <h2 class="fs-h2">Fadzil Jusri</h2>

    <p>
      <a
        :href="ghLink"
        rel="demo"
      >{{ghLink}}</a>
    </p>
  </div>
</template>

<script>
import { ghLink }  from "@/constants.js";
export default {
  name: "AppAbout",
  data() {
    return {
      ghLink
    };
  }
};
</script>
